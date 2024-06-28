"use client";

// import { useAction } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // const [isGeting, setIsGeting] = useState(false);
  // const getIndexes = useAction(api.twelve_labs.getIndexes);
  // const handleSubmit = async () => {
  //   setIsGeting(true);
  //   try {
  //     const response = await getIndexes();
  //     console.log(JSON.parse(response!)?.data);
  //     setIsGeting(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="bg-gray-50">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-8">
          <div className="text-center flex flex-col flex-center">
            <Image
              src="/images/logo.png"
              width={250}
              height={250}
              alt="logo"
              className="mb-4"
            />

            {/* <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              GenAI Sports+
            </h1> */}
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#fecf4f] via-[#ff6528] to-[#ff0016] text-transparent bg-clip-text">
              GenAI Sports+
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Sign up to start watching your favorite sports lives and
              highlights.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/dashboard/files"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
