// File: src/app/layout.js
import "./globals.css";
import Header from "@/components/Header"; // Make sure this path is correct

export const metadata = {
  title: "Reacher Platform",
  description: "Business intelligence and contact management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow container mx-auto px-6 py-8">
            {children}
          </main>
          {/* We will add the footer back later */}
        </div>
      </body>
    </html>
  );
}