import Link from "next/link"
import { ArrowRight, CalendarDays } from "lucide-react"
import { getBlogs, thumb } from "@/lib/blogs"

const fmt = (d) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })

export default async function BlogPage() {
  let blogs = []
  let failed = false
  try {
    blogs = await getBlogs()
  } catch (e) {
    failed = true
    console.error("Failed to load blogs:", e.message) // e.g. DB unreachable; ISR retries in 60s
  }

  return (
    <section className="bg-gradient-to-b from-white to-[#f4f7fc] py-16 max-[720px]:py-10">
      <div className="section-pad">
        {blogs.length === 0 && (
          <div className="mx-auto max-w-md rounded-3xl bg-white px-8 py-14 text-center shadow-glass">
            <p className="text-lg font-bold text-navy">{failed ? "Blogs are unavailable right now" : "No blogs yet"}</p>
            <p className="mt-2 text-sm text-slate-500">
              {failed ? "Please refresh in a minute." : "Please check back soon."}
            </p>
          </div>
        )}

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((b) => (
            <Link
              key={b._id}
              href={`/blogs/${b.permalink}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_10px_30px_rgba(15,40,90,0.08)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_44px_rgba(15,40,90,0.16)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={thumb(b.image, 700)}
                  alt={b.title}
                  width={700}
                  height={437}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[0.72rem] font-bold text-navy shadow-sm backdrop-blur">
                  <CalendarDays className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                  {fmt(b.date)}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="line-clamp-2 text-[1.15rem] font-extrabold leading-[1.3] text-navy transition-colors group-hover:text-brand-600">
                  {b.title}
                </h3>
                {b.metaDescription && (
                  <p className="mt-2.5 line-clamp-3 text-[0.92rem] leading-[1.6] text-slate-500">{b.metaDescription}</p>
                )}
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-navy">
                  Read more
                  <ArrowRight className="h-4 w-4 text-brand transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
