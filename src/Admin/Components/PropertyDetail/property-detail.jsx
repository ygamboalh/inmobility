import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { BiArea, BiBath, BiBed } from "react-icons/bi";

import no_image from "../../../assets/images/no_image_default.jpg";
import { API } from "../../../constant";
import AxiosInstance from "../../../api/AxiosInstance";
import MySpinner from "../../../components/Spinner/spinner";
import Slideshow from "../../../components/Carrusel/slideShow";

const PropertyDetailsAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getProperty();
  }, []);

  const { id } = useParams();
  const [property, setProperty] = useState([]);
  const [images, setImages] = useState([]);

  const getProperty = async () => {
    setIsLoading(true);
    let propertyFound = [];
    let imagesCount = [];
    const propertyResponse = await AxiosInstance.get(
      `${API}properties/${id}?populate=*`
    ).then((response) => {
      propertyFound = response.data.data.attributes;
      imagesCount = response.data.data.attributes.photos;
    });

    setProperty(propertyFound);
    setIsLoading(false);
    const imagesUrl = [];
    imagesCount?.data?.forEach((image) => {
      imagesUrl.push(image.attributes.url);
    });
    setImages(imagesUrl);
  };

  if (isLoading || !property) {
    return <MySpinner />;
  }
  return (
    <section>
      <div className="container mx-auto min-h-[800px] pt-20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{property.tipoPropiedad}</h2>
            <h3 className="text-lg mb-4">
              {property.provincia +
                " - " +
                property.canton +
                " - " +
                property.distrito}
            </h3>
          </div>
          <div className="mb-4 lg:mb-0 flex gap-x-2 text-sm">
            <div className="bg-green-500 text-black px-3 rounded-full">
              {property.tipoPropiedad}
            </div>
            <div className="bg-blue-500 text-black px-3 rounded-full">
              {property.provincia}
            </div>
          </div>
          <div className="text-3xl font-semibold text-blue-600">
            $ {property.precio}
          </div>
        </div>
        <div className="flex flex-col items-start gap-8 lg:flex-row">
          <div className="max-w-[768px]">
            <div className="mb-8">
              {images.length !== 0 ? (
                <Slideshow slideImages={images} />
              ) : (
                <span></span>
              )}
              <img
                src={
                  images.length !== 0 ? (
                    <Slideshow slideImages={images} />
                  ) : (
                    no_image
                  )
                }
                alt=""
              />
            </div>
            <div className="flex gap-x-6 text-blue-700 mb-6">
              <div className="flex gap-x-2 items-center">
                <BiBed className="text-2xl" />
                <div>{property.habitaciones}</div>
              </div>
              <div className="flex gap-x-2 items-center">
                <BiBath className="text-2xl " />
                <div>{property.banos}</div>
              </div>
              <div className="flex gap-x-2 items-center">
                <BiArea className="text-2xl " />
                <div>{property.footage} m2</div>
              </div>
            </div>
            <div>{property.description}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetailsAdmin;
