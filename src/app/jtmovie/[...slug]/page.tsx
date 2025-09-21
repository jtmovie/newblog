import { allJtmovies } from "content-collections"
import type { Metadata } from "next"
import { absoluteUrl, formatDate } from "@/lib/utils"
import { notFound } from "next/navigation"
import { getTableOfContents } from "@/lib/toc"
import { DashboardTableOfContents } from "@/components/toc"
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import count from 'word-count'
import { components } from "@/components/mdx-components"
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import 'highlight.js/styles/github-dark.min.css'
import GiscusComments from "@/components/giscus-comments"
import { GoToTop } from "@/components/go-to-top"
import 'katex/dist/katex.min.css';
import { config } from "@/lib/config";

type JtmoviePageProps = {
  params: Promise<{slug: string[]}>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const options = {
  mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [
        rehypeKatex,
        rehypeHighlight,
        rehypeSlug
      ],
  }
}

async function getJtmovieFromParams(slugs: string[]) {
  const slug = slugs?.join("/") || ""
  const movie = allJtmovies.find((movie: any) => movie.slug === slug)

  if (!movie) {
    return null
  }

  return movie
}

export async function generateMetadata({ params }: JtmoviePageProps): Promise<Metadata> {
  const { slug } = await params
  const movie = await getJtmovieFromParams(slug)

  if (!movie) {
    return {}
  }

  return {
    title: movie.title,
    description: movie.summary || movie.title,
    keywords: movie.keywords,
    openGraph: {
      title: movie.title,
      description: movie.summary || movie.title,
      type: config.seo.openGraph.type,
      url: absoluteUrl("/jtmovie/" + movie.slug),
      images: [
        {
          url: config.site.image
        },
      ],
    },
    twitter: {
      card: config.seo.twitter.card,
      title: movie.title,
      description: movie.summary || movie.title,
      images: [
        {
          url: config.site.image
        },
      ],
      creator: config.seo.twitter.creator,
    },
  }
}

export async function generateStaticParams(): Promise<string[]> {
  // @ts-ignore
  return allJtmovies.map((movie: any) => ({
    slug: movie.slug.split('/'),
  }))
}

export default async function JtmoviePage(props: JtmoviePageProps) {
  const { slug } = await props.params;
  const movie = await getJtmovieFromParams(slug)

  if (!movie) {
    notFound()
  }

  const toc = await getTableOfContents(movie.content)

  return (
    <main className="relative py-6 max-w-full md:max-w-6xl mx-auto lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="max-w-4xl mx-auto w-full px-6">
        <div className="my-8">
          <h1 className="text-[32px] font-bold">{movie.title}</h1>
        </div>

        <div className="my-4">
          <p className="text-sm">
            {formatDate(movie.date)} · {count(movie.content)} 字
          </p>
        </div>

        <div className="">
          <MDXRemote source={movie.content} components={components} options={options} />
        </div>

        <GiscusComments />
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-6 h-[calc(100vh-3.5rem)]">
          <div className="h-full overflow-auto pb-10 flex flex-col justify-between mt-16 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <DashboardTableOfContents toc={toc} />
            <GoToTop />
          </div>
        </div>
      </div>
    </main>
  );
}