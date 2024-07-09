import ReactPlayer from "react-player";
import { VideoProps } from "@/types/index";

function Video({ url, start, end, width, height }: VideoProps) {
  const isYouTube = url.includes("youtube");

  const getPlayerProps = () => {
    const playerProps: any = {
      key: url,
      className: "video__reactPlayer",
      "data-cy": "data-cy-video",
      url: url,
      controls: true,
      width: width,
      height: height,
    };

    if (isYouTube) {
      playerProps.url = start || end ? `${url}?start=${start}&end=${end}` : url;
    } else {
      playerProps.config = {
        hlsOptions: {
          startPosition: start,
          endPosition: end,
        },
      };
    }

    return playerProps;
  };

  return <ReactPlayer {...getPlayerProps()} />;
}

export default Video;
