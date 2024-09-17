// Import statements would typically go here if there were any dependencies or libraries being used.

// This default export function component provides a skeleton loader for event listings.
// It displays a grid of placeholder cards that simulate the layout of event items while the real content is loading.
export default function EventsSkeleton() {
  return (
    <div className="px-5 grid lg:grid-cols-3 gap-2 md:gap-4 lg:gap-8 md:grid-cols-2 grid-cols-1">
      {/* 
        Container div for the grid layout:
        - px-5: Adds horizontal padding to the container.
        - grid: Enables CSS Grid layout.
        - lg:grid-cols-3: Defines a 3-column grid layout for large screens and above.
        - md:grid-cols-2: Defines a 2-column grid layout for medium screens.
        - grid-cols-1: Defines a single-column grid layout for small screens.
        - gap-2: Sets a small gap between grid items for small screens.
        - md:gap-4: Increases the gap between grid items for medium screens.
        - lg:gap-8: Further increases the gap between grid items for large screens.
      */}

      {/* Creating 6 skeleton card placeholders */}
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-paleYellow rounded-lg p-2 shadow-lg animate-pulse"
        >
          {/* 
            Each skeleton card:
            - bg-paleYellow: Applies a pale yellow background color to the card.
            - rounded-lg: Adds large rounded corners.
            - p-2: Applies padding inside the card.
            - shadow-lg: Adds a large shadow to the card for a lifted appearance.
            - animate-pulse: Applies a pulsing animation effect to simulate loading.
          */}

          {/* Placeholder for an image or banner */}
          <div className="rounded-lg h-40 bg-darkCharcoal mb-4"></div>
          {/* 
            - rounded-lg: Rounded corners.
            - h-40: Fixed height (10rem) for the placeholder.
            - bg-darkCharcoal: Dark gray background to simulate image loading.
            - mb-4: Margin-bottom to separate from the next element.
          */}

          {/* Placeholder for the event title */}
          <div className="h-6 bg-darkCharcoal rounded w-3/4 mb-2"></div>
          {/* 
            - h-6: Fixed height (1.5rem) for the placeholder.
            - bg-darkCharcoal: Dark gray background.
            - rounded: Slightly rounded corners.
            - w-3/4: Width of 75% of the parent container.
            - mb-2: Margin-bottom to separate from the next element.
          */}

          {/* Placeholder for the event description */}
          <div className="h-4 bg-darkCharcoal rounded w-1/2 mb-2"></div>
          {/* 
            - h-4: Fixed height (1rem) for the placeholder.
            - bg-darkCharcoal: Dark gray background.
            - rounded: Slightly rounded corners.
            - w-1/2: Width of 50% of the parent container.
            - mb-2: Margin-bottom to separate from the next element.
          */}

          {/* Additional placeholders for more event details */}
          <div className="h-4 bg-darkCharcoal rounded w-full mb-2"></div>
          {/* 
            - h-4: Fixed height (1rem) for the placeholder.
            - bg-darkCharcoal: Dark gray background.
            - rounded: Slightly rounded corners.
            - w-full: Full width of the parent container.
            - mb-2: Margin-bottom to separate from the next element.
          */}

          <div className="h-4 bg-darkCharcoal rounded w-1/4"></div>
          {/* 
            - h-4: Fixed height (1rem) for the placeholder.
            - bg-darkCharcoal: Dark gray background.
            - rounded: Slightly rounded corners.
            - w-1/4: Width of 25% of the parent container.
          */}
        </div>
      ))}
    </div>
  );
}
