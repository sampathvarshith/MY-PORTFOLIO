import Link from "next/link";
import { VTMonogram } from "@/components/brand/VTMonogram";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80dvh] items-center justify-center overflow-hidden px-5 pt-28 text-center">
      <div aria-hidden className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-deep/25 blur-3xl" />
      <div className="relative">
        <VTMonogram className="mx-auto h-20 w-20 opacity-80 drop-shadow-[0_0_24px_rgba(168,85,247,0.6)]" />
        <p className="mt-8 font-display text-sm tracking-[0.4em] text-violet-soft">ERROR 404</p>
        <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">Scene not found</h1>
        <p className="mx-auto mt-4 max-w-md text-lavender">
          This page was cut from the final edit. Head back to the main reel or browse the work.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/work" variant="outline">
            Browse work
          </ButtonLink>
        </div>
        <p className="mt-6 text-sm text-lavender/70">
          Looking to collaborate?{" "}
          <Link href="/#contact" className="text-violet-soft underline underline-offset-4 hover:text-white">
            Request a quote
          </Link>
        </p>
      </div>
    </section>
  );
}
