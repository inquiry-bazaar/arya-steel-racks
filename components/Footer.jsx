import { Logo } from "./Navbar";

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy-900 py-12 text-white">
      <div className="section-pad flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="[&_span]:!text-white [&_span>span]:!text-white/70">
          <Logo />
        </div>
        <p className="max-w-md text-sm text-white/70">
          Premium retail steel racks — gondola, storage, display and heavy duty. Ready to upgrade your space? Email{" "}
          <a href="mailto:info@steelmax.example" className="font-semibold text-brand-400">
            info@steelmax.example
          </a>
        </p>
        <p className="text-xs text-white/50">© {new Date().getFullYear()} SteelMax Racking Solutions</p>
      </div>
    </footer>
  );
}
