import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Gray Cup
          </p>

          <nav className="flex flex-wrap items-center gap-6 text-sm">
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/products"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Products
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/sitemap.xml"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Sitemap
            </Link>
          </nav>

          <div className="flex items-center gap-6 text-sm">
            <Link
              href="https://x.com/TheGrayCup"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Twitter
            </Link>
            <Link
              href="https://github.com/Gray-Cup"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </Link>
            <Link
              href="https://discord.gg/gpRxmW63JW"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Discord
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
