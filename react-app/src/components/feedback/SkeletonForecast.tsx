/** Skeleton-latausindikaattori ennustenäkymälle */
export const SkeletonForecast: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse" aria-label="Ladataan tietoja..." role="status">
      {/* Hero-kortti skeleton */}
      <div className="rounded-2xl border-2 border-sea-600/20 p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2.5 w-2.5 rounded-full skeleton-shimmer" />
          <div className="h-3 w-16 rounded skeleton-shimmer" />
        </div>
        <div className="flex items-baseline gap-4">
          <div>
            <div className="h-3 w-20 rounded skeleton-shimmer mb-2" />
            <div className="h-12 w-32 rounded-lg skeleton-shimmer" />
          </div>
          <div className="ml-auto">
            <div className="h-3 w-12 rounded skeleton-shimmer mb-2" />
            <div className="h-6 w-16 rounded skeleton-shimmer" />
          </div>
        </div>
      </div>

      {/* Sääkortit skeleton */}
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-sea-800/40 rounded-xl p-3">
            <div className="h-3 w-16 rounded skeleton-shimmer mx-auto mb-2" />
            <div className="h-8 w-12 rounded skeleton-shimmer mx-auto" />
          </div>
        ))}
      </div>

      {/* Accordion skeletons */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-2xl bg-sea-800/40 border border-sea-600/30 px-5 py-4">
          <div className="h-5 w-40 rounded skeleton-shimmer mb-2" />
          <div className="flex gap-6">
            <div className="h-6 w-24 rounded skeleton-shimmer" />
            <div className="h-6 w-24 rounded skeleton-shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
};
