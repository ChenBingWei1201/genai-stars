"use client";

import { useRouter } from "next/navigation";
import { ClassFolderProps } from "@/types";
import { useCallback } from "react";

function ClassFolder({ classId, title, imgUrl }: ClassFolderProps) {
  const router = useRouter();

  const handleView = useCallback(() => {
    router.push(`/class/${classId}`, {
      scroll: true,
    });
  }, [router, classId]);

  return (
    <div
      className="w-full sm:ml-20 md:ml-20 xl:mx-auto sm:w-9/12 md:w-9/12 lg:w-5/12 xl:w-3/12 my-5 cursor-pointer border-gray-200 border-1 bg-white rounded-xl shadow flex flex-col transition-transform duration-300 ease-in-out transform hover:scale-105"
      onClick={handleView}
    >
      <figure className="flex flex-col gap-2">
        <img
          src={imgUrl}
          alt={title}
          width="100%"
          height="100%"
          className="h-fit w-full rounded-t-xl border-b-2"
          loading="lazy"
        />
        <div>
          <h1 className="text-3xl truncate font-bold text-black mb-10 mx-2">
            {title}
          </h1>
        </div>
      </figure>
    </div>
  );
}

export default ClassFolder;
