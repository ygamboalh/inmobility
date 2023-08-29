import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import MySpinner from "../Spinner/spinner";
import { authUserData } from "../../api/usersApi";
import { useQuery } from "react-query";
import SearchCard from "../SearchResults/property-card";

const MyPropertyList = () => {
  const { data: userData } = useQuery("profile", authUserData);
  const location = useLocation();
  const propertyList = location.state.propertyList;

  return (
    <div>
      <div className="">
        {propertyList?.length < 1 || !propertyList ? (
          <div className="fixed mx-8 mb-3 flex justify-center text-center mt-4">
            <span className="font-semibold text-lg">
              Aún no tienes propiedades
            </span>
          </div>
        ) : (
          <div className="mx-8 mb-3 flex flex-col justify-center text-center mt-4">
            <span className="font-semibold text-xl">
              Mi lista de propiedades
            </span>
          </div>
        )}
        <div id="data" className="text-semibold text-sm ml-[110px]"></div>
      </div>
      {propertyList?.length !== 0
        ? propertyList?.map((property) => {
            return (
              <div className="mb-3 mt-3 mx-2">
                <SearchCard propiedad={[property]} />
              </div>
            );
          })
        : null}
    </div>
  );
};

export default MyPropertyList;