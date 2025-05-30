import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@components/ThemeProvider';
import type { Metadata } from 'next';
import Header from '@components/Header';
import { StateProvider } from '@contexts/state/StateProvider';
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `Blue ocean strategy tool by ${process.env.NEXT_PUBLIC_BRAND_NAME}`,
  description:
    'Web application for visualizing and analyzing business strategies using the Blue Ocean Strategy framework',
  keywords: 'blue ocean, strategy, business, visualization, analysis',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StateProvider>
            <div className="min-h-screen bg-background transition-colors">
              <Header />
              <main className="container max-w-screen-xl mx-auto px-4 py-6">
                <div className="flex justify-center">
                  <div className="w-full">{children}</div>
                </div>
              </main>
            </div>
          </StateProvider>
        </ThemeProvider>
      </body>
      <Analytics/>
    </html>
  );
}
