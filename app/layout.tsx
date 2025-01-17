import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ConvexClerkProvider from "../providers/ConvexClerkProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GenAI Sports+",
  description: "Sports videos analyzed by twelve labs",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en">
        <body className={manrope.className}>
          {children}
          <Analytics />
          <SpeedInsights />
          <GoogleAnalytics gaId="G-NTDSQY4MHQ" />
        </body>
      </html>
    </ConvexClerkProvider>
  );
}
