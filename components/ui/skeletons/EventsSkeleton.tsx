export default function EventsSkeleton() {
  return (
    <div className="px-5 grid lg:grid-cols-3 gap-2 md:gap-4 lg:gap-8 md:grid-cols-2 grid-cols-1">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-paleYellow rounded-lg p-2 shadow-lg animate-pulse"
        >
          <div className="rounded-lg h-40 bg-darkCharcoal mb-4"></div>
          <div className="h-6 bg-darkCharcoal rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-darkCharcoal rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-darkCharcoal rounded w-full mb-2"></div>
          <div className="h-4 bg-darkCharcoal rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );
}
