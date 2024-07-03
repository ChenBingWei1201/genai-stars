"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoaderSpiner from "@/components/LoaderSpinner";
import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import LazyLoad from "react-lazyload";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col">
      <Header />
      <LazyLoad placeholder={<LoaderSpiner />}>
        <NavBar />
      </LazyLoad>
      <div className="flex flex-col md:pd-14 ">
        <Toaster />
      </div>
      {children}
      <Footer />
    </div>
  );
}
