"use client";

/**
 * 3D dünya — three.js, harici kütüphane yok.
 *
 * Dokular NASA Blue Marble (gündüz) ve Black Marble (gece), 4096×2048.
 * Gece/gündüz geçişi shader'da: güneşin o andaki gerçek konumundan
 * (subsolar point) hesaplanan terminatör çizgisi. Kullanıcı isterse
 * tamamen gündüze ya da geceye sabitleyebiliyor.
 *
 * Şehirler kürenin üstünde ışık sütunları: yükseklik = o şehrin toplam
 * etkin harcaması. Ligin başı altın, gerisi pembe. Tıklayınca şehir
 * sayfasına gider.
 */

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export type GlobeCity = {
  id: string;
  name: string;
  country: string;
  cc: string;
  lat: number;
  lon: number;
  cents: number;   // 0 => sadece ambiyans noktası
  listings: number;
  rank: number;    // 0 => sıralama dışı
};

type Mode = "live" | "day" | "night";

const R = 1;

function latLonToVec3(lat: number, lon: number, radius = R): THREE.Vector3 {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/** Güneşin o an tam tepede olduğu nokta — terminatör buradan çıkıyor. */
function subsolarDir(d: Date): THREE.Vector3 {
  const start = Date.UTC(d.getUTCFullYear(), 0, 0);
  const dayOfYear = (d.getTime() - start) / 86_400_000;
  const decl = -23.44 * Math.cos(((360 / 365) * (dayOfYear + 10) * Math.PI) / 180);
  const utcHours =
    d.getUTCHours() + d.getUTCMinutes() / 60 + d.getUTCSeconds() / 3600;
  const lon = -15 * (utcHours - 12);
  return latLonToVec3(decl, lon).normalize();
}

const VERT = /* glsl */ `
  varying vec3 vNormalObj;
  varying vec2 vUv;
  varying vec3 vViewDir;
  void main() {
    vUv = uv;
    vNormalObj = normalize(normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  uniform sampler2D uDay;
  uniform sampler2D uNight;
  uniform vec3  uSun;
  uniform float uMode;      // 0 canlı, 1 gündüz, 2 gece
  uniform vec3  uAtmo;
  varying vec3 vNormalObj;
  varying vec2 vUv;
  varying vec3 vViewDir;

  void main() {
    vec3 day   = texture2D(uDay, vUv).rgb;
    vec3 night = texture2D(uNight, vUv).rgb;

    float d = dot(normalize(vNormalObj), normalize(uSun));
    float t = smoothstep(-0.07, 0.13, d);
    if (uMode > 1.5)      t = 0.0;
    else if (uMode > 0.5) t = 1.0;

    // Gece tarafı: şehir ışıkları sıcak ve hafif abartılı — asıl hikâye orada.
    vec3 nightLit = night * vec3(1.45, 1.20, 0.85) * 1.15;
    vec3 col = mix(nightLit, day * 1.05, t);

    // Terminatörde ince turuncu şafak çizgisi
    float dusk = exp(-pow((d + 0.01) * 30.0, 2.0));
    col += vec3(0.40, 0.16, 0.04) * dusk * (uMode < 0.5 ? 1.0 : 0.0);

    // Atmosfer halkası
    float fres = pow(1.0 - max(dot(normalize(vViewDir), normalize(vNormalObj)), 0.0), 3.4);
    col += uAtmo * fres * (0.16 + 0.30 * t);

    gl_FragColor = vec4(col, 1.0);
  }
`;

const GLOW_VERT = /* glsl */ `
  varying vec3 vNormalObj;
  varying vec3 vViewDir;
  void main() {
    vNormalObj = normalize(normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const GLOW_FRAG = /* glsl */ `
  uniform vec3 uColor;
  varying vec3 vNormalObj;
  varying vec3 vViewDir;
  void main() {
    float i = pow(1.0 - abs(dot(normalize(vViewDir), normalize(vNormalObj))), 3.2);
    gl_FragColor = vec4(uColor, i * 0.55);
  }
`;

export default function GlobeView({
  cities,
  focusId,
  onSelect,
}: {
  cities: GlobeCity[];
  focusId?: string | null;
  onSelect?: (city: GlobeCity) => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("live");
  const [hover, setHover] = useState<{ c: GlobeCity; x: number; y: number } | null>(null);
  const [ready, setReady] = useState(false);

  // Sahne bir kez kurulur; React state'i uniform/hedef olarak içeri sızar.
  const api = useRef<{
    setMode: (m: Mode) => void;
    focus: (id: string) => void;
  } | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 3.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // Özel shader kullanıyoruz: three'nin otomatik sRGB dönüşümü devrede
    // olursa dokular iki kez parlatılıyor. Boru hattını doğrudan geçiriyoruz.
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.touchAction = "pan-y";
    renderer.domElement.style.cursor = "grab";

    const world = new THREE.Group();
    scene.add(world);

    // --- yıldızlar ---
    const starGeo = new THREE.BufferGeometry();
    const starCount = 1400;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const v = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      );
      if (v.lengthSq() < 0.001) v.set(1, 0, 0);
      v.normalize().multiplyScalar(12 + Math.random() * 18);
      starPos.set([v.x, v.y, v.z], i * 3);
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ color: 0xffffff, size: 0.06, sizeAttenuation: true, transparent: true, opacity: 0.55 })
    );
    scene.add(stars);

    // --- küre ---
    const loader = new THREE.TextureLoader();
    const load = (u: string) =>
      new Promise<THREE.Texture>((res) => {
        loader.load(u, (t) => {
          t.colorSpace = THREE.NoColorSpace;
          t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
          res(t);
        }, undefined, () => res(new THREE.Texture()));
      });

    const uniforms = {
      uDay: { value: new THREE.Texture() },
      uNight: { value: new THREE.Texture() },
      uSun: { value: subsolarDir(new Date()) },
      uMode: { value: 0 },
      uAtmo: { value: new THREE.Color(0x2b6cff) },
    };

    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(R, 96, 64),
      new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms })
    );
    world.add(globe);

    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(R * 1.035, 64, 48),
      new THREE.ShaderMaterial({
        vertexShader: GLOW_VERT,
        fragmentShader: GLOW_FRAG,
        uniforms: { uColor: { value: new THREE.Color(0x4a8dff) } },
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
      })
    );
    world.add(halo);

    Promise.all([load("/textures/earth-day.jpg"), load("/textures/earth-night.jpg")]).then(
      ([day, night]) => {
        uniforms.uDay.value = day;
        uniforms.uNight.value = night;
        setReady(true);
      }
    );

    // --- şehirler ---
    const active = cities.filter((c) => c.cents > 0);
    const ambient = cities.filter((c) => c.cents <= 0);
    const maxCents = Math.max(1, ...active.map((c) => c.cents));

    // sönük ambiyans noktaları — dünya boş görünmesin
    if (ambient.length) {
      const g = new THREE.BufferGeometry();
      const p = new Float32Array(ambient.length * 3);
      ambient.forEach((c, i) => {
        const v = latLonToVec3(c.lat, c.lon, R * 1.002);
        p.set([v.x, v.y, v.z], i * 3);
      });
      g.setAttribute("position", new THREE.BufferAttribute(p, 3));
      world.add(
        new THREE.Points(
          g,
          new THREE.PointsMaterial({
            color: 0x8fb4ff,
            size: 0.011,
            transparent: true,
            opacity: 0.45,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        )
      );
    }

    // ışık sütunları
    const GOLD = new THREE.Color(0xffc247);
    const PINK = new THREE.Color(0xff5f8d);
    let bars: THREE.InstancedMesh | null = null;
    let dots: THREE.InstancedMesh | null = null;

    if (active.length) {
      const barGeo = new THREE.CylinderGeometry(0.0045, 0.0045, 1, 6, 1, true);
      barGeo.translate(0, 0.5, 0);
      bars = new THREE.InstancedMesh(
        barGeo,
        new THREE.MeshBasicMaterial({
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
        active.length
      );

      const dotGeo = new THREE.SphereGeometry(0.014, 10, 8);
      dots = new THREE.InstancedMesh(
        dotGeo,
        new THREE.MeshBasicMaterial({
          transparent: true,
          opacity: 0.95,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
        active.length
      );

      const up = new THREE.Vector3(0, 1, 0);
      const m = new THREE.Matrix4();
      const q = new THREE.Quaternion();
      const s = new THREE.Vector3();

      active.forEach((c, i) => {
        const base = latLonToVec3(c.lat, c.lon, R);
        const dir = base.clone().normalize();
        q.setFromUnitVectors(up, dir);

        // Kök: karekök ölçek — 1. şehir ezip geçmesin, küçükler görünsün.
        const h = 0.05 + 0.42 * Math.sqrt(c.cents / maxCents);
        s.set(1, h, 1);
        m.compose(base, q, s);
        bars!.setMatrixAt(i, m);

        const col = c.rank === 1 ? GOLD : PINK;
        bars!.setColorAt(i, col);

        const tip = dir.clone().multiplyScalar(R + h);
        m.compose(tip, q, new THREE.Vector3(1, 1, 1));
        dots!.setMatrixAt(i, m);
        dots!.setColorAt(i, col);
      });

      bars.instanceMatrix.needsUpdate = true;
      dots.instanceMatrix.needsUpdate = true;
      if (bars.instanceColor) bars.instanceColor.needsUpdate = true;
      if (dots.instanceColor) dots.instanceColor.needsUpdate = true;
      world.add(bars, dots);
    }

    // --- ligin başındaki şehirler için HTML etiketleri ---
    // 3D metin yerine DOM: her karede projeksiyon, kürenin arkasına
    // düşenler gizleniyor. Ucuz ve her ekranda net.
    const labelHost = document.createElement("div");
    labelHost.className = "globe__labels";
    host.appendChild(labelHost);

    const labels = active.slice(0, 5).map((c) => {
      const el = document.createElement("button");
      el.type = "button";
      el.className = "globe__label" + (c.rank === 1 ? " is-top" : "");
      el.innerHTML =
        `<b>${c.name}</b><i>$${Math.round(c.cents / 100).toLocaleString("en-US")}</i>`;
      el.addEventListener("click", () => { window.location.href = `/city/${c.id}`; });
      labelHost.appendChild(el);
      const h = 0.05 + 0.42 * Math.sqrt(c.cents / maxCents);
      return { el, pos: latLonToVec3(c.lat, c.lon, R + h + 0.03) };
    });

    const projected = new THREE.Vector3();

    function placeLabels() {
      if (!labels.length) return;
      const w = renderer.domElement.clientWidth;
      const h = renderer.domElement.clientHeight;
      for (const l of labels) {
        projected.copy(l.pos).applyMatrix4(world.matrixWorld);
        const toCam = projected.clone().sub(camera.position);
        const facing = projected.clone().normalize().dot(toCam.clone().normalize()) < -0.15;
        projected.project(camera);
        const x = (projected.x * 0.5 + 0.5) * w;
        const y = Math.max(26, (-projected.y * 0.5 + 0.5) * h);
        l.el.style.transform = `translate(-50%, -100%) translate(${x}px, ${y}px)`;
        l.el.style.opacity = facing ? "1" : "0";
        l.el.style.pointerEvents = facing ? "auto" : "none";
      }
    }

    // --- etkileşim: sürükle-döndür, tekerlek-yakınlaş ---
    let rotX = 0.26, rotY = -1.9;      // açılışta Avrupa/Akdeniz
    let velX = 0, velY = -0.0016;      // boştayken yavaş dönüş
    let dragging = false, moved = 0;
    let px = 0, py = 0;
    let dist = 3.2;
    let target: { x: number; y: number } | null = null;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      moved = 0;
      px = e.clientX;
      py = e.clientY;
      target = null;
      renderer.domElement.setPointerCapture(e.pointerId);
      renderer.domElement.style.cursor = "grabbing";
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      renderer.domElement.style.cursor = "grab";
      if (moved < 5) pick(e, true);
      try { renderer.domElement.releasePointerCapture(e.pointerId); } catch { /* yoksay */ }
    };
    const onMove = (e: PointerEvent) => {
      if (dragging) {
        const dx = e.clientX - px, dy = e.clientY - py;
        px = e.clientX; py = e.clientY;
        moved += Math.abs(dx) + Math.abs(dy);
        velY = dx * 0.005;
        velX = dy * 0.005;
        rotY += velY;
        rotX = Math.max(-1.2, Math.min(1.2, rotX + velX));
      } else {
        pick(e, false);
      }
    };
    const onWheel = (e: WheelEvent) => {
      if (!e.deltaY) return;
      e.preventDefault();
      dist = Math.max(1.55, Math.min(4.2, dist + e.deltaY * 0.0016));
    };

    const ray = new THREE.Raycaster();
    ray.params.Points = { threshold: 0.02 };
    const ndc = new THREE.Vector2();

    function pick(e: PointerEvent, click: boolean) {
      if (!dots) return;
      const r = renderer.domElement.getBoundingClientRect();
      ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      ray.setFromCamera(ndc, camera);
      const hits = ray.intersectObject(dots, false);
      const id = hits[0]?.instanceId;
      if (id === undefined) {
        if (!click) setHover(null);
        return;
      }
      const c = active[id];
      if (click) {
        onSelect?.(c);
        window.location.href = `/city/${c.id}`;
      } else {
        setHover({ c, x: e.clientX - r.left, y: e.clientY - r.top });
        renderer.domElement.style.cursor = "pointer";
      }
    }

    renderer.domElement.addEventListener("pointerdown", onDown);
    renderer.domElement.addEventListener("pointerup", onUp);
    renderer.domElement.addEventListener("pointermove", onMove);
    renderer.domElement.addEventListener("pointerleave", () => setHover(null));
    renderer.domElement.addEventListener("wheel", onWheel, { passive: false });

    api.current = {
      setMode: (m) => {
        uniforms.uMode.value = m === "live" ? 0 : m === "day" ? 1 : 2;
      },
      focus: (id) => {
        const c = cities.find((x) => x.id === id);
        if (!c) return;
        target = { x: (c.lat * Math.PI) / 180, y: -Math.PI / 2 - (c.lon * Math.PI) / 180 };
        // en yakın tur: hedefe kısa yoldan git
        const twoPi = Math.PI * 2;
        while (target.y - rotY > Math.PI) target.y -= twoPi;
        while (target.y - rotY < -Math.PI) target.y += twoPi;
        dist = 2.4;
      },
    };

    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let sunAt = Date.now();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);

      if (target) {
        rotX += (target.x - rotX) * 0.08;
        rotY += (target.y - rotY) * 0.08;
        if (Math.abs(target.x - rotX) < 0.002 && Math.abs(target.y - rotY) < 0.002) target = null;
      } else if (!dragging) {
        velY += (-0.0016 - velY) * 0.02;   // yavaşça serbest dönüşe dön
        velX *= 0.92;
        rotY += velY;
        rotX = Math.max(-1.2, Math.min(1.2, rotX + velX));
      }

      world.rotation.x = rotX;
      world.rotation.y = rotY;
      camera.position.z += (dist - camera.position.z) * 0.09;
      stars.rotation.y += 0.00008;
      world.updateMatrixWorld();
      camera.updateMatrixWorld();
      placeLabels();

      if (Date.now() - sunAt > 60_000) {
        sunAt = Date.now();
        uniforms.uSun.value = subsolarDir(new Date());
      }

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onDown);
      renderer.domElement.removeEventListener("pointerup", onUp);
      renderer.domElement.removeEventListener("pointermove", onMove);
      renderer.domElement.removeEventListener("wheel", onWheel);
      renderer.dispose();
      host.removeChild(renderer.domElement);
      labelHost.remove();
      api.current = null;
    };
    // Şehir listesi sayfa yüklenirken sabit; sahne bir kez kurulur.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cities]);

  useEffect(() => { api.current?.setMode(mode); }, [mode]);
  useEffect(() => { if (focusId) api.current?.focus(focusId); }, [focusId]);

  return (
    <div className="globe">
      <div className="globe__canvas" ref={hostRef} />
      {!ready && <div className="globe__loading">loading earth…</div>}

      <div className="globe__modes" role="group" aria-label="Globe lighting">
        {(["live", "day", "night"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            className={mode === m ? "is-on" : ""}
            onClick={() => setMode(m)}
          >
            {m === "live" ? "Live" : m === "day" ? "Day" : "Night"}
          </button>
        ))}
      </div>

      {hover && (
        <div
          className="globe__tip"
          style={{ left: hover.x, top: hover.y }}
          aria-hidden
        >
          <strong>{hover.c.name}</strong>
          <span>
            {hover.c.rank > 0 ? `#${hover.c.rank} · ` : ""}
            ${(hover.c.cents / 100).toLocaleString("en-US", { maximumFractionDigits: 0 })} ·{" "}
            {hover.c.listings} {hover.c.listings === 1 ? "profile" : "profiles"}
          </span>
        </div>
      )}
    </div>
  );
}
