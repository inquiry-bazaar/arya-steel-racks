import { contact } from "@/data/content";
import { Clock } from "lucide-react";

const Phone = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
  </svg>
);

const Mail = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

// min-h-8 gives phones a comfortable tap area; hover fade only where hover exists
const linkCls =
  "inline-flex min-h-8 min-w-0 items-center gap-1.5 transition-opacity duration-[180ms] ease-out sm:gap-2 [@media(hover:hover)]:hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current rounded-sm";
const textCls = "overflow-hidden text-ellipsis whitespace-nowrap";

export default function TopBar() {
  return (
    <div className="relative z-[31] rounded-b-[14px] bg-[#cdcdcd] text-[0.74rem] font-semibold text-ink sm:rounded-none sm:text-[0.78rem] lg:text-[0.82rem]">
      <div className="flex min-h-9 items-center justify-between gap-4 px-4 py-0.5 sm:px-6 sm:py-1.5 lg:px-11">
        {/* Contact items
            Phones:  phone + email only (keeps the bar to one tidy line)
            sm+:     opening hours join in
            lg+:     GSTIN on the right */}
        <div className="flex min-w-0 flex-1 items-center justify-between gap-3 sm:flex-none sm:justify-start sm:gap-6 lg:gap-[26px]">
          <a href={`tel:${contact.phoneHref}`} className={`${linkCls} shrink-0`}>
            <Phone />
            <span className={textCls}>{contact.phone}</span>
          </a>

          <a href={`mailto:${contact.email}`} className={linkCls}>
            <Mail />
            <span className={textCls}>{contact.email}</span>
          </a>

          {/* Not a link, so it's a span */}
          <span className="hidden min-w-0 items-center gap-2 sm:inline-flex">
            <Clock size={14} className="shrink-0" aria-hidden="true" />
            <span className={textCls}>Mon–Sat, 9:30 am – 7 pm</span>
          </span>
        </div>

        <span className="hidden whitespace-nowrap lg:inline">
          GSTIN: {contact.gst}
        </span>
      </div>
    </div>
  );
}