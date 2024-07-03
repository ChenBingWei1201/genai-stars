"use client";

import { useRouter } from "next/navigation";

type IndexFolderProps = {
  indexId: string;
  title: string;
  imgUrl: string;
};

function IndexFolder({ indexId, title, imgUrl }: IndexFolderProps) {
  const router = useRouter();

  const handleViews = () => {
    router.push(`/index/${indexId}`, {
      scroll: true,
    });
  };

  return (
    <div
      className="w-3/12 sm:w-9/12 lg:w-6/12 xl:w-3/12 mx-10 my-5 cursor-pointer border-gray-200 border-1 bg-white rounded-xl shadow flex flex-col transition-transform duration-300 ease-in-out transform hover:scale-105"
      onClick={handleViews}
    >
      <figure className="flex flex-col gap-2">
        <img
          src={imgUrl}
          alt={title}
          width={50}
          height={50}
          className="h-fit w-full 2xl:size-[200px] rounded-t-xl border-b-2"
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

export default IndexFolder;
