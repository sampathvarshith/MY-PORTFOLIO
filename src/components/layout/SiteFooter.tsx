import Link from "next/link";
import { cacheLife } from "next/cache";
import { Mail, ArrowUpRight } from "lucide-react";
import { contact, navItems, site, mailto } from "@/content/site";
import { VTLogo } from "@/components/brand/VTMonogram";
import { InstagramIcon, WhatsAppIcon, YouTubeIcon } from "@/components/ui/BrandIcons";
import { QuoteLink } from "@/components/ui/QuoteLink";

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function SocialLinks({ className = "" }: { className?: string }) {
  const links = [
    { href: contact.instagram, label: "Instagram", icon: InstagramIcon },
    { href: contact.youtube, label: "YouTube", icon: YouTubeIcon },
    ...(contact.showWhatsApp ? [{ href: contact.whatsapp, label: "WhatsApp", icon: WhatsAppIcon }] : []),
  ];
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {links.map(({ href, label, icon: Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} (opens in a new tab)`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-chrome transition-colors hover:border-violet/60 hover:text-white"
          >
            <Icon className="h-[18px] w-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#07040f]">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px overflow-hidden bg-violet/10"
      >
        <div className="h-full w-1/3 animate-sheen bg-gradient-to-r from-transparent via-violet to-transparent" />
      </div>
      <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-violet-deep/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <VTLogo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-lavender">{site.positioning}</p>
          <p className="mt-2 font-display text-xs tracking-[0.2em] text-violet-soft">{site.altTagline.toUpperCase()}</p>
          <QuoteLink variant="primary" className="mt-7">
            Request a Quote <ArrowUpRight className="h-4 w-4" aria-hidden />
          </QuoteLink>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-display text-xs font-semibold tracking-[0.25em] text-white/60">EXPLORE</h2>
          <ul className="mt-5 grid gap-1">
            {[...navItems, { label: "All Projects", href: "/work" }, { label: "Services Breakdown", href: "/services" }].map(
              (item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-block py-1.5 text-sm text-chrome/80 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-xs font-semibold tracking-[0.25em] text-white/60">CONNECT</h2>
          <a
            href={mailto("Project enquiry")}
            className="mt-5 inline-flex items-center gap-2 break-all text-sm text-chrome/90 hover:text-white"
          >
            <Mail className="h-4 w-4 shrink-0 text-violet" aria-hidden />
            {contact.email}
          </a>
          <SocialLinks className="mt-5" />
        </div>
      </div>

      <div className="relative border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-5 py-6 text-xs text-lavender/70 sm:flex-row sm:items-center sm:px-8">
          <p>
            © <CurrentYear /> {site.name}. All rights reserved.
          </p>
          <p>Artwork shown remains the property of its respective owners.</p>
        </div>
      </div>
    </footer>
  );
}
