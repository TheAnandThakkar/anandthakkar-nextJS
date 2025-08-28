import { skills } from "app/data/skills";

export function Skills() {
  return (
    <div className="space-y-6">
      {skills.map((skill) => (
        <div key={skill.category}>
          <h3 className="text-base font-medium mb-2">{skill.category}</h3>
          <div className="flex flex-wrap gap-2">
            {skill.items.map((item) => (
              <span
                key={item}
                className="px-3 py-1 text-sm rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
