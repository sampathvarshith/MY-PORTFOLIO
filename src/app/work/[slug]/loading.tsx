export default function CaseStudyLoading() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40" aria-busy="true" aria-label="Loading project">
      <div className="h-4 w-40 animate-pulse rounded-full bg-white/5" />
      <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <div className="space-y-5">
          <div className="h-6 w-48 animate-pulse rounded-full bg-violet/15" />
          <div className="h-14 w-3/4 animate-pulse rounded-2xl bg-white/5" />
          <div className="h-5 w-full animate-pulse rounded-full bg-white/5" />
          <div className="h-5 w-2/3 animate-pulse rounded-full bg-white/5" />
        </div>
        <div className="mx-auto aspect-[4/5] w-full max-w-md animate-pulse rounded-3xl bg-gradient-to-br from-violet/15 to-white/5 lg:max-w-none" />
      </div>
    </div>
  );
}
