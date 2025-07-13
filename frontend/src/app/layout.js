import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "Reacher Platform",
  description: "Business intelligence and contact management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-6 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}