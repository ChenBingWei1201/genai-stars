"use client";

import { useEffect, useState } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import IndexFolder from "@/components/IndexFolder";
import LoaderSpinner from "@/components/LoaderSpinner";
import EmptyState from "@/components/EmptyState";

function SectionPage() {
  const getIndexes = useAction(api.twelve_labs.getIndexes);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getIndexes();
        setData(JSON.parse(response!)?.data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [setData]);

  const demoImages = ["nba", "cpbl", "euro", "mlb"];

  if (loading) return <LoaderSpinner />;

  return (
    <div className="bg-white">
      {data.length === 0 ? (
        <EmptyState title="no index" />
      ) : (
        <div className="w-11/12 mx-auto">
          <div className="flex flex-row flex-wrap justify-start w-full my-10 sm:justify-center md:justify-start lg:justify-start xl:justify-start">
            {data.map((item: any, index) => (
              <IndexFolder
                key={index}
                indexId={item._id}
                title={item.index_name}
                imgUrl={`/images/${demoImages[index]}.png`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SectionPage;
