import type { Metadata } from "next";
import { JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/Layout/MainLayout";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Utkarsh Singh | Portfolio OS",
  description: "Futuristic portfolio showcasing cutting-edge development skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-slate-950 text-slate-200">
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
