const LINKS = [
  { href: "/", label: "Leaderboard" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/rules", label: "Rules" },
];

export default function Nav({ current = "/" }: { current?: string }) {
  return (
    <nav className="nav" aria-label="Main">
      {LINKS.map((l) => (
        <a
          key={l.href}
          href={l.href}
          aria-current={current === l.href ? "page" : undefined}
        >
          {l.label}
        </a>
      ))}
    </nav>
  );
}
