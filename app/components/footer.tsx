import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { VisitorCounter } from "./visitor-counter";

type SocialLinkProps = {
  href: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
};

function SocialLink({ href, label, Icon }: SocialLinkProps) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-neutral-500 transition-colors hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-magenta"
        title={label}
      >
        <Icon className="text-[18px] transition-colors" />
        <span className="font-medium">{label}</span>
      </a>
    </li>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-900 py-8">
      <div className="container-main flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-1 items-center sm:items-start text-center sm:text-left">
          <p className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">
            © {year} Anand Thakkar — public site, built in the open.
          </p>
          <VisitorCounter />
        </div>
        <ul className="flex flex-wrap gap-1 items-center">
          <SocialLink
            href="https://github.com/TheAnandThakkar"
            label="GitHub"
            Icon={FaGithub}
          />
          <SocialLink
            href="https://linkedin.com/in/theanandthakkar"
            label="LinkedIn"
            Icon={FaLinkedin}
          />
          <SocialLink
            href="https://x.com/theanandthakkar"
            label="X (Twitter)"
            Icon={FaXTwitter}
          />
        </ul>
      </div>
    </footer>
  );
}
