import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import axios from "axios";
import { message } from "antd";
import * as Yup from "yup";

import { API } from "../../constant";
import { QueriesByFilters } from "../../utils/QueriesByFilters";
import MySpinner from "../Spinner/spinner";
import MetaData from "../Metadata/metadata";

const VisiterSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      uniqueId: "",
    },
    onSubmit: (values) => {
      setIsLoading(true);

      const urlPortion = makeQueries(values);
      let urlFinal = "";
      urlPortion.map((value) => {
        urlFinal += value.name;
      });
      if (urlFinal.length !== 0) {
        const url = `${API}properties?filters[uniqueId][$eq]=${values?.uniqueId}`;

        const busqueda = axios
          .get(url, {})
          .then((response) => {
            const propertyList = response.data.data;
            if (propertyList.length !== 0) {
              navigate("/home/search/search-results", {
                state: {
                  propertyList,
                },
              });
            } else {
              message.info("No se encontraron resultados");
              return;
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        message.error(`Debe introducir algún criterio de búsqueda`);
        setIsLoading(false);
        return;
      }
    },
    validationSchema: Yup.object({
      uniqueId: Yup.string().min(3, "*").max(40, "*"),
    }),
  });
  const makeQueries = (values) => {
    const valuesFiltered = QueriesByFilters(values);
    return valuesFiltered;
  };

  if (isLoading) {
    return <MySpinner />;
  }

  return (
    <section>
      <MetaData
        title="Buscar por identificador"
        description="Buscar por identificador"
      />
      <div className="flex justify-center mt-4">
        <span className="font-semibold">
          Realizar búsqueda por código de propiedad
        </span>
      </div>
      <div className="flex justify-center flex-col mt-4">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="flex justify-center flex-col">
            <div className="flex justify-center">
              <input
                type="text"
                maxLength={40}
                onChange={handleChange}
                name="uniqueId"
                id="uniqueId"
                placeholder="Código de propiedad"
                className="w-80 border shadow rounded-md border-gray-300 mb-2"
              />

              {errors.uniqueId && touched.uniqueId ? (
                <div className="errordiv text-xs">{errors.uniqueId}</div>
              ) : null}
            </div>
            <hr className="w-full" />
            <div className="flex justify-center">
              <button className="bg-blue-700 rounded-md text-white mt-3 px-4 py-2 w-80 hover:bg-blue-500">
                Buscar
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default VisiterSearch;
