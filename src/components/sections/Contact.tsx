import { Mail } from "lucide-react";
import { contact, mailto } from "@/content/site";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { InstagramIcon, WhatsAppIcon, YouTubeIcon } from "@/components/ui/BrandIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Contact() {
  const channels = [
    { href: mailto("Project enquiry"), label: "Email", value: contact.email, icon: Mail, external: false },
    { href: contact.instagram, label: "Instagram", value: contact.instagramHandle, icon: InstagramIcon, external: true },
    { href: contact.youtube, label: "YouTube", value: contact.youtubeHandle, icon: YouTubeIcon, external: true },
    ...(contact.showWhatsApp
      ? [{ href: contact.whatsapp, label: "WhatsApp", value: contact.whatsappDisplay, icon: WhatsAppIcon, external: true }]
      : []),
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-pad relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 -z-10 h-[34rem] w-[34rem] rounded-full bg-violet-deep/20 blur-[140px]" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading
            id="contact-title"
            eyebrow="Start a project"
            title={
              <>
                Let’s create something <span className="violet-text">cinematic</span>
              </>
            }
            description="Tell me about your film, brand, or channel. Share the brief and I’ll get back to you with next steps and a quote."
          />
          <ul className="mt-10 grid gap-3">
            {channels.map(({ href, label, value, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="panel group flex min-h-16 items-center gap-4 rounded-2xl px-5 py-3 transition-colors hover:border-violet/50"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet/15 text-violet-soft group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-[0.2em] text-lavender/70">{label}</span>
                    <span className="block truncate text-[15px] font-medium text-white">{value}</span>
                  </span>
                  {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <EnquiryForm />
      </div>
    </section>
  );
}
