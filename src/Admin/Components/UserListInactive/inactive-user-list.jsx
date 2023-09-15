import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  BiAward,
  BiBuilding,
  BiMailSend,
  BiMap,
  BiPhone,
  BiSearch,
  BiUser,
} from "react-icons/bi";

import { API } from "../../../constant";
import { findAndDeletePortfolios, getToken } from "../../../utils/helpers";
import MySpinner from "../../../components/Spinner/spinner";
import { getAllUsers } from "../../../api/usersApi";
import MetaData from "../../../components/Metadata/metadata";

const UserListInactive = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [pending, setPending] = React.useState(true);
  const [filterRecords, setFilterRecords] = useState([]);
  const [visibleRecords, setVisibleRecords] = useState([]);
  const [loadCount, setLoadCount] = useState(10);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading: loadingUsers } = useQuery("users", getAllUsers, {
    onSuccess: (data) => {
      const foundedUsers = [];
      data.forEach((user) => {
        if (user.active === "Asesor verificado inactivo") {
          foundedUsers.push(user);
        }
      });
      setRecords(foundedUsers);
      setFilterRecords(foundedUsers);
      setPending(false);
    },
  });
  useEffect(() => {
    setVisibleRecords(records.slice(0, loadCount));
  }, [records, loadCount]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight
    ) {
      setLoadCount((prevCount) => prevCount + 10);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  if (loadingUsers || isLoading) {
    return <MySpinner />;
  }

  const DeleteUser = async (id) => {
    const MySwal = withReactContent(Swal);
    setIsLoading(true);
    MySwal.fire({
      title: "¿Desea eliminar el usuario y sus portafolios?",
      showDenyButton: true,
      confirmButtonText: "Sí, eliminar",
      confirmButtonColor: "#1863e4",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        const response = fetch(`${API}users/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }).then((result) => {
          queryClient.invalidateQueries(["users"]).then((resultado) => {});
          findAndDeletePortfolios(id);
        });
        if (result) {
          Swal.fire("Usuario eliminado!", "", "success");
        } else {
          Swal.fire("El usuario no fue eliminado", "", "error");
        }
      }
    });

    setIsLoading(false);
  };

  const handleFilter = (event) => {
    const searchData = filterRecords.filter((row) =>
      row.username.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(searchData);
  };
  if (isLoading || !records) {
    return <MySpinner />;
  }

  return (
    <div className="w-full">
      <MetaData
        title="Asesor verificado inactivo"
        description="Asesor verificado inactivo"
      />
      <div className="w-full px-1 my-1">
        <div className="w-full px-1 my-1">
          <div className="relative w-full flex justify-center">
            <div className="absolute max-[500px]:hidden inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <BiSearch size={25} />
            </div>
            <input
              onChange={handleFilter}
              placeholder="Filtrar por nombre de usuario"
              type="text"
              className="block max-[500px]:w-80 max-[500px]:-pl-4 w-full pr-10 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      {visibleRecords?.length ? (
        <div className="flex w-full justify-center flex-wrap mb-4">
          {visibleRecords?.map((row) => (
            <div className="w-[340px] my-2 p-4 mx-1 bg-white border border-gray-300 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold leading-none text-gray-900 ">
                  Detalles del usuario
                </span>
                {row.active === "Asesor verificado activo" ? (
                  <svg
                    className="flex-shrink-0 w-8 h-8 text-blue-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                ) : (
                  <svg
                    className="flex-shrink-0 w-8 h-8 text-gray-400 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                )}
              </div>
              <hr />
              <div className="flow-root w-full flex-wrap">
                <ul className="divide-y divide-gray-200">
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center mb-2 -mt-4 bg-red-400 w-fit px-2 py-0.5 rounded-md flex-row">
                          <p className="text-sm font-medium  text-gray-900 truncate">
                            {row?.active}
                          </p>
                        </div>
                        {row?.photo ? (
                          <div className="rounded-full border-black">
                            <div
                              style={{
                                height: "100px",
                                width: "100px",
                                borderRadius: "100px",
                                backgroundSize: "cover",
                                backgroundImage: `url(https://backend.siccic.com${row.photo?.url})`,
                              }}
                            />
                          </div>
                        ) : (
                          <img
                            src={`https://backend.siccic.com/uploads/small_userinfo_dac703068b.png`}
                            alt=""
                            width="100px"
                            height="100px"
                            className="rounded-full border-black border"
                          />
                        )}
                        <hr className="mt-1" />
                        <div className="flex items-center ml-0.5 mt-1 mb-2 flex-row">
                          <BiUser size={20} />
                          <p className="text-sm mt-1 text-gray-900 truncate">
                            {row?.username}
                          </p>
                        </div>
                        <hr />
                        <div className="flex items-center ml-0.5 mt-1 mb-2 flex-row">
                          <BiMailSend size={20} />
                          <p className="text-sm mt-0 text-gray-900 truncate">
                            {row?.email}
                          </p>
                        </div>
                        <hr />
                        <div className="flex my-2 flex-row">
                          <span className="ml-[2px]">
                            <BiBuilding size={20} />
                          </span>
                          <p className="text-sm text-gray-500 truncate">
                            {row?.company}
                          </p>
                        </div>
                        <hr />
                        <div className="flex my-2 flex-row">
                          <span className="ml-[2px]">
                            <BiMap size={20} />
                          </span>
                          <p className="text-sm text-gray-500 truncate">
                            {row?.address}
                          </p>
                        </div>
                        <hr />
                        <div className="flex my-2 flex-row">
                          <span className="ml-[2px]">
                            <BiPhone size={20} />
                          </span>
                          <p className="text-sm text-gray-500 truncate">
                            {row?.mobile}
                          </p>
                        </div>
                        <hr />
                        {row?.certifications ? (
                          <div className="flex my-2 flex-row">
                            <span className="ml-[2px]">
                              <BiAward size={20} />
                            </span>
                            <p className="text-sm text-gray-500 truncate">
                              {row?.certifications}
                            </p>
                          </div>
                        ) : null}
                        <hr />
                        <div className="flex my-2 flex-row">
                          <span className="ml-[2px]">
                            <BiPhone size={20} />
                          </span>
                          <p className="text-sm text-gray-500 truncate">
                            {row?.phone}
                          </p>
                        </div>
                        <hr />
                      </div>
                    </div>
                    <div className="flex items-center justify-center mt-2 -mb-4 space-x-4">
                      <div className="mt-2 flex justify-center flex-row">
                        <button
                          className="editButton mx-2"
                          onClick={() =>
                            navigate(`/admin/users/insert-user/${row.id}`)
                          }
                        >
                          Editar
                        </button>
                        <button
                          className="deleteButton"
                          onClick={() => DeleteUser(row.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <span className="flex justify-center mt-4">
          No hay asesores verificados inactivos
        </span>
      )}
    </div>
  );
};

export default UserListInactive;
