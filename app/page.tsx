import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Anand Thakkar
      </h1>
      <p className="mb-4">
        {`Backend Developer & AWS Certified Cloud Practitioner with 4+ years in fintech/SaaS. Skilled in Java, Spring Boot, AWS, scalable APIs, and cloud
          optimisation. Strong cross-functional experience bridging engineering and product.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
