"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import ClaimForm from "./ClaimForm";
import type { GlobeCity } from "./GlobeView";

// three.js sunucuda çalışmaz; küre yalnızca tarayıcıda yüklenir.
const GlobeView = dynamic(() => import("./GlobeView"), {
  ssr: false,
  loading: () => <div className="globe globe--skeleton" aria-hidden />,
});

export default function GlobeSection({
  cities,
  paid,
}: {
  cities: GlobeCity[];
  paid: boolean;
}) {
  const [focus, setFocus] = useState<string | null>(null);

  return (
    <div className="globe-section">
      <GlobeView cities={cities} focusId={focus} />
      <ClaimForm onPreview={setFocus} paid={paid} />
    </div>
  );
}
