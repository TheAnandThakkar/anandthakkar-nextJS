import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React from 'react'

type GalleryImage = {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

type ImageGridProps = {
  images?: GalleryImage[]
  src?: string
  alt?: string
  caption?: string
  width?: number
  height?: number
}

type ProblemStatementProps = {
  href: string
}

function Table({ data }) {
  const headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function CustomLink(props) {
  const href = props.href

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />
}

function ImageGrid({ images, src, alt = "", caption, width, height }: ImageGridProps) {
  const galleryImages =
    images?.length ? images : src ? [{ src, alt, caption, width, height }] : []

  if (!galleryImages.length) return null

  return (
    <div className="not-prose my-8 grid gap-4 sm:grid-cols-2">
      {galleryImages.map((image, index) => {
        const shouldSpan =
          galleryImages.length === 1 || (galleryImages.length === 3 && index === 0)

        return (
          <figure
            key={image.src}
            className={shouldSpan ? "sm:col-span-2" : undefined}
          >
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width ?? 1200}
                height={image.height ?? 675}
                sizes={shouldSpan ? "(min-width: 768px) 768px, 100vw" : "(min-width: 768px) 384px, 100vw"}
                className="aspect-video h-full w-full object-cover"
              />
            </div>
            {image.caption && (
              <figcaption className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {image.caption}
              </figcaption>
            )}
          </figure>
        )
      })}
    </div>
  )
}

function ProblemStatement({ href }: ProblemStatementProps) {
  const steps = [
    ['Apply', 'Customer, employment, and identity details.'],
    ['Score', 'Existing score or salary/card-count calculation.'],
    ['Approve', 'Allocate a card type or request documents.'],
    ['First login', 'Validate card details and update the PIN.'],
  ]

  return (
    <section className="not-prose my-8 flex flex-col gap-5 border-y border-neutral-200 py-6 dark:border-neutral-800">
      <div className="flex flex-col gap-2">
        <p className="!m-0 text-xs font-semibold uppercase tracking-[0.14em] text-magenta">
          Sanitized problem statement
        </p>
        <h3 className="!m-0 text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Credit card application system
        </h3>
        <p className="!m-0 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          Build a Java full stack credit-card flow: application, score check,
          card allocation, and first-time PIN update.
        </p>
      </div>

      <ol className="!m-0 flex list-none flex-col gap-3 !p-0">
        {steps.map(([title, copy], index) => (
          <li key={title} className="!m-0 flex gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-magenta text-xs font-bold text-white">
              {index + 1}
            </span>
            <div>
              <p className="!m-0 text-sm font-semibold text-neutral-900 dark:text-white">
                {title}
              </p>
              <p className="!m-0 pt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {copy}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <p className="!m-0 text-sm text-neutral-600 dark:text-neutral-400">
        Full sanitized brief:{' '}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-magenta no-underline hover:text-magenta/80"
        >
          open PDF
        </a>
      </p>
    </section>
  )
}

function Code({ children, ...props }) {
  const codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

function createHeading(level) {
  const Heading = ({ children }) => {
    const slug = slugify(children)
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  ImageGrid,
  ProblemStatement,
  a: CustomLink,
  code: Code,
  Table,
}

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
