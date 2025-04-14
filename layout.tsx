import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "arabic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "arabic"],
});

export const metadata: Metadata = {
  title: "منفذ المشاريع بالذكاء الاصطناعي",
  description: "موقع لتوليد الكود باستخدام الذكاء الاصطناعي بناءً على وصف المستخدم",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-blue-600 text-white py-4">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">منفذ المشاريع بالذكاء الاصطناعي</h1>
          </div>
        </header>
        {children}
        <footer className="bg-gray-100 dark:bg-gray-800 py-6 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              &copy; {new Date().getFullYear()} منفذ المشاريع بالذكاء الاصطناعي - جميع الحقوق محفوظة
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
