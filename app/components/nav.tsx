import Link from "next/link";

type NavItem = {
  name: string;
  download?: boolean;
};

const navItems: Record<string, NavItem> = {
  "/": {
    name: "Home",
  },
  "/blog": {
    name: "View all blogs",
  },
  "/resume": {
    name: "Download Resume",
    download: true, // optional flag to identify download links
  },
};

export function Navbar() {
  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name, download }]) => {
              if (download) {
                return (
                  <a
                    key={path}
                    href="/Anand_Thakkar.pdf" // file in public folder
                    download
                    className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
                  >
                    {name}
                  </a>
                );
              } else {
                return (
                  <Link
                    key={path}
                    href={path}
                    className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
                  >
                    {name}
                  </Link>
                );
              }
            })}
          </div>
          {/* This new div acts as a spacer to push the icons to the end */}
          {/* <div className="flex flex-row items-center space-x-4 ml-auto">
            <a
              className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href="https://linkedin.com/in/theanandthakkar"
            >
              <img src="/linkedin.png" alt="LinkedIn Logo" className="h-7" />
            </a>
            <a
              className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href="https://twitter.com/theanandthakkar"
            >
              <img src="/twitter.png" alt="Twitter Logo" className="h-7" />
            </a>
            <a
              className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/theanandthakkar"
            >
              <img src="/github.png" alt="GitHub Logo" className="h-7" />
            </a>
          </div> */}
        </nav>
      </div>
    </aside>
  );
}
