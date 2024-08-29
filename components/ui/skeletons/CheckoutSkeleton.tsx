export function CheckoutSkeleton() {
  return (
    <div className="p-5 space-y-4">
      <div className="bg-darkCharcoal rounded-lg h-32 animate-pulse"></div>
      <div className="mt-4 flex items-center max-sm:flex-col gap-2">
        <div className="bg-darkCharcoal rounded-lg h-12 w-full max-w-md animate-pulse"></div>
        <div className="bg-darkCharcoal rounded-lg h-12 w-full max-w-md animate-pulse"></div>
      </div>
    </div>
  );
}
