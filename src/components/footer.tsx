import Link from "next/link";

export default function Footer() {
  const mainLinks = [
    { href: "/about", label: "About" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    { href: "https://x.com/TheGrayCup", label: "Twitter" },
    { href: "https://github.com/Gray-Cup", label: "GitHub" },
    { href: "https://discord.gg/gpRxmW63JW", label: "Discord" },
    { href: "https://instagram.com/thegraycup", label: "Instagram" },
  ];

  const resourceLinks = [
    { href: "https://status.graycup.org/", label: "Status" },
    { href: "/sitemap.xml", label: "Sitemap" },
  ];

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:underline hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {socialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:underline hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Minimal legal line */}
        <p className="mt-6 text-xs text-muted-foreground">
          Gray Cup® is a brand operated by Gray Cup Enterprises Private Limited,
          a company incorporated in India. CIN: U47211DL2025PTC457808 · GSTIN:
          07AAMCG4985H1Z2 · IEC: AAMCG4985H.
        </p>

        <div className="mt-6 pt-6 border-t border-neutral-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()}{" "}
            <a
              href="https://graycup.org"
              className="hover:underline"
            >
              Gray Cup
            </a>
            . All rights reserved.
          </p>

          <nav className="flex items-center gap-x-6">
            {resourceLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="hover:text-foreground hover:underline transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
