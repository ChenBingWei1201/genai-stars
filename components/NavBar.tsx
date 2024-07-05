"use client";

import { useState } from "react";
import { Segmented } from "antd";
import { useRouter } from "next/navigation";

function NavBar() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string>("home");
  const options = [
    "home",
    "baseball",
    "basketball",
    "football",
    "badminton",
    "tennis",
  ];

  const handleClick = (sectionId: string) => {
    setSelectedOption(sectionId);
    if (sectionId === "home") router.push("/");
    else router.push(`/section/${sectionId}`);
  };
  return (
    <div className="bg-gray-100 w-full">
      <Segmented
        className="flex w-10/12 mx-auto flex-center border-b-2 border-x-2 border-gray-100"
        options={options}
        value={selectedOption}
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
