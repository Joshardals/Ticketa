// Import the Header component from the "shared" directory within the "components" folder.
// The @ symbol serves as a shortcut to reference the base directory of the project.
import { Header } from "@/components/shared/Header";

// This is the default export of the "AuthLayout" function component.
// "AuthLayout" serves as a layout wrapper specifically designed for authentication pages (e.g., login, signup),
// and it defines how the structure of those pages should look.
export default function AuthLayout({
  // Destructure the "children" property from the props (input arguments) passed to this component.
  // The "children" here refers to any React elements (content or components) that will be placed inside this layout.
  children,
}: Readonly<{
  // The "children" prop is typed as React.ReactNode, which means it can be any valid React element (text, HTML tags, or other components).
  children: React.ReactNode;
}>) {
  // Return the TSX (TypeScript + JSX) that defines the structure of the layout.
  // This TSX will be rendered as HTML in the browser when the component is used.
  return (
    <div>
      {/* Render the "Header" component at the top of the layout. It likely includes navigation or branding elements. */}
      <Header />
      {/* The <main> tag will wrap around the "children" prop, which is the dynamic content passed to this layout. */}
      <main>{children}</main>
    </div>
  );
}
