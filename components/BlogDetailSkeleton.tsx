import React from "react";

export const BlogDetailSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full h-52 sm:h-64 md:h-80 lg:h-96 rounded-xs sm:rounded-sm overflow-hidden bg-neutral-900 border border-neutral-800 shadow-card flex flex-col items-center justify-center text-center px-4">
          <div className="h-10 sm:h-14 w-64 sm:w-96 bg-white/25 rounded-md" />
        </div>
      </section>

      <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="h-3.5 w-24 bg-[#BA9F86]/30 rounded" />

            <div className="space-y-2">
              <div className="h-9 sm:h-12 w-full bg-neutral-200 rounded-md" />
              <div className="h-9 sm:h-12 w-3/5 bg-neutral-200 rounded-md" />
            </div>

            <div className="h-5 w-4/5 bg-neutral-100 rounded" />

            <div className="flex items-center justify-between py-3.5 border-y border-neutral-200/80">
              <div className="flex items-center gap-6">
                <div className="h-4 w-24 bg-neutral-200 rounded" />
                <div className="h-4 w-20 bg-neutral-200 rounded" />
              </div>
              <div className="h-4 w-16 bg-neutral-200 rounded" />
            </div>

            <div className="aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl bg-neutral-200/80 shadow-card border border-neutral-200/60" />

            <div className="space-y-3 pt-2">
              <div className="h-4 w-full bg-neutral-200/70 rounded" />
              <div className="h-4 w-11/12 bg-neutral-200/70 rounded" />
              <div className="h-4 w-4/5 bg-neutral-200/70 rounded" />
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-[#FAF5EE] border border-[#E9E0D4] space-y-4">
              <div className="h-6 w-32 bg-[#BA9F86]/30 rounded" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="h-4 w-3/4 bg-neutral-200 rounded" />
                <div className="h-4 w-4/5 bg-neutral-200 rounded" />
                <div className="h-4 w-2/3 bg-neutral-200 rounded" />
                <div className="h-4 w-3/4 bg-neutral-200 rounded" />
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <div className="p-6 sm:p-7 rounded-2xl bg-[#FAF5EE] border border-[#EAE2D6] space-y-5">
              <div className="h-5 w-36 bg-[#BA9F86]/30 rounded" />
              <div className="space-y-4 pt-1">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3.5">
                    <div className="w-16 h-16 rounded-xl bg-neutral-200/80 flex-shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="h-3.5 w-full bg-neutral-200 rounded" />
                      <div className="h-3 w-2/3 bg-neutral-200/70 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
