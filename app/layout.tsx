import type { Metadata } from "next";

import "./globals.css";
import UmamiAnalytics from "@/components/analytics/umami-analytics";

import GoogleAnalytics from "@/components/analytics/google-analytics";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";
import { fontHeading, fontSans, fontSatoshi } from "@/assets/fonts";

export const metadata: Metadata = {
  title: "Plan ｜ 有计划的拍摄",
  description: "有计划的拍摄才能快速提升摄影技术",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {process.env.NODE_ENV !== "development" && <UmamiAnalytics />}
      </head>

      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable,
          fontSatoshi.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors closeButton />
        </ThemeProvider>

        {/* <Analytics /> */}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
