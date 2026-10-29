"use client";

import "./globals.css";
import { AuthProvider } from "@/store/context/AuthProvider";
import Navbar from "@/components/nav/Navbar";
import { AccountProvider } from "@/store/context/AccountProvider";
import { Toaster } from "sonner";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AccountProvider>
            {/* Main container for page content */}
            <main>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Toaster richColors position="bottom-left" />
                <Navbar />
                {children}
              </div>
            </main>
          </AccountProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
