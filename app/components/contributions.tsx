import { contributions } from "app/data/contributions";
import { FaGithub } from "react-icons/fa";

export function Contributions() {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-semibold tracking-tighter">
        Open-Source & Contributions 👨🏻‍💻
      </h2>
      <div className="space-y-6">
        {contributions.map((project) => (
          <div key={project.url} className="space-y-1">
            <h3 className="text-lg font-medium">{project.name}</h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-left text-sm">
              {project.description}
            </p>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
            >
              <FaGithub className="text-lg" />
              <span>View on GitHub</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
