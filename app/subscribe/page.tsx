import { SubscribePage } from "app/components/subscribe-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Follow the Journey | Anand Thakkar",
  description:
    "I write about finance, technology, and what happens when the two collide. Subscribe to hear from me when I have something worth saying.",
  alternates: {
    canonical: "/subscribe",
  },
  openGraph: {
    title: "Follow the Journey | Anand Thakkar",
    description:
      "I write about finance, technology, and what happens when the two collide. Subscribe to hear from me when I have something worth saying.",
  },
};

export default function Page() {
  return <SubscribePage />;
}
