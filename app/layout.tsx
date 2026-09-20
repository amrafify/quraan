import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ListSurahs from "./(components)/ListSurahs";
import NextTopLoader from "nextjs-toploader";
import localFont from 'next/font/local';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "القرأن الكريم و الهدى",
  description: "القرأن الكريم",
};
const surahNamesFont = localFont({
  src: '../public/fonts/surah-name.woff2', // المسار المباشر لملف الخط
  variable: '--font-surah-names',   // CSS Variable
  display: 'swap',
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className={`${surahNamesFont.variable} min-h-full flex flex-col`}>
        <NextTopLoader color="#f9f1b4" />
        {children}
      </body>
    </html>
  );
}
