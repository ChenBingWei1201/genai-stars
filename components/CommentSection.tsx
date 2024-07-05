"use client";

import { DiscussionEmbed } from "disqus-react";
import LazyLoad from "react-lazyload";
import LoaderSpinner from "./LoaderSpinner";

type Post = {
  id: string;
  title: string;
};

type CommentSectionProps = {
  videoInfo: Post;
};

function CommentSection({ videoInfo }: CommentSectionProps) {
  const pageUrl =
    typeof window !== "undefined" && window.location.hostname === "localhost"
      ? `http://localhost:3000/video/${videoInfo.id}`
      : `https://genai-stars.com/video/${videoInfo.id}`;

  return (
    <LazyLoad placeholder={<LoaderSpinner />}>
      <DiscussionEmbed
        shortname="genai-stars" // Ensure this matches your Disqus shortname
        config={{
          url: pageUrl,
          identifier: videoInfo.id,
          title: videoInfo.title,
        }}
      />
    </LazyLoad>
  );
}

export default CommentSection;
