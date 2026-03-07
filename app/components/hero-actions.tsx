"use client";

export function HeroActions() {
    function scrollTo(id: string) {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <a
                href="mailto:anand.thakkar@outlook.com?subject=Hello%20Anand"
                className="btn-primary"
            >
                Let's Connect ✉️
            </a>
            <a
                href="/Anand_Thakkar.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-semibold px-6 py-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all duration-200"
            >
                View Résumé
            </a>
            <button
                onClick={() => scrollTo("about")}
                className="text-neutral-500 dark:text-neutral-400 hover:text-teal text-sm font-medium transition-colors flex items-center gap-1"
            >
                Know me more ↓
            </button>
        </div>
    );
}
