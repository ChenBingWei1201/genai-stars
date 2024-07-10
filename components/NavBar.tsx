"use client";

import { useCallback, useEffect, useState } from "react";
import { Segmented } from "antd";
import { useRouter } from "next/navigation";
import { SECTIONS } from "@/constants/index";

function NavBar() {
  const router = useRouter();
  const [selectedSection, setSelectedSection] = useState<string>(() => {
    return localStorage.getItem("selectedSection") || "Home";
  });

  useEffect(() => {
    // Persist selectedSection to localStorage whenever it changes
    localStorage.setItem("selectedSection", selectedSection);
  }, [selectedSection]);

  const handleClick = useCallback(
    (sectionId: string) => {
      setSelectedSection(sectionId);
      if (sectionId === "Home") router.push("/");
      else router.push(`/section/${sectionId}`);
    },
    [router],
  );

  return (
    <div className="bg-gray-100 w-full">
      <Segmented
        className="flex w-10/12 mx-auto flex-center border-b-2 border-x-2 border-gray-100"
        options={SECTIONS}
        value={selectedSection}
        onChange={(value) => {
          handleClick(value);
        }}
        size="large"
        block
      />
    </div>
  );
}

export default NavBar;
