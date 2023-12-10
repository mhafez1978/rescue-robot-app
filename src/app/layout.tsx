import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import PrelineScript from "@/components/util/PrelineScript";
import AuthProvider from "@/components/util/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rescue Me Robot",
  description: "Your super hero rescue robot ...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>

        <PrelineScript />
      </body>
    </html>
  );
}
