import { contributions } from "app/data/contributions";
import { FaGithub } from "react-icons/fa";

export function Contributions() {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {contributions.map((project) => (
          <div key={project.url} className="card p-5 sm:p-6 flex flex-col">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">{project.name}</h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm/relaxed mb-5 flex-1">
              {project.description}
            </p>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-teal hover:text-teal/80 transition-colors focus-visible:outline-none"
            >
              <FaGithub className="text-sm" />
              <span>View Source</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
