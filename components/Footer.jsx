import { Logo } from "./Navbar";
import { company } from "@/data/content";

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy-900 py-12 text-white">
      <div className="section-pad grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="[&_span]:!text-white [&_span>span]:!text-white/70">
            <Logo />
          </div>
          <p className="mt-4 max-w-sm text-sm text-white/70">{company.about}</p>
        </div>

        <div className="text-sm text-white/70">
          <h4 className="mb-3 text-sm font-bold text-white">Contact</h4>
          <p>{company.name}</p>
          <p className="mt-1">{company.address}</p>
          <p className="mt-3">
            Phone:{" "}
            <a href={`tel:${company.phoneHref}`} className="font-semibold text-brand-400">
              {company.phone}
            </a>
          </p>
          <p className="mt-1">
            Email:{" "}
            <a href={`mailto:${company.email}`} className="font-semibold text-brand-400">
              {company.email}
            </a>
          </p>
        </div>

        <div className="text-sm text-white/70">
          <h4 className="mb-3 text-sm font-bold text-white">Company</h4>
          <p>CEO: {company.ceo}</p>
          <p className="mt-1">GST No.: {company.gst}</p>
          <p className="mt-1">Established: {company.established}</p>
          <p className="mt-1">Team: {company.employees}</p>
          <p className="mt-1">Shipment: By road</p>
          <a href={company.website} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-semibold text-brand-400">
            aryadisplayrack.com
          </a>
        </div>
      </div>
      <p className="section-pad mt-10 text-xs text-white/50">
        © {new Date().getFullYear()} {company.name}. All rights reserved.
      </p>
    </footer>
  );
}
