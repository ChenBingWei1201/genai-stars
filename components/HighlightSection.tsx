import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatTime } from "@/lib/utils";
import { type HighlightType } from "@/types";
import Video from "./Video";

function HighlightSection({
  highlights,
  url,
}: {
  highlights?: HighlightType[];
  url: string;
}) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {highlights?.map((highlight, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1 w-full">
              <Video
                key={index}
                url={url}
                start={highlight.start}
                end={highlight.end}
                width="100%"
                height="100%"
              />
              <div className="flex flex-col">
                <div className="text-sm text-orange-500 mt-1 ml-1 font-bold">
                  {formatTime(highlight.start)} - {formatTime(highlight.end)}
                </div>
                <div className="text-sm ml-1">
                  {highlight.highlight_summary || highlight.highlight}
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default HighlightSection;
