import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Instant Logistics — Fast. Smart. Futuristic.",
  description: "Experience next-generation logistics. Real-time package tracking, AI-powered routing, and seamless global delivery.",
  keywords: ["Instant Logistics", "logistics", "shipping", "delivery", "tracking", "AI-powered routing", "global delivery", "real-time tracking", "next-generation logistics"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
