"use client";

import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ClassFolder from "@/components/ClassFolder";
import LoaderSpinner from "@/components/LoaderSpinner";
import EmptyState from "@/components/EmptyState";
import { useRouter } from "next/navigation";
import { SECTION_IDS, SECTION_CLASS_MAP, IMAGES } from "@/constants/index";

function SectionPage({
  params: { sectionId },
}: {
  params: { sectionId: string };
}) {
  const router = useRouter();
  const allVideos = useQuery(api.videos.getAllVideos);
  const [videos, setVideos] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      sectionId != "Home" &&
      sectionId != "Baseball" &&
      sectionId != "Basketball" &&
      sectionId != "Football" &&
      sectionId != "Badminton" &&
      sectionId != "Tennis"
    ) {
      router.push("/not-found");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setVideos(
          allVideos?.filter((video: any) =>
            SECTION_IDS[sectionId].includes(video.class),
          ),
        );
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        router.push("/not-found");
      }
    };
    fetchData();
  }, [setVideos, allVideos]);

  if (loading) return <LoaderSpinner />;

  return (
    <>
      {videos ? (
        <div className="bg-white">
          {videos.length === 0 ? (
            <EmptyState title="no folder" />
          ) : (
            <div className="w-11/12 mx-auto">
              <div className="flex flex-row flex-wrap justify-start w-full my-10 sm:justify-center md:justify-start lg:justify-start xl:justify-start">
                {SECTION_CLASS_MAP[sectionId].map(
                  (classItem: string, index: number) => (
                    <ClassFolder
                      key={index}
                      classId={classItem}
                      title={classItem}
                      imgUrl={`/images/${IMAGES[classItem]}.png`}
                    />
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <LoaderSpinner />
      )}
    </>
  );
}

export default SectionPage;
