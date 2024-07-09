"use client";

import { useState } from "react";
import { formatTime } from "@/lib/utils";
import { type ChapterType } from "@/types";
import Video from "./Video";

function ChapterSection({
  chapters,
  url,
}: {
  chapters?: ChapterType[];
  url: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChapterSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md w-11/12 max-w-sm mt-5">
      <div className="flex flex-row justify-between">
        <h2 className="text-3xl font-semibold mb-4">Chapters</h2>
        <button
          onClick={toggleChapterSection}
          className="bg-orange-500 text-white px-4 py-2 rounded mb-4 text-14 font-semibold transform active:scale-95 transition-transform duration-200"
        >
          {isOpen ? "Hide Chapters" : "Show Chapters"}
        </button>
      </div>
      <div
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 overflow-y-auto" : "max-h-0 overflow-hidden"
        }`}
      >
        <ul className="w-11/12 mx-auto flex flex-col">
          {chapters?.map((chapter, index) => (
            <li
              key={index}
              className="flex flex-row items-center mb-2 w-11/12 gap-2 justify-between"
            >
              <Video
                key={index}
                url={url}
                start={chapter.start}
                end={chapter.end}
                width="100%"
                height="100%"
              />
              <div className="flex flex-col w-8/12">
                <span className="block w-full text-gray-600 hover:underline cursor-pointer text-14 font-semibold">
                  {chapter.chapter_title}
                </span>
                <span className="block text-orange-600 text-sm font-semibold">
                  {formatTime(chapter.start)} - {formatTime(chapter.end)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChapterSection;
