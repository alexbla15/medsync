import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MedSuncFooter from "@/components/MedSyncFooter";
import { ThemeProvider } from "@/components/ThemeProvider";

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
        <ThemeProvider>
          <Navbar /> 

          <main className="main-content">
            {children}
          </main>

          <MedSuncFooter/>
        </ThemeProvider>
      </body>
    </html>
  );
}
