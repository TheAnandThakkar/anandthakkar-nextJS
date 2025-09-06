// app/components/social-preview.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { FaLinkedin, FaWhatsapp, FaLink, FaXTwitter } from "react-icons/fa6";
import { IoShareOutline } from "react-icons/io5";

type Props = {
  url: string;
  title: string;
  description?: string;
  image?: string;
  hashtags?: string[];
  via?: string;
};

function toAbsolute(u: string) {
  if (!u) return "";
  if (/^https?:\/\//i.test(u)) return u;
  if (typeof window !== "undefined")
    return new URL(u, window.location.origin).toString();
  return u;
}

export default function SocialPreviewCard({
  url,
  title,
  description,
  image = "/preview-image.png",
  hashtags = [],
  via,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && "share" in navigator);
  }, []);

  const absoluteUrl = useMemo(() => toAbsolute(url), [url]);

  // X/Twitter intent (x.com for better reliability on some networks)
  const xHref = useMemo(() => {
    const params = new URLSearchParams();
    if (title) params.set("text", title);
    if (absoluteUrl) params.set("url", absoluteUrl);
    if (via) params.set("via", via.replace(/^@/, ""));
    if (hashtags.length) params.set("hashtags", hashtags.join(","));
    return `https://x.com/intent/post?${params.toString()}`;
  }, [title, absoluteUrl, hashtags, via]);

  const linkedinHref = useMemo(
    () =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        absoluteUrl
      )}`,
    [absoluteUrl]
  );

  const whatsappHref = useMemo(() => {
    const text = `${title} — ${absoluteUrl}`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  }, [title, absoluteUrl]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(absoluteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  const nativeShare = async () => {
    try {
      await navigator.share({
        title,
        text: description ?? title,
        url: absoluteUrl,
      });
    } catch {}
  };

  return (
    <section aria-label="Share this site">
      <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
        {/* Header image */}
        <div className="relative h-56 sm:h-64 md:h-72 w-full">
          <Image
            src={image}
            alt="Social preview image"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority={false}
          />

          {/* Bottom gradient for legibility */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-28 bg-gradient-to-t from-black/70 via-black/40 to-transparent"
            aria-hidden
          />

          {/* Compact title + description inside the image */}
          <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
            <h3 className="text-white text-base sm:text-lg font-medium leading-snug drop-shadow">
              {title}
            </h3>
            {description && (
              <p className="mt-0.5 text-neutral-100/90 text-[11px] sm:text-xs leading-relaxed line-clamp-2">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Share row */}
        <div className="p-4 flex flex-wrap items-center gap-2">
          <button
            onClick={copyLink}
            className="group inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-3 py-1.5 text-sm font-medium text-neutral-800 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-900"
            aria-label="Copy link"
            type="button"
          >
            <FaLink className="opacity-90" />
            {copied ? "Copied!" : "Copy link"}
          </button>

          <a
            href={xHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on X"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-3 py-1.5 text-sm font-medium text-neutral-800 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-900"
          >
            <FaXTwitter className="opacity-90" />
            Share on X
          </a>

          <a
            href={linkedinHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-3 py-1.5 text-sm font-medium text-neutral-800 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-900"
          >
            <FaLinkedin className="opacity-90" />
            {/* Updated label text */}
            Share on LinkedIn
          </a>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on WhatsApp"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-3 py-1.5 text-sm font-medium text-neutral-800 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-900"
          >
            <FaWhatsapp className="opacity-90" />
            WhatsApp
          </a>

          {canShare && (
            <button
              onClick={nativeShare}
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-3 py-1.5 text-sm font-medium text-neutral-800 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-900"
              aria-label="Share"
              type="button"
            >
              {/* iOS-style share icon */}
              <IoShareOutline className="text-[18px]" />
              Share
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
