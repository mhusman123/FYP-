import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/components/auth-provider";
import { DemoBanner } from "@/components/demo-banner";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduPlatform AI — Enterprise-Grade AI Learning & Exam Platform",
  description: "An all-in-one licensable AI learning platform with Socratic tutoring, automated grading, adaptive exam generation, and plagiarism detection for schools and universities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#00141f] scroll-smooth">
      <body
        className={`${poppins.variable} ${geistMono.variable} font-sans antialiased bg-[#00141f]`}
      >
        <AuthProvider>
          <DemoBanner />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
