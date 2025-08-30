import Link from "next/link";

type NavItem = {
  name: string;
  download?: boolean;
};

const navItems: Record<string, NavItem> = {
  "/": {
    name: "Home",
  },
  // "/blog": {
  //   name: "View all blogs",
  // },
  "/resume": {
    name: "Download Resume",
    download: true, // optional flag to identify download links
  },
};

export function Navbar() {
  return (
    <aside className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-neutral-900 shadow-md">
      <div className="max-w-5xl mx-auto">
        <nav className="flex items-center px-4 py-2" id="nav">
          <div className="flex flex-row space-x-2">
            {Object.entries(navItems).map(([path, { name, download }]) => {
              if (download) {
                return (
                  <a
                    key={path}
                    href="/Anand_Thakkar.pdf"
                    download
                    className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 py-1 px-2"
                  >
                    {name}
                  </a>
                );
              } else {
                return (
                  <Link
                    key={path}
                    href={path}
                    className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 py-1 px-2"
                  >
                    {name}
                  </Link>
                );
              }
            })}
          </div>

          {/* Contact aligned right */}
          <div className="ml-auto">
            <a
              href="mailto:anand.thakkar92@gmail.com"
              className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 py-1 px-2"
            >
              ✉️ Email me
            </a>
          </div>
        </nav>
      </div>
    </aside>
  );
}
