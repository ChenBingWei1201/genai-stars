"use client";

import { DiscussionEmbed } from "disqus-react";
import LazyLoad from "react-lazyload";
import LoaderSpinner from "./LoaderSpinner";
import { type CommentSectionProps } from "@/types";

function CommentSection({ id, title }: CommentSectionProps) {
  const pageUrl =
    typeof window !== "undefined" && window.location.hostname === "localhost"
      ? `http://localhost:3000/video/${id}`
      : `https://genai-stars.vercel.app/video/${id}`;

  return (
    <LazyLoad placeholder={<LoaderSpinner />}>
      <DiscussionEmbed
        shortname="genai-stars" // Ensure this matches your Disqus shortname
        config={{
          url: pageUrl,
          identifier: id,
          title: title,
        }}
      />
    </LazyLoad>
  );
}

export default CommentSection;
