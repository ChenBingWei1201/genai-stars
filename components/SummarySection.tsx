"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

function SummarySection({ summary }: { summary: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showReadMoreButton, setShowReadMoreButton] = useState(false);
  const ref = useRef<any>(null);

  const video = {
    summary:
      "Clerk is an authentication platform providing login via passwords, social identity providers, one-time email or SMS access codes, and multi-factor authentication and basic user management. Example: Convex Authentication with Clerk. If you're using Next.js see the Next.js setup guide.Clerk is an authentication platform providing login via passwords, social identity providers, one-time email or SMS access codes, and multi-factor authentication and basic user management. Example: Convex Authentication with Clerk. If you're using Next.js see the Next.js setup guide.",
  };

  useEffect(() => {
    if (ref.current) {
      console.log(ref.current.scrollHeight, ref.current.clientHeight);
      setShowReadMoreButton(
        ref.current.scrollHeight !== ref.current.clientHeight,
      );
    }
  }, []);

  return (
    <div className="my-3">
      <div
        className={cn(
          "overflow-hidden bg-gray-100 border-2 rounded-xl border-transparent pl-3 pr-1 pt-2 pb-1 text-14",
          { "line-clamp-3": !isOpen },
        )}
        ref={ref}
      >
        <h1 className="text-16 font-semibold">Summary: </h1>
        <p>{summary}</p>
      </div>
      {showReadMoreButton && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-orange-500 mx-2 text-14 font-semibold"
        >
          {isOpen ? "show less" : "read more"}
        </button>
      )}
    </div>
  );
}

export default SummarySection;
