"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoaderSpinner from "@/components/LoaderSpinner";
import VideoList from "@/components/VideoList";
import EmptyState from "@/components/EmptyState";

function ClassPage({ params }: { params: { classId: string } }) {
  const classId = decodeURIComponent(params.classId);
  const videos = useQuery(api.videos.getVideoByClass, {
    class: classId,
  });

  return (
    <>
      {videos ? (
        <div className="w-11/12 mx-auto">
          {videos?.length === 0 ? (
            <EmptyState title="no video" />
          ) : (
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
