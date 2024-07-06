"use client";

import { useEffect, useState } from "react";
import { useAction, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ClassFolder from "@/components/ClassFolder";
import LoaderSpinner from "@/components/LoaderSpinner";
import EmptyState from "@/components/EmptyState";
import { useRouter } from "next/navigation";
import {
  CLASSES,
  SECTION_IDS,
  SECTION_CLASS_MAP,
  IMAGES,
} from "@/constants/index";

// if sectionId is "Baseball", then ["mlb", "cpbl", "wbc"] will be shown on /section/Baseball
function SectionPage({
  params: { sectionId },
}: {
  params: { sectionId: string };
}) {
  const router = useRouter();
  // const getIndexes = useAction(api.twelve_labs.getIndexes); // replace
  const allVideos = useQuery(api.videos.getAllVideos);
  const [videos, setVideos] = useState<any>();
  // const [data, setData] = useState([]); // replace
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(sectionId);
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
        // const response = await getIndexes();
        // setData(JSON.parse(response!)?.data);
        // const response: any = await getAllVideos();
        console.log(SECTION_IDS[sectionId]);
        setVideos(
          allVideos?.filter((video: any) =>
            SECTION_IDS[sectionId].includes(video.class),
          ),
        );
        setLoading(false);
        // console.log(data);
      } catch (error) {
        console.log(error);
        setLoading(false);
        router.push("/not-found");
      }
    };
    fetchData();
  }, [setVideos]); // setVideos, getAllVideos

  // const demoImages = ["nba", "cpbl", "euro", "mlb"]; // replace

  if (loading) return <LoaderSpinner />;

  return (
    <>
      {videos ? (
        <div className="bg-white">
          {videos.length === 0 ? (
            <EmptyState title="no index" />
          ) : (
            <div className="w-11/12 mx-auto">
              <div className="flex flex-row flex-wrap justify-start w-full my-10 sm:justify-center md:justify-start lg:justify-start xl:justify-start">
                {/* {videos.map((item: any, index: number) => (
              <ClassFolder
              key={index}
                indexId={item._id}
                title={item.index_name}
                imgUrl={`/images/${demoImages[index]}.png`}
                /> */}
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
                {/* ))} */}
              </div>
            </div>
          )}
        </div>
      ) : (
        <EmptyState title="no index" />
      )}
    </>
  );
}

export default SectionPage;
