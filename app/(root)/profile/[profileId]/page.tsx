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

  if (!user || !videoData) return <LoaderSpinner />;

  return (
    <section className="flex flex-col w-11/12 mx-auto justify-start">
      <h1 className="text-32 font-bold p-1">User Profile</h1>
      <div className="flex flex-row gap-x-5">
        <div className="flex flex-col gap-3 p-1">
          <ProfileCard imageUrl={user?.imageUrl!} userFirstName={user?.name!} />
        </div>
        <section className="mt-2 flex flex-col gap-5 w-7/12 ml-0">
          <h1 className="text-20 font-bold px-1 mx-2">All Favorite Videos</h1>
          <EmptyState title="Comming Soon" />
        </section>
      </div>
    </section>
  );
};

export default ProfilePage;
