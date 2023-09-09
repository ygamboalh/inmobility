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
      className="w-full flex-col px-1 flex justify-center items-center mt-4"
      id="container"
    >
      <MetaData title="Reproducir video" description="Reproducir video" />
      <div className="max-[600px]:border max-[600px]:border-gray-300 w-full max-[600px]:rounded-md p-4 h-fit flex flex-col justify-center">
        <div className="flex w-full justify-center h-fit">
          {/* <ReactPlayer url={video} controls={true} width={640} height={360} /> */}
          <ReactPlayer
            url={"https://www.youtube.com/watch?v=26NOGYsTWOI"}
            controls={true}
            width={640}
            height={360}
          />
        </div>
        <div className="flex justify-center">
          <div className="flow-root w-full flex-col">
            <ul className="divide-y flex justify-start  min-[800px]:justify-center divide-gray-200">
              <div className="flex items-center  space-x-4 ">
                <div className="flex-1 max-w-[640px] min-w-0 ">
                  <div className="flex items-center mb-4 mt-2">
                    <div className="text-sm flex flex-row font-medium max-[600px]:text-xs max-[600px]:flex-col  text-gray-900">
                      <span className="mr-1">
                        Video promocional de la propiedad:
                      </span>
                      <span>{propiedad?.uniqueId}</span>
                    </div>
                  </div>
                  <div className="flex items-center mb-2 flex-row">
                    <div className="flex flex-row">
                      <BiCategory size={25} />
                      <p className="text-sm font-medium mt-0.5 flex  text-gray-900">
                        {propiedad?.categories?.data[0]?.attributes.nombre}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="flex items-center mt-2 mb-2 flex-wrap max-[600px]:flex-col max-[600px]:justify-start max-[600px]:items-start">
                    <div className="flex flex-row max-[600px]:py-1 mr-1">
                      <BiHomeAlt size={20} />
                      <p className="text-sm mt-0.5 text-gray-900 truncate">
                        {propiedad?.tipoPropiedad}
                      </p>
                    </div>
                    <div className="flex flex-row max-[600px]:py-1 mr-1">
                      <span className="">
                        <BiCurrentLocation size={20} />
                      </span>
                      <p className="text-sm text-gray-500 truncate">
                        {propiedad?.provincia}
                      </p>
                    </div>
                    <div className="flex flex-row max-[600px]:py-1 mr-1">
                      <span className="">
                        <BiMap size={20} />
                      </span>
                      <p className="text-sm text-gray-500 truncate">
                        {propiedad?.canton}
                      </p>
                    </div>
                    <div className="flex flex-row max-[600px]:py-1 mr-1">
                      <span className="">
                        <BiBuildingHouse size={20} />
                      </span>
                      <p className="text-sm text-gray-500 truncate">
                        {propiedad?.distrito}
                      </p>
                    </div>
                    <div className="flex flex-row max-[600px]:py-1 mr-1">
                      <span className="">
                        <BiArea size={20} />
                      </span>
                      <p className="text-sm text-gray-500 truncate">
                        {propiedad?.areaTerreno} m<sup>2</sup>
                      </p>
                    </div>
                    <div className="flex flex-row">
                      <div
                        className={
                          propiedad?.habitaciones
                            ? "flex flex-row mr-1"
                            : "hidden"
                        }
                      >
                        <span className="">
                          <BiHotel size={20} />
                        </span>
                        <p className="text-sm text-gray-500 truncate">
                          {propiedad?.habitaciones} habitaciones
                        </p>
                      </div>
                    </div>
                  </div>
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
