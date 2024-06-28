import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <div className="relative flex flex-col">
    //   <main className="relative flex bg-black-3">
    //     <section className="flex min-h-screen flex-1 flex-col px-4 sm:px-14">
    //       <div className="mx-auto flex w-full max-w-5xl flex-col max:sm:px-4">
    //         <div className="flex flex-col md:pd-14">
    <div className="relative flex flex-col">
      <Header />
      <div className="flex flex-col md:pd-14">
        <Toaster />
      </div>
      {children}
      <Footer />
    </div>
    //         </div>
    //       </div>
    //     </section>
    //   </main>
    // </div>
  );
}
