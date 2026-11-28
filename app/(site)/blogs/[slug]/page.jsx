import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CalendarDays, Clock } from "lucide-react"
import { getBlog, thumb } from "@/lib/blogs"

export const revalidate = 60

const plainText = (html = "") => html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()

export async function generateMetadata({ params }) {
  const { slug } = await params
  const blog = await getBlog(slug)
  if (!blog) return {}
  return {
    title: blog.metaTitle || `${blog.title} | Arya Display Rack`,
    description: blog.metaDescription || plainText(blog.content).slice(0, 160),
    openGraph: { images: [blog.image] },
  }
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params
  const blog = await getBlog(slug)
  if (!blog) notFound()

  const date = new Date(blog.date).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  })
  const minutes = Math.max(1, Math.round(plainText(blog.content).split(" ").length / 200))

  return (
    <>
      {/* Hero: padded below the fixed navbar, extra bottom padding so the article card can overlap it */}
      <section className="relative isolate flex min-h-[420px] items-end justify-center overflow-hidden bg-navy px-6 pb-32 pt-36 text-center text-white sm:min-h-[460px] sm:pt-40">
        <img
          src={thumb(blog.image, 1600)}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute inset-0 -z-[2] h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0 -z-[1] bg-[linear-gradient(180deg,rgba(10,26,63,0.7)_0%,rgba(10,26,63,0.88)_100%)]"
          aria-hidden="true"
        />
        {/* Light fade so the transparent fixed navbar stays readable over the dark photo */}
        <div
          className="absolute inset-x-0 top-0 -z-[1] h-44 bg-gradient-to-b from-white from-60% to-transparent"
          aria-hidden="true"
        />

        <div className="mx-auto w-full max-w-[860px]">
          <p className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-[#f9c32f]">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" aria-hidden="true" /> {date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" /> {minutes} min read
            </span>
          </p>
          <h1 className="mt-4 text-[length:clamp(1.9rem,5vw,3.4rem)] font-extrabold leading-[1.12] text-white">
            {blog.title}
          </h1>
        </div>
      </section>

      <article className="relative z-10 mx-auto -mt-20 mb-16 w-full max-w-[1180px] px-4">
        <div className="rounded-[28px] bg-white p-6 shadow-[0_18px_50px_rgba(15,40,90,0.14)] md:p-12">
          <div className="grid items-start gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12">
            <div className="md:sticky md:top-28 md:self-start">
              <img
                src={thumb(blog.image, 900)}
                alt={blog.title}
                className="w-full rounded-2xl object-cover shadow-[0_10px_30px_rgba(15,40,90,0.15)] md:max-h-[calc(100svh-8rem)]"
              />
            </div>

            <div className="blog-content min-w-0" dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
            <Link href="/blogs" className="inline-flex items-center gap-2 font-semibold text-navy hover:text-brand-600">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to all blogs
            </Link>
            <Link href="/contact" className="btn-orange">
              Get a quote
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
