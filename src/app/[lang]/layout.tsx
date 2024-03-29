import type {Metadata} from "next";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ["latin"]});

type Params = { lang: string }

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

let locales = ['en-US', 'en-FR', 'fr-FR']

export async function generateStaticParams() {
  return locales.map((locale) => ({
    lang: locale,
  }))
}

export default function RootLayout({
                                     children,
                                     params
                                   }: Readonly<{
  children: React.ReactNode;
  params: Params;
}>) {
  return (
    <html lang={params.lang}>
    <body className={inter.className}>{children}</body>
    </html>
  );
}
