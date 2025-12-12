import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import SessionWrapper from "@/components/SessionWrapper";
const geistSans = localFont({
  src: [
    { path: "./fonts/Geist-Thin.woff2", weight: "100", style: "normal" },
    { path: "./fonts/Geist-ExtraLight.woff2", weight: "200", style: "normal" },
    { path: "./fonts/Geist-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Geist-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Geist-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Geist-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Geist-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Geist-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "./fonts/Geist-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata = {
  title: "LEB-EX Admin",
  description: "LEB-EX Super Admin Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      
      className={`${geistSans.variable} antialiased`}>
       <SessionWrapper>
          <Toaster position="top-right" richColors closeButton />
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
