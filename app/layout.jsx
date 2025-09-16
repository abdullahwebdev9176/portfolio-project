import { Geist_Mono } from "next/font/google";
import { Poppins, Inter } from "next/font/google"; 
import "./globals.css";
import LayoutProviders from "@/providers/LayoutProviders";

// ✅ Headings font
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"], // mostly headings
});

// ✅ Body font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // readability
});

export const metadata = {
  title: "Muhammad Abdullah Portfolio",
  description:
    "Muhammad Abdullah's personal portfolio website showcasing projects and skills.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${inter.variable} antialiased`}
      >
        <LayoutProviders>{children}</LayoutProviders>
      </body>
    </html>
  );
}
