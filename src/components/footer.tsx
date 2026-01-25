import GrayCupLogo from "./GrayCupLogo";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 ">
          <div>
            <h4 className="font-semibold text-md mb-4">Main</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-md mb-2">Socials</h4>
            <div className="flex flex-row gap-14">
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="https://x.com/TheGrayCup"
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/Gray-Cup"
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Github
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://discord.gg/gpRxmW63JW"
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Discord
                  </Link>
                </li>
              </ul>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="https://instagram.com/thegraycup"
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/Gray-Cup"
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Reddit
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://status.graycup.org/"
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Status Page
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Gray Cup. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
