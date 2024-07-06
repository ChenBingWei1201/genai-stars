import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ReactPlayer from "react-player";
import { formatTime } from "@/lib/formatTime";

type HighlightProp = {
  start: number;
  end: number;
  highlight: string;
  highlight_summary: string;
  highlight_index: number;
};

function HighlightSection({
  highlights,
  url,
}: {
  highlights?: HighlightProp[];
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
              <ReactPlayer
                key={index}
                url={url + `?start=${highlight.start}&end=${highlight.end}`}
                controls
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
