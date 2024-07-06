"use client";

import { useEffect, useState } from "react";
import { useAction, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoaderSpinner from "@/components/LoaderSpinner";
import VideoList from "@/components/VideoList";
import EmptyState from "@/components/EmptyState";

function ClassPage({ params }: { params: { classId: string } }) {
  // function IndexPage({ params: { indexId } }: { params: { indexId: string } }) {
  const classId = decodeURIComponent(params.classId);
  const videos = useQuery(api.videos.getVideoByClass, {
    class: classId,
  });
  // const getVideos = useAction(api.twelve_labs.getVideos); // replace
  // const [videos, setVideos] = useState<any>();
  // const [videoIds, setVideoIds] = useState<string[]>([]); // replace
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // const response = await getVideos({ indexId: indexId });
  //       // const data: string[] = JSON.parse(response!)?.data.map((video: any) => {
  //       //   return video._id;
  //       // });
  //       // setVideoIds(data);
  //       // const response = await getVideoByClass({ class: classId });
  //       setVideos(videoByClass);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [setVideos, videoByClass, setLoading]); // setVideos, getAllVideos

  // if (loading) return <LoaderSpinner />;

  return (
    <>
      {videos ? (
        <div className="w-11/12 mx-auto">
          {videos?.length === 0 ? (
            <EmptyState title="no video" />
          ) : (
            // <VideoList videoIds={videoIds} indexId={classId} />
            <VideoList videos={videos!} />
          )}
        </div>
      ) : (
        <LoaderSpinner />
      )}
    </>
  );
}

export default ClassPage;
// export default IndexPage;
