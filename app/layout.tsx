import { UI } from "@/lib/constants/ui";
import { AuthProvider } from "@/components/session-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat, Inter, Fira_Code } from "next/font/google";

export const metadata: Metadata = {
  title: UI.name,
  description: UI.description,
};

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code", display: "swap" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} ${firaCode.variable}`}
      suppressHydrationWarning
    >
      <body style={{ margin: 0, padding: 0 }} className="font-sans" suppressHydrationWarning>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
