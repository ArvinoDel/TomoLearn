import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico, Inter } from "next/font/google";
import "./globals.css";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import "remixicon/fonts/remixicon.css";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pacifico",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TomoLearn – Unlock Your Potential",
  description: "TomoLearn is a language learning platform to help you learn, grow, and unlock your potential.",
  keywords: [
    "TomoLearn",
    "Language Learning",
    "Duolingo Alternative",
    "Learn English",
    "Learn Japanese",
    "Online Courses",
    "Interactive Learning"
  ],
  authors: [
    { name: "TomoLearn Team", url: "https://tomolearn.vercel.app" },
    { name: "Andika Supriyadi Nur Maulana" }
  ],
  creator: "TomoLearn",
  publisher: "TomoLearn",
  metadataBase: new URL("https://tomolearn.vercel.app"),
  openGraph: {
    title: "TomoLearn – Learn Languages with AI",
    description: "Learn, grow, and unlock your potential with TomoLearn's interactive language courses.",
    url: "https://tomolearn.vercel.app",
    siteName: "TomoLearn",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://ik.imagekit.io/tdqizhhci/logo%20(1).png?updatedAt=1753851195116", // Pastikan file ini tersedia
        width: 1200,
        height: 630,
        alt: "TomoLearn Preview Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TomoLearn – Learn Languages with AI",
    description: "Your AI-powered path to mastering languages.",
    creator: "@tomolearn", // Ganti jika kamu punya handle
    images: ["https://ik.imagekit.io/tdqizhhci/logo%20(1).png?updatedAt=1753851195116"],
  },
  // themeColor: "#06b6d4", // Tailwind cyan-500
  icons: {
    icon: "https://ik.imagekit.io/tdqizhhci/mascott.png?updatedAt=1753851463294",
    shortcut: "https://ik.imagekit.io/tdqizhhci/mascott.png?updatedAt=1753851463294",
    apple: "https://ik.imagekit.io/tdqizhhci/mascott.png?updatedAt=1753851463294",
  },
  // manifest: "/site.webmanifest", // Untuk PWA jika ada
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta property="og:image" content="https://ik.imagekit.io/tdqizhhci/logo%20(1).png?updatedAt=1753851195116" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:image" content="https://ik.imagekit.io/tdqizhhci/logo%20(1).png?updatedAt=1753851195116" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} ${inter.variable} antialiased font-inter bg-white`}
      >
        <HeroSection />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
