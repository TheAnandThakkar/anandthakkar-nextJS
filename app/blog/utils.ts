import fs from 'fs'
import path from 'path'
import { cache } from 'react'

export type Metadata = {
  title: string
  publishedAt: string
  summary: string
  description?: string
  image?: string
}

export type BlogPost = {
  metadata: Metadata
  slug: string
  content: string
}

const POSTS_DIR = path.join(process.cwd(), 'app', 'blog', 'posts')

// Anchored to the start of the file so a `---` horizontal rule in the body
// can never be mistaken for frontmatter. Tolerates CRLF line endings.
const FRONTMATTER_RE = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/

function parseFrontmatter(fileContent: string) {
  const match = FRONTMATTER_RE.exec(fileContent)
  if (!match) {
    throw new Error('Missing or invalid frontmatter in MDX file')
  }
  const content = fileContent.slice(match[0].length).trim()
  const metadata: Partial<Metadata> = {}

  for (const line of match[1].split(/\r?\n/)) {
    const sep = line.indexOf(': ')
    if (sep === -1) continue
    const key = line.slice(0, sep).trim() as keyof Metadata
    const value = line
      .slice(sep + 2)
      .trim()
      .replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    metadata[key] = value
  }

  return { metadata: metadata as Metadata, content }
}

function timestamp(post: BlogPost) {
  return post.metadata.publishedAt
    ? new Date(post.metadata.publishedAt).getTime()
    : 0
}

/** Newest-first comparator, shared by every place that orders posts. */
export function byNewest(a: BlogPost, b: BlogPost) {
  return timestamp(b) - timestamp(a)
}

function loadPosts(): BlogPost[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => path.extname(file) === '.mdx')
    .map((file) => {
      const { metadata, content } = parseFrontmatter(
        fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8')
      )
      return { metadata, slug: path.basename(file, '.mdx'), content }
    })
    .sort(byNewest)
}

/**
 * All posts, newest first. Memoised per request/render pass with React `cache`,
 * so `generateMetadata`, the page, the sitemap and the RSS feed don't each
 * re-read and re-parse every MDX file.
 */
export const getBlogPosts = cache(loadPosts)

export const getBlogPost = cache((slug: string) =>
  getBlogPosts().find((p) => p.slug === slug)
)

export { formatDate } from './format-date'
