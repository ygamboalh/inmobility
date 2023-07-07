import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { BiArea, BiBath, BiBed } from "react-icons/bi";
import MySpinner from "../Spinner/spinner";

const PropertyDetailsSearch = ({ searchResults }) => {
  console.log("searchResults desde venta casa apartamento", searchResults.id);
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <MySpinner />;
  }
  return (
    <section>
      <div className="container mx-auto min-h-[800px] pt-20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Aqui algo</h2>
          </div>
          <div className="mb-4 lg:mb-0 flex gap-x-2 text-sm">
            <div className="bg-green-500 text-black px-3 rounded-full"></div>
            <div className="bg-blue-500 text-black px-3 rounded-full"></div>
          </div>
          <div className="text-3xl font-semibold text-blue-600"></div>
        </div>
        <div className="flex flex-col items-start gap-8 lg:flex-row">
          <div className="max-w-[768px]">
            <div className="flex gap-x-6 text-blue-700 mb-6">
              <div className="flex gap-x-2 items-center">
                <BiBed className="text-2xl" />
              </div>
              <div className="flex gap-x-2 items-center">
                <BiBath className="text-2xl " />
              </div>
              <div className="flex gap-x-2 items-center">
                <BiArea className="text-2xl " />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetailsSearch;
