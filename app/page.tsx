import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter flex items-end space-x-4">
  <div className="bg-white rounded-xl h-32 w-32 flex items-center justify-center m-1">
  <img
    src="/logo.png"
    alt="Anand Thakkar Logo"
    className="h-28 w-28 object-contain"
  />
</div>

  <div className="flex flex-col leading-tight">
    <span className="text-5xl font-bold">Anand</span>
    <span className="text-5xl font-bold">Thakkar</span>
  </div>
</h1>


      <p className="mb-4">
        {`Backend Developer & AWS Certified Cloud Practitioner with 4+ years in fintech/SaaS. Skilled in Java, Spring Boot, AWS, scalable APIs, and cloud optimisation. Strong cross-functional experience bridging engineering and product.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
