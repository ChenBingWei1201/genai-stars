"use client";
import { useState } from "react";
import { formatTime } from "@/lib/formatTime";
import ReactPlayer from "react-player";

type ChapterProp = {
  chapter_number: number;
  start: number;
  end: number;
  chapter_title: string;
  chapter_summary: string;
};

function ChapterSection({
  chapters,
  url,
}: {
  chapters: ChapterProp[];
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
          className="bg-orange-500 text-white px-4 py-2 rounded mb-4 text-14 font-semibold"
        >
          {isOpen ? "Hide Chapters" : "Show Chapters"}
        </button>
      </div>
      <div
        className={`transition-all duration-600 ease-in-out ${
          isOpen ? "max-h-max" : "max-h-0 overflow-hidden"
        }`}
      >
        <ul className="w-11/12 mx-auto flex flex-col">
          {chapters.map((chapter, index) => (
            <li
              key={index}
              className="flex flex-row items-center mb-2 w-11/12 gap-2 justify-between"
            >
              <ReactPlayer
                key={index}
                url={url + `?start=${chapter.start}&end=${chapter.end}`}
                controls
                width="100%"
                height="100%"
              />
              <div className="flex flex-col">
                <span className="block text-gray-600 hover:underline cursor-pointer text-lg font-semibold">
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
