import { Loader } from "lucide-react";
import React from "react";

function LoaderSpiner() {
  return (
    <div className="flex-center h-screen w-full">
      <Loader className="animate-spin" size={30} />
    </div>
  );
}

export default LoaderSpiner;
