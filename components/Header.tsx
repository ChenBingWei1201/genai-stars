import { Button } from "@/components/ui/button";
import {
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useSession,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <div className="relative z-10 border-b py-4 bg-white">
      <div className="items-center mx-auto justify-between flex">
        <Link
          href="/"
          className="flex gap-2 items-center text-xl text-black font-bold ml-2"
        >
          <Image src="/logo.png" width="50" height="50" alt="file drive logo" />
          <span className="bg-gradient-to-r from-[#fecf4f] via-[#ff6528] to-[#ff0016] text-transparent bg-clip-text">
            GenAI Sports+
          </span>
        </Link>
        <div className="flex gap-2">
          <UserButton />
          <SignedOut>
            <div className="flex-center w-full max-lg:px-4 lg:pr-8">
              <Button
                asChild
                className="w-full bg-[#ff6528] font-extrabold text-white rounded-xl mr-0"
                variant="plain"
                size="lg"
              >
                <Link href="/sign-in">Sign in</Link>
              </Button>
            </div>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
