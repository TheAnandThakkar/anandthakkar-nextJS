"use client";

import { useState } from "react";
import { FaXTwitter, FaLinkedinIn, FaWhatsapp, FaLink } from "react-icons/fa6";

export default function SharePost({ title, slug }: { title: string; slug: string }) {
    const [copied, setCopied] = useState(false);
    const url = typeof window !== "undefined" ? window.location.href : `https://anandthakkar.dev/blog/${slug}`;

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
        whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy", err);
        }
    };

    return (
        <div className="mt-16 pt-8 border-t border-neutral-100 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="font-semibold text-neutral-900 dark:text-white">Share this article</p>

            <div className="flex items-center gap-3">
                <a
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-neutral-900 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white"
                    aria-label="Share on X (Twitter)"
                >
                    <FaXTwitter className="h-4 w-4" />
                </a>
                <a
                    href={shareLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-colors hover:bg-[#0A66C2] hover:text-white dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-[#0A66C2] dark:hover:text-white"
                    aria-label="Share on LinkedIn"
                >
                    <FaLinkedinIn className="h-4 w-4" />
                </a>
                <a
                    href={shareLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-colors hover:bg-[#25D366] hover:text-white dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-[#25D366] dark:hover:text-white"
                    aria-label="Share on WhatsApp"
                >
                    <FaWhatsapp className="h-4 w-4" />
                </a>
                <button
                    onClick={copyToClipboard}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-colors hover:bg-magenta hover:text-white dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-magenta dark:hover:text-white"
                    aria-label="Copy link"
                >
                    {copied ? (
                        <span className="text-xs font-bold">✓</span>
                    ) : (
                        <FaLink className="h-4 w-4" />
                    )}
                </button>
            </div>
        </div>
    );
}
