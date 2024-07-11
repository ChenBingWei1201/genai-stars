"use client";

import { useEffect, useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import ClassFolder from "@/components/ClassFolder";
import LoaderSpinner from "@/components/LoaderSpinner";
import EmptyState from "@/components/EmptyState";
import {
  SECTION_IDS,
  SECTION_CLASS_MAP,
  IMAGES,
  SECTIONS,
} from "@/constants/index";

import type { ImagesType, SectionClassMapType, SectionIdsType } from "@/types";

function SectionPage({
  params: { sectionId },
}: {
  params: { sectionId: string };
}) {
  const router = useRouter();
  const allVideos = useQuery(api.videos.getAllVideos);
  const [loading, setLoading] = useState(true);

  const isKeyOfSectionIds = (key: string): key is keyof SectionIdsType => {
    return key in SECTION_IDS;
  };

  const iKeyOfSectionClassMap = (
    key: string,
  ): key is keyof SectionClassMapType => {
    return key in SECTION_CLASS_MAP;
  };

  const isKeyOfImages = (key: string): key is keyof ImagesType => {
    return key in IMAGES;
  };

  const validSection = useMemo(() => SECTIONS.includes(sectionId), [sectionId]);

  const filteredVideos = useMemo(() => {
    if (isKeyOfSectionIds(sectionId))
      return allVideos?.filter((video) =>
        SECTION_IDS[sectionId]?.includes(video.class),
      );
  }, [allVideos, sectionId, validSection]);

  useEffect(() => {
    if (!validSection) {
      router.push("/not-found");
      return;
    }
    if (filteredVideos) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [filteredVideos, validSection, router]);

  if (loading) return <LoaderSpinner />;

  return (
    <>
      <div className="bg-white">
        {filteredVideos?.length === 0 ? (
          <EmptyState title="no folder" />
        ) : (
          <div className="w-11/12 mx-auto">
            <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row flex-wrap justify-start w-full sm:w-full md:w-full my-10 sm:justify-end md:justify-center lg:justify-between xl:justify-start">
              {iKeyOfSectionClassMap(sectionId) &&
                SECTION_CLASS_MAP[sectionId].map((classItem: string) => (
                  <>
                    {isKeyOfImages(classItem) && (
                      <ClassFolder
                        key={classItem}
                        classId={classItem}
                        title={classItem}
                        imgUrl={`/images/${IMAGES[classItem]}.png`}
                      />
                    )}
                  </>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SectionPage;
