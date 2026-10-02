import { UI } from "@/lib/constants/ui";
import { AuthProvider } from "@/components/session-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";

export const metadata: Metadata = {
  title: UI.name,
  description: UI.description,
};

const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={figtree.variable} suppressHydrationWarning>
      <body style={{ margin: 0, padding: 0 }} className="font-sans" suppressHydrationWarning>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
