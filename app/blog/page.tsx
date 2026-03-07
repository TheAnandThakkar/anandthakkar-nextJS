import { BlogPosts } from "app/components/posts";

export const metadata = {
  title: 'Blog | Anand Thakkar',
  description: 'Technical writing and insights on Fintech, SaaS architecture, AWS cloud, and modern software development.',
};

export default function BlogPage() {
  return (
    <section className="pt-20 pb-12">
      <div className="container-main">
        <h1 className="section-title mb-8">Blog</h1>
        <div className="mb-12">
          <BlogPosts />
        </div>
      </div>
    </section>
  );
}
