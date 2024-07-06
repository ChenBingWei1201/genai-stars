import React from "react";
type AdBarProps = {
  src: string;
  alt: string;
};

function AdBar({ src, alt }: AdBarProps) {
  return (
    <div className="w-fit">
      <img src={src} alt={alt} />
    </div>
  );
}

export default AdBar;
