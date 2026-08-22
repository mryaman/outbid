"use client";

import dynamic from "next/dynamic";
import type { GlobeCity } from "./GlobeView";

const GlobeView = dynamic(() => import("./GlobeView"), {
  ssr: false,
  loading: () => <div className="globe globe--skeleton globe--small" aria-hidden />,
});

/** Şehir sayfasındaki küçük küre — açılışta o şehre kilitli. */
export default function CityGlobe({
  cities,
  focusId,
}: {
  cities: GlobeCity[];
  focusId: string;
}) {
  return (
    <div className="globe-wrap globe-wrap--small">
      <GlobeView cities={cities} focusId={focusId} />
    </div>
  );
}
