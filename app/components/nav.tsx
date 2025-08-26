import Link from 'next/link'

const navItems = {
  '/': {
    name: 'home',
  },
  '/blog': {
    name: 'blog',
  },
  '/resume': {
    name: 'Download Resume',
    download: true,  // add a flag to identify download links
  },
}

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
                // For resume, use <a> with download attribute
                return (
                  <a
                    key={path}
                    href="/Anand_Thakkar.pdf"  // path relative to public folder
                    download
                    className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
                  >
                    {name}
                  </a>
                )
              } else {
                // For normal nav links use Next.js Link component
                return (
                  <Link
                    key={path}
                    href={path}
                    className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
                  >
                    {name}
                  </Link>
                )
              }
            })}
          </div>
        </nav>
      </div>
    </aside>
  )
}
