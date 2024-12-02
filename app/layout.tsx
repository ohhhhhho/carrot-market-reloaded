import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template:"%s | Karrot Market",
    default:"Karrot Market"
  },
  description: "sell and buy all the things",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-neutral-900 text-white max-w-screen-sm m-auto`}
      >
        {children}
      </body>
    </html>
  );
}
