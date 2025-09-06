// app/components/qr-contact.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function QrIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm6 6h2v2h-2v-2zm-8 2h8v8H3v-8zm2 2v4h4v-4H5zm8-12h8v8h-8V3zm2 2v4h4V5h-4zm1 10h3v2h-1v1h2v3h-2v-1h-2v-2h1v-1h-1v-2zm-3 5h2v2h-2v-2zm10-3h2v5h-5v-2h3v-3z" />
    </svg>
  );
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.9 4.89a1 1 0 1 0 1.41 1.42L12 13.41l4.89 4.9a1 1 0 0 0 1.42-1.41L13.41 12l4.9-4.89a1 1 0 0 0-.01-1.4z" />
    </svg>
  );
}

export default function QrContactButton() {
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const titleId = "qr-modal-title";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => clearTimeout(t);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="group inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-900"
      >
        <QrIcon className="h-4 w-4 opacity-90" />
        Scan QR
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <button
            aria-hidden="true"
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            tabIndex={-1}
          />

          {/* Modal */}
          <div className="relative z-10 w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-4 shadow-xl dark:border-neutral-800 dark:bg-black">
            <div className="flex items-center justify-between">
              <h3 id={titleId} className="text-base font-medium">
                Scan to save contact
              </h3>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setOpen(false)}
                className="rounded p-2 text-neutral-500 hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:text-neutral-400 dark:hover:text-white"
                aria-label="Close"
                title="Close"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3 flex justify-center">
              <Image
                src="/anand_vcard_url_qr_logo_bg.png"
                alt="QR code to save Anand Thakkar's contact"
                width={320}
                height={320}
                className="rounded-lg border border-neutral-200 dark:border-neutral-800"
                priority={false}
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <a
                href="/anand.vcf"
                className="text-sm font-medium text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
              >
                Download .vcf
              </a>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-800 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
