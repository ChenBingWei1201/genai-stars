"use client";

import { useQuery } from "convex/react";

import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import ProfileCard from "@/components/ProfileCard";
import { api } from "@/convex/_generated/api";
import { videoData } from "@/constants/dummyData";

const ProfilePage = ({
  params,
}: {
  params: {
    profileId: string;
  };
}) => {
  const user = useQuery(api.users.getUserById, {
    clerkId: params.profileId,
  });

  // const videoData = useQuery(api.podcasts.getPodcastByAuthorId, {
  //   authorId: params.profileId,
  // });

  if (!user || !videoData) return <LoaderSpinner />;

  return (
    <section className="flex flex-col w-11/12 mx-auto justify-start">
      <h1 className="text-32 font-bold p-1">User Profile</h1>
      <div className="flex flex-row gap-x-5">
        <div className="flex flex-col gap-3 p-1">
          <ProfileCard imageUrl={user?.imageUrl!} userFirstName={user?.name!} />
        </div>
        <section className="mt-2 flex flex-col gap-5 w-6/12 ml-0">
          <h1 className="text-20 font-bold px-1 mx-2">All Favorite Videos</h1>
          {videoData && videoData.length > 0 ? (
            <div className="podcast_grid">
              {/* {videoData?.podcasts
              ?.slice(0, 4)
              .map((podcast) => (
                <PodcastCard
                key={podcast._id}
                imgUrl={podcast.imageUrl!}
                title={podcast.podcastTitle!}
                description={podcast.podcastDescription}
                podcastId={podcast._id}
                />
                ))} */}
            </div>
          ) : (
            <EmptyState
              title="You have not created any podcasts yet"
              buttonLink="/create-podcast"
              buttonText="Create Podcast"
            />
          )}
        </section>
      </div>
    </section>
  );
};

export default ProfilePage;
