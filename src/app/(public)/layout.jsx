import "../globals.css";
import "./public.css"; // we will create this file
import PublicHeader from "./components/PublicHeader";
import FloatingShapes from "./components/FloatingShapes";

export const metadata = {
  title: "LEB-EX | Services Marketplace",
};

export default function PublicLayout({ children }) {
  return (
    <html lang="en">
      <body className="public-body">

        {/* Floating shapes background */}
        <FloatingShapes />

        {/* Public Header */}
        <PublicHeader />

        {/* Main Page Content */}
        <main className="public-container">
          {children}
        </main>

      </body>
    </html>
  );
}
