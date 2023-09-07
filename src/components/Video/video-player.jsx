import ReactPlayer from "react-player";
import MetaData from "../Metadata/metadata";
import video from "../../assets/images/no-te-hago-falta.mp4";
import { useLocation } from "react-router-dom";
import {
  BiArea,
  BiBuildingHouse,
  BiCategory,
  BiCurrentLocation,
  BiHomeAlt,
  BiHotel,
  BiMap,
} from "react-icons/bi";
const VideoPlayer = () => {
  const location = useLocation();
  const propiedad = location.state.property;
  return (
    <section
      className="w-full flex-col px-1 flex justify-center mt-4"
      id="container"
    >
      <MetaData title="Reproducir video" description="Reproducir video" />
      <div className="border border-gray-300 rounded-md p-4 w-full h-fit flex flex-col justify-center">
        <div className="flex w-full justify-center h-fit">
          <ReactPlayer url={video} controls={true} width={640} height={360} />
        </div>
        <div className="flex justify-center">
          <div className="flow-root w-full flex-col">
            <ul className="divide-y flex justify-start  min-[800px]:justify-center divide-gray-200">
              <div className="flex items-center  space-x-4 ">
                <div className="flex-1 min-w-0 ">
                  <div className="flex items-center mb-4 mt-2 flex-row">
                    <p className="text-sm font-medium  text-gray-900 truncate">
                      Video promocional de la propiedad: {propiedad?.uniqueId}
                    </p>
                  </div>
                  <div className="flex items-center mb-4 flex-row">
                    <div className="flex flex-row">
                      <BiCategory size={25} />
                      <p className="text-sm font-medium mt-0.5  text-gray-900 truncate">
                        {propiedad?.categories?.data[0]?.attributes.nombre}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="flex items-center mt-2 mb-2 flex-wrap max-[600px]:flex-col max-[600px]:justify-start max-[600px]:items-start">
                    <div className="flex flex-row max-[600px]:py-1">
                      <BiHomeAlt size={20} />
                      <p className="text-sm mt-0.5 text-gray-900 truncate">
                        {propiedad?.tipoPropiedad}
                      </p>
                    </div>
                    <div className="flex flex-row max-[600px]:py-1">
                      <span className="ml-[2px]">
                        <BiCurrentLocation size={20} />
                      </span>
                      <p className="text-sm text-gray-500 truncate">
                        {propiedad?.provincia}
                      </p>
                    </div>
                    <div className="flex flex-row max-[600px]:py-1">
                      <span className="ml-[2px]">
                        <BiMap size={20} />
                      </span>
                      <p className="text-sm text-gray-500 truncate">
                        {propiedad?.canton}
                      </p>
                    </div>
                    <div className="flex flex-row max-[600px]:py-1">
                      <span className="ml-[2px]">
                        <BiBuildingHouse size={20} />
                      </span>
                      <p className="text-sm text-gray-500 truncate">
                        {propiedad?.distrito}
                      </p>
                    </div>
                    <div className="flex flex-row max-[600px]:py-1">
                      <span className="ml-[2px]">
                        <BiArea size={20} />
                      </span>
                      <p className="text-sm text-gray-500 truncate">
                        {propiedad?.areaTerreno} m<sup>2</sup>
                      </p>
                    </div>
                    <div className="flex flex-row">
                      <div
                        className={
                          propiedad?.habitaciones ? "flex flex-row" : "hidden"
                        }
                      >
                        <span className="ml-[2px]">
                          <BiHotel size={20} />
                        </span>
                        <p className="text-sm text-gray-500 truncate">
                          {propiedad?.habitaciones} habitaciones
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr />

                  {/* <div className="flex my-2 flex-row">
                    <span className="ml-[2px]">
                      <BiCurrentLocation size={20} />
                    </span>
                    <p className="text-sm text-gray-500 truncate">
                      {propiedad?.provincia}
                    </p>
                  </div>
                  <hr />
                  <div className="flex my-2 flex-row">
                    <span className="ml-[2px]">
                      <BiMap size={20} />
                    </span>
                    <p className="text-sm text-gray-500 truncate">
                      {propiedad?.canton}
                    </p>
                  </div>
                  <hr />
                  <div className="flex my-2 flex-row">
                    <span className="ml-[2px]">
                      <BiBuildingHouse size={20} />
                    </span>
                    <p className="text-sm text-gray-500 truncate">
                      {propiedad?.distrito}
                    </p>
                  </div>
                  <hr />
                  <div
                    className={
                      propiedad?.habitaciones ? "flex my-2 flex-row" : "hidden"
                    }
                  >
                    <span className="ml-[2px]">
                      <BiHotel size={20} />
                    </span>
                    <p className="text-sm text-gray-500 truncate">
                      {propiedad?.habitaciones} habitaciones
                    </p>
                  </div>
                  <hr />
                  <div className="flex my-2 flex-row">
                    <span className="ml-[2px]">
                      <BiArea size={20} />
                    </span>
                    <p className="text-sm text-gray-500 truncate">
                      {propiedad?.areaTerreno} m<sup>2</sup>
                    </p>
                  </div> */}
                  <hr />
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoPlayer;
