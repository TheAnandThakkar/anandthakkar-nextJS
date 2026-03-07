import { Contributions } from "../components/contributions";

export const metadata = {
    title: 'Projects | Anand Thakkar',
    description: 'Portfolio of open-source contributions, software experiments, and technical projects by Anand Thakkar.',
};

export default function ProjectsPage() {
    return (
        <section className="pt-20 pb-12">
            <div className="container-main">
                <h1 className="section-title mb-8">Projects & Open Source</h1>
                <div className="mb-12">
                    <Contributions />
                </div>
            </div>
        </section>
    );
}
