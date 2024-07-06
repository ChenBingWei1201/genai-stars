"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import EmptyState from "@/components/EmptyState";
import LoaderSpiner from "@/components/LoaderSpinner";
import Searchbar from "@/components/Searchbar";
import { Row, Col } from "antd";
// import { videoData } from "@/constants/dummyData"; // replace
import { useRouter } from "next/navigation";

function Discover({
  searchParams: { search },
}: {
  searchParams: { search: string };
}) {
  const router = useRouter();

  const videoData = useQuery(api.videos.getVideoBySearch, {
    search: search || "",
  });

  const numVideos: any = videoData?.length;
  const handleClick = (videoId: string) => {
    router.push(`/video/${videoId}`);
  };

  return (
    <div className="flex flex-col w-11/12 mx-auto">
      <Searchbar />
      <h1 className="text-32 font-bold p-1">
        {search ? "Search results for: " : "Discover Videos"}
        {search && <span className="text-white-2">{search}</span>}
      </h1>
      {videoData ? (
        <>
          {videoData.length > 0 ? (
            <div className="flex flex-row flex-wrap gap-y-1">
              {videoData.map((video: any, index) => (
                <div
                  className="w-9/12 sm:w-full md:10/12 lg:w-8/12 xl:w-4/12 px-4 py-2 cursor-pointer flex flex-row flex-wrap transition-transform duration-300 ease-in-out transform hover:scale-105"
                  key={index}
                >
                  <Row
                    gutter={{
                      sm: 24,
                      md: numVideos > 1 ? 12 : 24,
                      lg: numVideos > 1 ? 8 : 24,
                      xl: numVideos > 1 ? 6 : 24,
                    }}
                  >
                    <Col className="gutter-row" span={24}>
                      <div onClick={() => handleClick(`${video.twelvelabsId}`)}>
                        <img
                          src={video.thumbnailUrl}
                          alt={video.filename}
                          className="border-3 rounded-xl border-transparent"
                        />
                        <h1 className="text-16 font-bold ml-1 my-1">
                          {video.filename}
                        </h1>
                      </div>
                    </Col>
                  </Row>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="No results found" />
          )}
        </>
      ) : (
        <LoaderSpiner />
      )}
    </div>
  );
}

export default Discover;
