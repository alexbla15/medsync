import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MedSuncFooter from "@/components/MedSyncFooter";

export const metadata: Metadata = {
  title: "MedSync",
  description: "Your Personal Health Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="page-wrapper">
        <Navbar /> 

        <main className="main-content">
          {children}
        </main>

        <MedSuncFooter/>
      </body>
    </html>
  );
}
