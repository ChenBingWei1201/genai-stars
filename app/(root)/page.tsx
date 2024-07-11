"use client";

import Carousel from "@/components/Carousel";
import { AD } from "@/constants/index";

export default function Home() {
  return (
    <div className="flex flex-row bg-gray-50 justify-between">
      <div className="w-full sm:w-full md:w-10/12 lg:w-10/12 xl:w-8/12 mx-auto mb-6 mt-4">
        <Carousel ads={AD} />
      </div>
    </div>
  );
}
