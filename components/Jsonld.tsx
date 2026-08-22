import { jsonLd } from "@/lib/seo";

/** Tek yerden JSON-LD basma. Birden fazla blok verilebilir. */
export default function Jsonld({ data }: { data: unknown[] }) {
  return (
    <>
      {data.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(d) }}
        />
      ))}
    </>
  );
}
