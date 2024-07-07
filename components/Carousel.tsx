"use client";

import React, { useCallback } from "react";
import type {
  EmblaOptionsType,
  EmblaCarouselType,
  EmblaPluginType,
} from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import LoaderSpiner from "./LoaderSpinner";

type TopPodcastersProps = {
  id: string;
  imageUrl: any;
  name: string;
  totalPodcasts: number;
};

type CarouselProps = {
  ads: TopPodcastersProps[];
};
const EmblaCarousel = ({ ads }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay() as any,
  ]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay || !("stopOnInteraction" in autoplay.options)) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? (autoplay.reset as () => void)
        : (autoplay.stop as () => void);

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi as any,
    onNavButtonClick,
  );

  const slides = ads;
  if (!slides) return <LoaderSpiner />;
  return (
    <section
      className="flex w-full flex-col gap-4 overflow-hidden mx-auto"
      ref={emblaRef}
    >
      <div className="flex">
        {slides.slice(0, 5).map((item) => (
          <figure key={item.id} className="carousel_box">
            <img
              src={item.imageUrl}
              alt="card"
              className="absolute size-full border-none"
              width={10}
              height={10}
            />
            <div className="glassmorphism-white relative z-10 flex flex-col p-4">
              <h2 className="text-16 font-bold text-black">{item.name}</h2>
            </div>
          </figure>
        ))}
      </div>
      <div className="flex justify-center gap-2">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            selected={index === selectedIndex}
          />
        ))}
      </div>
    </section>
  );
};

export default EmblaCarousel;
