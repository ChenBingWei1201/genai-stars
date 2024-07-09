import { SimilarVideoType, RecommendVideoListProps } from "@/types";
import SimilarVideoItem from "./SimilarVideoItem";

function RecommendVideoList({ similarVideos }: RecommendVideoListProps) {
  if (!similarVideos?.length) {
    return <></>;
  }

  return (
    <div className="p-2 mt-5 w-11/12 mx-auto">
      <div className="flex flex-col space-y-8">
        {similarVideos.map((similarVideo: SimilarVideoType, index: number) => {
          return (
            <SimilarVideoItem
              key={similarVideo.twelvelabsId}
              similarVideo={similarVideo}
            />
          );
        })}
      </div>
    </div>
  );
}

export default RecommendVideoList;
