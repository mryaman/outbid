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
import type { Platform } from "@/lib/normalize";
import { platformSvg } from "@/lib/platformPaths";

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
  /** O şehrin #1'inin platformu — küredeki işaret bu amblemi taşıyor. */
  platform?: Platform;
  /** #1 kaydın başlığı (@handle ya da alan adı) — hover metninde. */
  top?: string | null;
};

type Mode = "live" | "day" | "night";
/** Küre gösteri, harita araç: kürede dünyanın yarısı görünmüyor. */
type View = "globe" | "map";

const R = 1;
/** Düz harita düzlemi — dokusu ekvatoral (equirectangular), yani 2:1. */
const MAP_W = 4;
const MAP_H = 2;
/** Harita kamerasının uzaklık aralığı — küçük değer = yakın. */
const MAP_NEAR = 0.9;
const MAP_FAR = 3.0;

function latLonToVec3(lat: number, lon: number, radius = R): THREE.Vector3 {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/**
 * Aynı enlem/boylamın düz haritadaki karşılığı. Doku ekvatoral olduğu için
 * dönüşüm doğrusal: u = (lon+180)/360, v = (lat+90)/180.
 * `lift` işareti düzlemin biraz önüne alır (z), sütun yüksekliği gibi.
 */
function latLonToPlane(lat: number, lon: number, lift = 0): THREE.Vector3 {
  const u = (lon + 180) / 360;
  const v = (lat + 90) / 180;
  return new THREE.Vector3((u - 0.5) * MAP_W, (v - 0.5) * MAP_H, lift);
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
  uniform float uFlat;      // 0 küre, 1 düz harita
  uniform vec3  uAtmo;
  varying vec3 vNormalObj;
  varying vec2 vUv;
  varying vec3 vViewDir;

  void main() {
    vec3 day   = texture2D(uDay, vUv).rgb;
    vec3 night = texture2D(uNight, vUv).rgb;

    // Düz haritada geometrinin normali düzlemin normali; terminatörü
    // doğru çizebilmek için küre normalini uv'den geri kuruyoruz.
    vec3 nrm = normalize(vNormalObj);
    if (uFlat > 0.5) {
      float phi = 3.14159265 * (1.0 - vUv.y);
      float th  = 6.28318531 * vUv.x;
      nrm = vec3(-sin(phi) * cos(th), cos(phi), sin(phi) * sin(th));
    }

    float d = dot(nrm, normalize(uSun));
    float t = smoothstep(-0.07, 0.13, d);
    if (uMode > 1.5)      t = 0.0;
    else if (uMode > 0.5) t = 1.0;

    // Gece tarafı: şehir ışıkları sıcak ve hafif abartılı — asıl hikâye orada.
    vec3 nightLit = night * vec3(1.45, 1.20, 0.85) * 1.15;
    vec3 col = mix(nightLit, day * 1.05, t);

    // Terminatörde ince turuncu şafak çizgisi
    // Şafak çizgisi yalnızca kürede: ekvatoral projeksiyonda kutuplara doğru
    // esneyip geniş turuncu bir mercek gibi görünüyor.
    float dusk = exp(-pow((d + 0.01) * 30.0, 2.0));
    col += vec3(0.40, 0.16, 0.04) * dusk * (uMode < 0.5 ? 1.0 : 0.0) * (1.0 - uFlat);

    // Atmosfer halkası — yalnızca kürede anlamlı
    float fres = pow(1.0 - max(dot(normalize(vViewDir), normalize(vNormalObj)), 0.0), 3.4);
    col += uAtmo * fres * (0.16 + 0.30 * t) * (1.0 - uFlat);

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
  const [view, setView] = useState<View>("globe");
  const [hover, setHover] = useState<{ c: GlobeCity; x: number; y: number } | null>(null);
  const [ready, setReady] = useState(false);

  // Sahne bir kez kurulur; React state'i uniform/hedef olarak içeri sızar.
  const api = useRef<{
    setMode: (m: Mode) => void;
    setView: (v: View) => void;
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
      uFlat: { value: 0 },
      uAtmo: { value: new THREE.Color(0x2b6cff) },
    };

    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(R, 96, 64),
      new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms })
    );
    world.add(globe);

    // Düz harita — aynı doku, aynı shader, yalnızca düzlem üstünde.
    // Kürede dünyanın yarısı arkada kalıyor; boş şehrini arayan kullanıcı
    // için asıl çalışan görünüm bu.
    const flatUniforms = { ...uniforms, uFlat: { value: 1 } };
    const flat = new THREE.Mesh(
      new THREE.PlaneGeometry(MAP_W, MAP_H, 1, 1),
      new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: flatUniforms })
    );
    flat.visible = false;
    world.add(flat);

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
    // Etiket yerleşimi "en zengin önce" mantığıyla çalışıyor; ışık sütunları,
    // noktalar ve raycast hepsi bu diziyi indeksliyor, bu yüzden burada bir kez
    // sıralayıp her yerde aynı sırayı kullanıyoruz.
    const active = cities
      .filter((c) => c.cents > 0)
      .sort((a, b) => b.cents - a.cents);
    const ambient = cities.filter((c) => c.cents <= 0);
    const maxCents = Math.max(1, ...active.map((c) => c.cents));

    // sönük ambiyans noktaları — dünya boş görünmesin
    let ambientPos: THREE.BufferAttribute | null = null;
    if (ambient.length) {
      const g = new THREE.BufferGeometry();
      const p = new Float32Array(ambient.length * 3);
      ambientPos = new THREE.BufferAttribute(p, 3);
      g.setAttribute("position", ambientPos);
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

      active.forEach((c, i) => {
        const col = c.rank === 1 ? GOLD : PINK;
        bars!.setColorAt(i, col);
        dots!.setColorAt(i, col);
      });
      if (bars.instanceColor) bars.instanceColor.needsUpdate = true;
      if (dots.instanceColor) dots.instanceColor.needsUpdate = true;
      world.add(bars, dots);
    }

    /** Sütun yüksekliği — karekök ölçek: 1. şehir ezip geçmesin, küçükler görünsün. */
    const barHeight = (cents: number) => 0.05 + 0.42 * Math.sqrt(cents / maxCents);
    // Haritada sütun izleyiciye doğru uzuyor; perspektifte uzun sütunlar yana
    // yatıp çizgiye dönüşüyor, o yüzden kısa pin olarak çiziliyor.
    const MAP_BAR = 0.28;
    const barFor = (cents: number, v: View) =>
      v === "globe" ? barHeight(cents) : barHeight(cents) * MAP_BAR;

    // Görünüm değişince sütunlar, noktalar ve ambiyans noktaları yeniden
    // yerleşiyor: kürede yarıçap boyunca dışa, haritada düzlemden öne.
    const UP = new THREE.Vector3(0, 1, 0);
    const FWD = new THREE.Vector3(0, 0, 1);
    const tmpM = new THREE.Matrix4();
    const tmpQ = new THREE.Quaternion();
    const tmpS = new THREE.Vector3();
    const ONE = new THREE.Vector3(1, 1, 1);

    function placeCityMeshes(v: View) {
      if (ambientPos) {
        const arr = ambientPos.array as Float32Array;
        ambient.forEach((c, i) => {
          const p = v === "globe"
            ? latLonToVec3(c.lat, c.lon, R * 1.002)
            : latLonToPlane(c.lat, c.lon, 0.004);
          arr.set([p.x, p.y, p.z], i * 3);
        });
        ambientPos.needsUpdate = true;
      }

      if (!bars || !dots) return;
      active.forEach((c, i) => {
        const h = barFor(c.cents, v);
        if (v === "globe") {
          const base = latLonToVec3(c.lat, c.lon, R);
          const dir = base.clone().normalize();
          tmpQ.setFromUnitVectors(UP, dir);
          tmpS.set(1, h, 1);
          tmpM.compose(base, tmpQ, tmpS);
          bars!.setMatrixAt(i, tmpM);
          tmpM.compose(dir.multiplyScalar(R + h), tmpQ, ONE);
          dots!.setMatrixAt(i, tmpM);
        } else {
          // Haritada sütun düzlemin dışına, izleyiciye doğru uzuyor.
          const base = latLonToPlane(c.lat, c.lon, 0);
          tmpQ.setFromUnitVectors(UP, FWD);
          tmpS.set(1, h, 1);
          tmpM.compose(base, tmpQ, tmpS);
          bars!.setMatrixAt(i, tmpM);
          tmpM.compose(latLonToPlane(c.lat, c.lon, h), tmpQ, ONE);
          dots!.setMatrixAt(i, tmpM);
        }
      });
      bars.instanceMatrix.needsUpdate = true;
      dots.instanceMatrix.needsUpdate = true;
    }

    placeCityMeshes("globe");

    // --- şehir işaretleri: çakışmaya duyarlı, üç kademeli yerleşim ---
    //
    // Asıl sorun küre boyutu değil: iki şehir aynı piksele düşünce etiketleri
    // üst üste biniyor (Ankara–İstanbul 350 km, kürede ~30 px). Bu yüzden
    // etiketler her karede tutara göre sırayla yerleştiriliyor ve kutusu daha
    // zengin bir etiketle çakışan etiket bir alt kademeye iniyor:
    //
    //   0 tam   bayrak + şehir + tutar
    //   1 mini  bayrak + tutar        (ad gizli, kutu ~3× dar)
    //   2 nokta yalnızca işaret       (ad hover'da / title'da)
    //  -1 gizli yerini kazanan işarete "+N" rozeti olarak yazılıyor
    //
    // Kaç tam/mini etiketin sığdığı küre genişliğine ve yakınlaştırmaya bağlı;
    // yakınlaştıkça yazı açılıyor. Böylece şehir sayısı büyüdükçe görüntü
    // bozulmuyor, yalnızca detay seviyesi düşüyor.
    const labelHost = document.createElement("div");
    labelHost.className = "globe__labels";
    host.appendChild(labelHost);

    const esc = (s: string) =>
      s.replace(/[&<>"]/g, (ch) =>
        ch === "&" ? "&amp;" : ch === "<" ? "&lt;" : ch === ">" ? "&gt;" : "&quot;"
      );

    const usd = (cents: number) => {
      const d = cents / 100;
      return d >= 1000
        ? `$${(d / 1000).toFixed(d >= 10000 ? 0 : 1)}k`
        : `$${Math.round(d)}`;
    };

    // DOM'a giren işaret sayısı sınırlı; gerisi zaten 3D nokta olarak duruyor.
    const MARK_LIMIT = 120;
    const TIER_CLASS = ["is-full", "is-mini", "is-dot"];

    type Mark = {
      c: GlobeCity;
      el: HTMLButtonElement;
      badge: HTMLElement;
      posGlobe: THREE.Vector3;
      posMap: THREE.Vector3;
      w: [number, number, number];   // kademe başına ölçülen genişlik
      h: number;
      tier: number;
      more: number;
      shownMore: number;
      x: number;
      y: number;
    };

    const marks: Mark[] = active.slice(0, MARK_LIMIT).map((c) => {
      const el = document.createElement("button");
      el.type = "button";
      el.className = "globe__mark";
      // Amblem = o şehrin #1'inin platformu. Metinden çok daha dar ve
      // "burayı kim tutuyor" sorusunu tek bakışta cevaplıyor.
      el.innerHTML =
        `<span class="gm-logo gm-logo--${c.platform ?? "web"}" aria-hidden>` +
        `${platformSvg(c.platform ?? "web")}</span>` +
        `<b>${esc(c.name)}</b>` +
        `<i>${usd(c.cents)}</i>` +
        `<u class="gm-more"></u>`;
      // Nokta kademesinde ad yalnızca burada kalıyor — imleç üstüne gelince çıkar.
      el.title = c.top
        ? `${c.name} — ${usd(c.cents)} · #1 ${c.top}`
        : `${c.name} — ${usd(c.cents)}`;
      el.addEventListener("click", () => { window.location.href = `/city/${c.id}`; });
      labelHost.appendChild(el);
      const bh = barHeight(c.cents);
      return {
        c,
        el,
        badge: el.querySelector("u") as HTMLElement,
        posGlobe: latLonToVec3(c.lat, c.lon, R + bh + 0.03),
        posMap: latLonToPlane(c.lat, c.lon, bh * MAP_BAR + 0.02),
        w: [130, 56, 16] as [number, number, number],
        h: 22,
        tier: -2,
        more: 0,
        shownMore: -1,
        x: 0,
        y: 0,
      };
    });

    /** Kademe genişliklerini bir kez ölç: tahmin yerine gerçek kutu. */
    function measureMarks() {
      if (!marks.length) return;
      for (let t = 0; t < 3; t++) {
        for (const m of marks) m.el.className = `globe__mark is-measuring ${TIER_CLASS[t]}`;
        for (const m of marks) {
          m.w[t] = m.el.offsetWidth;
          if (t === 0) m.h = m.el.offsetHeight;
        }
      }
      for (const m of marks) {
        m.el.className = "globe__mark";
        m.tier = -2;
      }
    }
    measureMarks();
    // Yazı tipi geç gelirse genişlikler kayar; bir kez daha ölç.
    document.fonts?.ready.then(measureMarks).catch(() => { /* yoksay */ });

    const projected = new THREE.Vector3();
    const toCam = new THREE.Vector3();
    const nrm = new THREE.Vector3();

    type Box = { x0: number; y0: number; x1: number; y1: number; owner: Mark };
    const boxes: Box[] = [];
    const GAP = 4;   // etiketler arası nefes payı

    function hit(x: number, y: number, w: number, h: number): Box | null {
      const x0 = x - w / 2 - GAP, x1 = x + w / 2 + GAP;
      const y0 = y - h - GAP, y1 = y + GAP;
      for (let i = 0; i < boxes.length; i++) {
        const b = boxes[i];
        if (x0 < b.x1 && x1 > b.x0 && y0 < b.y1 && y1 > b.y0) return b;
      }
      return null;
    }

    function setTier(m: Mark, t: number) {
      if (m.tier === t) return;
      m.tier = t;
      m.el.className =
        "globe__mark" +
        (t >= 0 ? ` ${TIER_CLASS[t]}` : "") +
        (m.c.rank === 1 ? " is-top" : "");
    }

    function placeLabels() {
      if (!marks.length) return;
      const w = renderer.domElement.clientWidth;
      const h = renderer.domElement.clientHeight;
      if (!w || !h) return;

      // Uzakta yalnızca tepe; yakınlaştıkça yazı açılır.
      const zoom = view === "globe"
        ? Math.min(1, Math.max(0, (4.2 - dist) / (4.2 - 1.55)))
        : Math.min(1, Math.max(0, (MAP_FAR - mapZoom) / (MAP_FAR - MAP_NEAR)));
      const maxFull = Math.max(2, Math.round((w / 210) * (0.7 + 1.3 * zoom)));
      const maxMini = Math.max(5, Math.round((w / 78) * (0.7 + 1.5 * zoom)));

      boxes.length = 0;
      let nFull = 0, nMini = 0;
      for (const m of marks) m.more = 0;

      // marks tutara göre sıralı: zengin şehir yerini önce kapar.
      const globeView = view === "globe";
      for (const m of marks) {
        projected.copy(globeView ? m.posGlobe : m.posMap).applyMatrix4(world.matrixWorld);
        // Kürede arkada kalanlar elenir; düz haritada arka yarımküre yok.
        let facing = true;
        if (globeView) {
          toCam.copy(projected).sub(camera.position).normalize();
          nrm.copy(projected).normalize();
          facing = nrm.dot(toCam) < -0.12;
        }
        projected.project(camera);
        const x = (projected.x * 0.5 + 0.5) * w;
        // Üst kenarda kırpılmasın: kutu tepesi hep kadrajın içinde kalsın.
        const y = Math.max(m.h + 8, (-projected.y * 0.5 + 0.5) * h);
        m.x = x;
        m.y = y;

        // Kürenin arkasında ya da kadraj dışında: hiç uğraşma.
        if (!facing || x < -60 || x > w + 60 || y < -60 || y > h + 60) {
          setTier(m, -1);
          continue;
        }

        // Kenarda kırpılmasın diye etiketi kadrajın içine çekiyoruz; ama
        // şehrinden 30 pikselden fazla kopacaksa o kademe iptal, bir alta düşer.
        const nudged = (wid: number) => {
          const cx = Math.min(w - 6 - wid / 2, Math.max(6 + wid / 2, x));
          return Math.abs(cx - x) > 30 ? null : cx;
        };

        let tier = -1;
        let tx = x;
        let blocker: Box | null = null;

        if (nFull < maxFull) {
          const cx = nudged(m.w[0]);
          if (cx !== null) {
            blocker = hit(cx, y, m.w[0], m.h);
            if (!blocker) { tier = 0; tx = cx; }
          }
        }
        if (tier < 0 && nMini < maxMini) {
          const cx = nudged(m.w[1]);
          if (cx !== null) {
            blocker = hit(cx, y, m.w[1], m.h);
            if (!blocker) { tier = 1; tx = cx; }
          }
        }
        if (tier < 0) {
          const cx = nudged(m.w[2]);
          if (cx !== null) {
            blocker = hit(cx, y, m.w[2], m.w[2]);
            if (!blocker) { tier = 2; tx = cx; }
          }
        }

        if (tier < 0) {
          // Yer yok: yerini kapan işaretin sayacına eklen.
          if (blocker) blocker.owner.more++;
          setTier(m, -1);
          continue;
        }

        if (tier === 0) { nFull++; nMini++; }
        else if (tier === 1) nMini++;

        const bw = m.w[tier];
        const bh2 = tier === 2 ? m.w[2] : m.h;
        boxes.push({
          x0: tx - bw / 2 - GAP, x1: tx + bw / 2 + GAP,
          y0: y - bh2 - GAP,     y1: y + GAP,
          owner: m,
        });
        setTier(m, tier);
        m.el.style.transform = `translate(-50%, -100%) translate(${tx}px, ${y}px)`;
      }

      for (const m of marks) {
        if (m.more !== m.shownMore) {
          m.shownMore = m.more;
          m.badge.textContent = m.more > 0 ? `+${m.more}` : "";
        }
      }
    }

    // --- etkileşim ---
    // Kürede: sürükle-döndür, tekerlek-yakınlaş.
    // Haritada: sürükle-kaydır, tekerlek-yakınlaş. İki durum ayrı değişken
    // kümesi tutuyor, böylece görünüm değiştirince kaldığın yer kaybolmuyor.
    let view: View = "globe";
    let rotX = 0.26, rotY = -1.9;      // açılışta Avrupa/Akdeniz
    let velX = 0, velY = -0.0016;      // boştayken yavaş dönüş
    let dragging = false, moved = 0;
    let px = 0, py = 0;
    let dist = 3.2;
    let target: { x: number; y: number } | null = null;

    // Harita durumu: kaydırma (dünya birimlerinde) ve kamera uzaklığı.
    let panX = 0, panY = 0;
    let mapZoom = 2.6;
    let mapTarget: { x: number; y: number } | null = null;

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
      if (!dragging) { pick(e, false); return; }
      const dx = e.clientX - px, dy = e.clientY - py;
      px = e.clientX; py = e.clientY;
      moved += Math.abs(dx) + Math.abs(dy);

      if (view === "globe") {
        velY = dx * 0.005;
        velX = dy * 0.005;
        rotY += velY;
        rotX = Math.max(-1.2, Math.min(1.2, rotX + velX));
        return;
      }
      // Haritada 1 piksel = kamera uzaklığıyla orantılı dünya birimi;
      // yakınlaştıkça kaydırma yavaşlıyor, his sabit kalıyor.
      const k = (mapZoom * 0.68) / Math.max(1, renderer.domElement.clientHeight);
      mapTarget = null;
      panX += dx * k;
      panY -= dy * k;
      clampPan();
    };

    /** Harita kadrajdan kaçmasın: kenarda küçük bir pay bırakıyoruz. */
    function clampPan() {
      const lim = Math.max(0, MAP_W / 2 - mapZoom * 0.30);
      const limY = Math.max(0, MAP_H / 2 - mapZoom * 0.22);
      panX = Math.max(-lim, Math.min(lim, panX));
      panY = Math.max(-limY, Math.min(limY, panY));
    }

    const onWheel = (e: WheelEvent) => {
      if (!e.deltaY) return;
      e.preventDefault();
      if (view === "globe") {
        dist = Math.max(1.55, Math.min(4.2, dist + e.deltaY * 0.0016));
      } else {
        mapZoom = Math.max(MAP_NEAR, Math.min(MAP_FAR, mapZoom + e.deltaY * 0.0016));
        clampPan();
      }
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
      setView: (v) => {
        if (v === view) return;
        view = v;
        globe.visible = v === "globe";
        halo.visible = v === "globe";
        stars.visible = v === "globe";
        flat.visible = v === "map";
        placeCityMeshes(v);
        // Kademeler yeniden hesaplansın diye sınıfları sıfırla.
        for (const m of marks) setTier(m, -1);
      },
      focus: (id) => {
        const c = cities.find((x) => x.id === id);
        if (!c) return;
        if (view === "map") {
          const p = latLonToPlane(c.lat, c.lon);
          mapZoom = 1.5;
          mapTarget = { x: -p.x, y: -p.y };
          return;
        }
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

      if (view === "globe") {
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
        world.rotation.set(rotX, rotY, 0);
        world.position.set(0, 0, 0);
        camera.position.z += (dist - camera.position.z) * 0.09;
        stars.rotation.y += 0.00008;
      } else {
        // Harita: dönüş yok, kendiliğinden hareket yok — kullanıcı nereye
        // baktıysa orada durur.
        if (mapTarget) {
          panX += (mapTarget.x - panX) * 0.12;
          panY += (mapTarget.y - panY) * 0.12;
          if (Math.abs(mapTarget.x - panX) < 0.002 && Math.abs(mapTarget.y - panY) < 0.002) {
            mapTarget = null;
          }
          clampPan();
        }
        world.rotation.set(0, 0, 0);
        world.position.set(panX, panY, 0);
        camera.position.z += (mapZoom - camera.position.z) * 0.12;
      }
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
  useEffect(() => { api.current?.setView(view); }, [view]);
  useEffect(() => { if (focusId) api.current?.focus(focusId); }, [focusId]);

  return (
    <div className="globe">
      <div className="globe__canvas" ref={hostRef} />
      {!ready && <div className="globe__loading">loading earth…</div>}

      <div className="globe__views" role="group" aria-label="Projection">
        {(["globe", "map"] as View[]).map((v) => (
          <button
            key={v}
            type="button"
            className={view === v ? "is-on" : ""}
            onClick={() => setView(v)}
          >
            {v === "globe" ? "Globe" : "Map"}
          </button>
        ))}
      </div>

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
