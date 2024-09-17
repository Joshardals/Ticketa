import * as React from "react"; // Import React library for building UI components.
import { cn } from "@/lib/utils"; // Import utility function for conditionally combining class names.

const Table = React.forwardRef<
  // Define a Table component using forwardRef to forward the ref to the HTMLTableElement.
  HTMLTableElement, // Type of the ref (HTMLTableElement).
  React.HTMLAttributes<HTMLTableElement> // Type of the props (attributes for HTMLTableElement).
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    {/* Wrapper div to ensure the table is scrollable if it overflows */}
    <table
      ref={ref} // Forward the ref to the table element.
      className={cn("w-full caption-bottom text-sm", className)} // Combine default and custom class names.
      {...props} // Spread additional props to the table element.
    />
  </div>
));
Table.displayName = "Table"; // Set display name for debugging.

const TableHeader = React.forwardRef<
  // Define a TableHeader component using forwardRef to forward the ref to the HTMLTableSectionElement.
  HTMLTableSectionElement, // Type of the ref (HTMLTableSectionElement).
  React.HTMLAttributes<HTMLTableSectionElement> // Type of the props (attributes for HTMLTableSectionElement).
>(({ className, ...props }, ref) => (
  <thead
    ref={ref} // Forward the ref to the thead element.
    className={cn("[&_tr]:border-b", className)} // Apply styles for borders between rows.
    {...props} // Spread additional props to the thead element.
  />
));
TableHeader.displayName = "TableHeader"; // Set display name for debugging.

const TableBody = React.forwardRef<
  // Define a TableBody component using forwardRef to forward the ref to the HTMLTableSectionElement.
  HTMLTableSectionElement, // Type of the ref (HTMLTableSectionElement).
  React.HTMLAttributes<HTMLTableSectionElement> // Type of the props (attributes for HTMLTableSectionElement).
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref} // Forward the ref to the tbody element.
    className={cn("[&_tr:last-child]:border-0", className)} // Apply styles to remove the border from the last row.
    {...props} // Spread additional props to the tbody element.
  />
));
TableBody.displayName = "TableBody"; // Set display name for debugging.

const TableFooter = React.forwardRef<
  // Define a TableFooter component using forwardRef to forward the ref to the HTMLTableSectionElement.
  HTMLTableSectionElement, // Type of the ref (HTMLTableSectionElement).
  React.HTMLAttributes<HTMLTableSectionElement> // Type of the props (attributes for HTMLTableSectionElement).
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref} // Forward the ref to the tfoot element.
    className={cn(
      "border-t bg-slate-100/50 font-medium [&>tr]:last:border-b-0 dark:bg-slate-800/50",
      className // Combine default and custom class names.
    )}
    {...props} // Spread additional props to the tfoot element.
  />
));
TableFooter.displayName = "TableFooter"; // Set display name for debugging.

const TableRow = React.forwardRef<
  // Define a TableRow component using forwardRef to forward the ref to the HTMLTableRowElement.
  HTMLTableRowElement, // Type of the ref (HTMLTableRowElement).
  React.HTMLAttributes<HTMLTableRowElement> // Type of the props (attributes for HTMLTableRowElement).
>(({ className, ...props }, ref) => (
  <tr
    ref={ref} // Forward the ref to the tr element.
    className={cn(
      "border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800",
      className // Combine default and custom class names.
    )}
    {...props} // Spread additional props to the tr element.
  />
));
TableRow.displayName = "TableRow"; // Set display name for debugging.

const TableHead = React.forwardRef<
  // Define a TableHead component using forwardRef to forward the ref to the HTMLTableCellElement.
  HTMLTableCellElement, // Type of the ref (HTMLTableCellElement).
  React.ThHTMLAttributes<HTMLTableCellElement> // Type of the props (attributes for HTMLTableCellElement).
>(({ className, ...props }, ref) => (
  <th
    ref={ref} // Forward the ref to the th element.
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 dark:text-slate-400",
      className // Combine default and custom class names.
    )}
    {...props} // Spread additional props to the th element.
  />
));
TableHead.displayName = "TableHead"; // Set display name for debugging.

const TableCell = React.forwardRef<
  // Define a TableCell component using forwardRef to forward the ref to the HTMLTableCellElement.
  HTMLTableCellElement, // Type of the ref (HTMLTableCellElement).
  React.TdHTMLAttributes<HTMLTableCellElement> // Type of the props (attributes for HTMLTableCellElement).
>(({ className, ...props }, ref) => (
  <td
    ref={ref} // Forward the ref to the td element.
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)} // Apply padding and alignment styles.
    {...props} // Spread additional props to the td element.
  />
));
TableCell.displayName = "TableCell"; // Set display name for debugging.

const TableCaption = React.forwardRef<
  // Define a TableCaption component using forwardRef to forward the ref to the HTMLTableCaptionElement.
  HTMLTableCaptionElement, // Type of the ref (HTMLTableCaptionElement).
  React.HTMLAttributes<HTMLTableCaptionElement> // Type of the props (attributes for HTMLTableCaptionElement).
>(({ className, ...props }, ref) => (
  <caption
    ref={ref} // Forward the ref to the caption element.
    className={cn("mt-4 text-sm text-slate-500 dark:text-slate-400", className)} // Apply styling for caption.
    {...props} // Spread additional props to the caption element.
  />
));
TableCaption.displayName = "TableCaption"; // Set display name for debugging.

export {
  Table, // Export the Table component.
  TableHeader, // Export the TableHeader component.
  TableBody, // Export the TableBody component.
  TableFooter, // Export the TableFooter component.
  TableHead, // Export the TableHead component.
  TableRow, // Export the TableRow component.
  TableCell, // Export the TableCell component.
  TableCaption, // Export the TableCaption component.
};
