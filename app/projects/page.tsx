import { Contributions } from "../components/contributions";

export const metadata = {
    title: 'Projects | Anand Thakkar',
    description: 'Portfolio of open-source contributions, software experiments, and technical projects by Anand Thakkar.',
};

export default function ProjectsPage() {
    return (
        <section className="pt-20 pb-12">
            <div className="container-main">
                <header className="mb-8 sm:mb-10">
                    <h1 className="section-title">Projects &amp; Open Source</h1>
                    <p className="section-subtitle mt-2">
                        Repositories I maintain publicly, clone, fork, or use as a reference.
                    </p>
                </header>
                <div className="mb-12">
                    <Contributions />
                </div>
            </div>
        </section>
    );
}
