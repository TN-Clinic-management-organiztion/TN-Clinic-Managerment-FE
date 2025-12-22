import type { Metadata } from "next";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "@/providers/ToastProvider";

export const metadata: Metadata = {
  title: "BCare Clinic",
  description: "BCare Clinic",
  icons: {
    icon: "/images/logo_bcare.svg",
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
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
