import Image from "next/image";

type Moment = {
  src: string;
  alt: string;
  caption: string;
};

// Placeholder imagery (free Unsplash). Swap each `src` with your own photos later.
const moments: Moment[] = [
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    alt: "Working late on a build",
    caption: "Heads-down on a build",
  },
  {
    src: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=1200&auto=format&fit=crop",
    alt: "At GIFT City, Gandhinagar",
    caption: "GIFT City, where finance meets code",
  },
  {
    src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop",
    alt: "Writing and thinking out loud",
    caption: "Thinking out loud, on paper first",
  },
];

export function Moments() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {moments.map((m) => (
        <figure
          key={m.src}
          className="group relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={m.src}
              alt={m.alt}
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          </div>
          <figcaption className="absolute bottom-0 left-0 right-0 p-4 text-sm font-medium text-white">
            {m.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
