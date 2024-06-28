import React from "react";
import Image from "next/image";
import { Reply, Plus, Minus } from "lucide-react";

type DisplayCommentProps = {
  username: string;
  content: string;
};

function DisplayComment({ username, content }: DisplayCommentProps) {
  return (
    <div className="flex gap-5 px-6 py-7 bg-white rounded-lg max-md:flex-wrap max-md:px-5">
      <div className="flex flex-col self-start px-3 py-3.5 text-center text-indigo-700 whitespace-nowrap rounded-xl bg-slate-100 font-bold">
        <button>
          <Plus size={20} />
        </button>
        <div className="my-3">12</div>
        <button>
          <Minus size={20} />
        </button>
      </div>
      <div className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
        <div className="flex gap-5 justify-between px-px w-full max-md:flex-wrap max-md:max-w-full">
          <div className="flex gap-4 items-center">
            <Image
              src="https://http.cat/200"
              className="self-stretch rounded-full aspect-square"
              alt="User avatar"
              width={44}
              height={44}
            />
            <div className="self-stretch my-auto text-slate-700 font-bold">
              {username}
            </div>
            <div className="self-stretch my-auto text-gray-500 leading-[150%]">
              1 month ago
            </div>
          </div>
          <div className="flex gap-2 my-auto text-indigo-700 whitespace-nowrap leading-[150%]">
            <button>
              <Reply size={22} />
            </button>
            <label>Reply</label>
          </div>
        </div>
        <div className="mt-3 leading-6 text-gray-500 max-md:max-w-full">
          {content}
        </div>
      </div>
    </div>
  );
}

export default DisplayComment;
