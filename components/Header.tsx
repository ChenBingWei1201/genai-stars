"use client";

import { Button } from "@/components/ui/button";
import { SignedOut, UserButton, useUser, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

function Header() {
  const { user } = useUser();

  return (
    <div className="relative z-10 border-b py-3 bg-white">
      <div className="items-center mx-auto justify-between flex">
        <Link
          href="/"
          className="flex gap-2 items-center text-xl text-black font-bold ml-2"
        >
          <Image
            src="/images/logo.png"
            width={60}
            height={60}
            alt="file drive logo"
          />
          <span className="bg-gradient-to-r from-[#fecf4f] via-[#ff6528] to-[#ff0016] text-transparent bg-clip-text text-24">
            GenAI Sports+
          </span>
        </Link>
        <div className="flex gap-2">
          <div className="flex-center w-full max-lg:px-4 lg:pr-8">
            <SignedIn>
              <Link href={`/profile/${user?.id}`} className="flex gap-3">
                <UserButton />
                <div className="flex w-full items-center justify-between">
                  <h1 className="text-16 truncate font-bold text-black">
                    {user?.firstName} {user?.lastName}
                  </h1>
                  <Image
                    src="/icons/right-arrow.svg"
                    alt="arrow"
                    width={32}
                    height={32}
                    className="cursor-pointer"
                  />
                </div>
              </Link>
            </SignedIn>
            <SignedOut>
              <Button
                asChild
                className="w-full bg-[#ff6528] font-extrabold text-white rounded-xl mr-0"
                variant="plain"
                size="lg"
              >
                <Link href="/sign-in">Sign in</Link>
              </Button>
            </SignedOut>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
