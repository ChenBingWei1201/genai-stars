import Image from "next/image";
import { type ProfileCardProps } from "@/types";
import LoaderSpinner from "./LoaderSpinner";

const ProfileCard = ({ imageUrl, userFirstName }: ProfileCardProps) => {
  if (!imageUrl) return <LoaderSpinner />;

  return (
    <div className="my-2 flex flex-col gap-6 max-md:items-center md:flex-row">
      <Image
        src={imageUrl}
        width={200}
        height={200}
        alt="User Image"
        className="aspect-square rounded-2xl"
      />
      <div className="flex flex-col justify-center max-md:items-center">
        <div className="flex flex-col gap-2.5">
          <figure className="flex gap-2 max-md:justify-center">
            <Image
              src="/icons/verified.svg"
              width={15}
              height={15}
              alt="verified"
            />
            <h2 className="text-14 font-medium text-white-2">Verified User</h2>
          </figure>
          <h1 className="text-32 font-extrabold tracking-[-0.32px] text-white-1">
            {userFirstName + " "}
          </h1>
        </div>
        <figure className="flex gap-3 py-6">
          <Image
            src="/icons/headphone.svg"
            width={24}
            height={24}
            alt="headphones"
          />
        </figure>
      </div>
    </div>
  );
};

export default ProfileCard;
