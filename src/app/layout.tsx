import type { Metadata } from "next";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "BCoffee",
  description: "Coffee Shop Management",
  icons: {
    icon: "/images/logo_bcoffee.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="mdl-js">
      <body className="font-montserrat antialiased min-h-screen w-full">
        {children}
      </body>
    </html>
  );
}
