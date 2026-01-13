import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Product Management - CRUD App",
  description: "Simple CRUD application for product management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}