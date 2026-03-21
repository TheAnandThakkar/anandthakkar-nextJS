import { Experience } from "../components/experience";
import { Awards } from "../components/awards";

export const metadata = {
    title: 'About | Anand Thakkar',
    description: 'Work experience, awards, and professional milestones of Anand Thakkar, a Software Developer specializing in Fintech and AWS Cloud.',
};

export default function AboutPage() {
    return (
        <section className="pt-20 pb-12">
            <div className="container-main">
                <header className="mb-8 sm:mb-10">
                    <h1 className="section-title">About Me</h1>
                    <p className="section-subtitle mt-2">
                        Work history, recognition, and the through-line in how I build software.
                    </p>
                </header>
                <div className="mb-12">
                    <Experience />
                </div>
                <div className="mb-12">
                    <Awards />
                </div>
            </div>
        </section>
    );
}
