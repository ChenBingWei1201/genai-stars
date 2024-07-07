import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  search?: boolean;
  buttonText?: string;
  buttonLink?: string;
}

function EmptyState({
  title,
  search,
  buttonLink,
  buttonText,
}: EmptyStateProps) {
  return (
    <section className="flex-center size-full flex-col">
      {title !== "Comming Soon" && (
        <Image
          src="/icons/emptyState.svg"
          width={400}
          height={400}
          alt="empty state"
        />
      )}
      <div className="flex-center w-full max-w-[254px] flex-col gap-">
        {title !== "Comming Soon" ? (
          <h1 className="text-32 text-center font-bold text-black mb-5">
            {title}
          </h1>
        ) : (
          <h1 className="w-full text-32 text-center font-bold text-black mb-5 border-2 border-black p-2">
            {title}
          </h1>
        )}
        {search && (
          <p className="text-16 text-center font-medium text-white-2">
            Try adjusting your search to find what you are looking for
          </p>
        )}
        {buttonLink && (
          <Button className="bg-orange-1">
            <Link href={buttonLink} className="gap-1 flex">
              <Image
                src="/icons/discover.svg"
                width={20}
                height={20}
                alt="discover"
              />

              <h1 className="text-16 font-extrabold text-black">
                {buttonText}
              </h1>
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
}

export default EmptyState;
