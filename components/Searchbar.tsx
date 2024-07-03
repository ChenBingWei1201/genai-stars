"use client";

import Image from "next/image";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDebounce } from "@/lib/useDebounce";
import { Search } from "lucide-react";

function Searchbar() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const debounceValue = useDebounce(search, 500);

  useEffect(() => {
    if (debounceValue) {
      router.push(`/index?search=${debounceValue}`);
    } else if (!debounceValue && pathname === "/index") {
      router.push("/index");
    }
  }, [router, pathname, debounceValue]);

  return (
    <div className="relative mt-5 block">
      <Input
        className="input-class py-6 pl-12 focus-visible:ring-offset-orange-500"
        placeholder="Search for podcasts"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onLoad={() => setSearch("")}
      />
      <Search size={20} className="absolute left-4 top-3.5" />
    </div>
  );
}

export default Searchbar;
