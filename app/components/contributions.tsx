import { contributions } from "app/data/contributions";

export function Contributions() {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-semibold tracking-tighter">
        Open-Source & Contributions 👨🏻‍💻
      </h2>
      <div className="space-y-6">
        {contributions.map((project) => (
          <div key={project.url} className="space-y-1">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 tracking-tight underline hover:text-blue-800 dark:hover:text-blue-300 font-medium text-lg"
            >
              {project.name}
            </a>
            <p className="text-neutral-600 dark:text-neutral-400 text-left text-sm">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
