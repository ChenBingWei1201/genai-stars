"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { formatTime, truncateTitle } from "@/lib/utils";
import { SimilarVideoItemProps } from "@/types";

function SimilarVideoItem({ similarVideo }: SimilarVideoItemProps) {
  const router = useRouter();
  const handleClick = useCallback(
    (videoId: string) => {
      router.push(`/video/${videoId}`);
    },
    [router],
  );

  return (
    <div
      className="flex items-start space-x-2 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105"
      key={similarVideo.twelvelabsId}
      onClick={() => handleClick(similarVideo.twelvelabsId)}
    >
      <img
        src={similarVideo.thumbnailUrl}
        alt={truncateTitle(similarVideo.filename)}
        className="w-7/12 h-auto bg-cover bg-center rounded sm:w-6/12 lg:w-6/12 xl:w-6/12"
        loading="lazy"
      />
      <div className="flex-1">
        <h1 className="text-sm font-semibold sm:text-2xl md:text-2xl lg:text-sm xl:text-sm">
          {truncateTitle(similarVideo.filename)}
        </h1>
        <div className="resultDescription">
          Start {formatTime(similarVideo.start)} | End{" "}
          {formatTime(similarVideo.end)} |{" "}
          <span>
            Condidence:{" "}
            <span
              className="confidence"
              style={{
                backgroundColor:
                  similarVideo.confidence === "high"
                    ? "#2EC29F"
                    : similarVideo.confidence === "medium"
                      ? "#FDC14E"
                      : "#B7B9B4",
              }}
            >
              {similarVideo.confidence}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SimilarVideoItem;
