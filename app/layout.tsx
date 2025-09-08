import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trap Net Game",
  description: "Drosera Trap Simulation Challenge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col items-center justify-center min-h-screen">
        {children}
      </body>
    </html>
  );
}
