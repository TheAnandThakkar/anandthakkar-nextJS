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
                <h1 className="section-title mb-8">About Me</h1>
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
