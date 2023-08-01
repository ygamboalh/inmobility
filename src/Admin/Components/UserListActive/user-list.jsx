import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { API } from "../../../constant";
import { findAndDeletePortfolios, getToken } from "../../../utils/helpers";
import MySpinner from "../../../components/Spinner/spinner";
import { getAllUsers } from "../../../api/usersApi";
import axios from "axios";
import { useEffect } from "react";

const UsersList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [pending, setPending] = React.useState(true);
  const [portfolios, setPortfolios] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading: loadingUsers } = useQuery("users", getAllUsers, {
    onSuccess: (data) => {
      const foundedUsers = [];
      data.forEach((user) => {
        if (user.active === "Activo" || user.active === "Asesor verificado") {
          foundedUsers.push(user);
        }
      });
      setRecords(foundedUsers);
      console.log(foundedUsers);
      setFilterRecords(foundedUsers);
      setPending(false);
    },
  });

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
          queryClient
            .invalidateQueries(["users"])
            .then((resultado) =>
              console.log(
                "se borro el usuario, esperando borrar portafolios",
                resultado
              )
            );
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

  const paginationComponentOptions = {
    rowsPerPageText: "Usuarios por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  const column = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "60px",
      id: "id",
    },
    {
      name: "Foto",
      width: "90px",
      cell: (row) =>
        row.photo ? (
          <div className="rounded-full border-black border">
            <div
              style={{
                height: "30px",
                width: "30px",
                borderRadius: "100px",
                backgroundSize: "cover",
                backgroundImage: `url(https://siccic.com/backend${row.photo?.url})`,
              }}
            />
          </div>
        ) : (
          <img
            src={`https://siccic.com/backend/uploads/small_userinfo_dac703068b.png`}
            alt=""
            width="30px"
            height="30px"
            className="rounded-full border-black border"
          />
        ),
    },
    {
      name: "Nombre",
      id: "username",
      selector: (row) => row.username,
      sortable: true,
      width: "200px",
    },
    {
      name: "Email",
      id: "email",
      selector: (row) => row.email,
      sortable: true,
      width: "200px",
    },
    {
      name: "Empresa",
      id: "empresa",
      selector: (row) => row.company,
      sortable: true,
      width: "180px",
    },
    {
      name: "Dirección",
      id: "address",
      selector: (row) => row.address,
      sortable: true,
      width: "200px",
    },
    {
      name: "Celular",
      id: "celular",
      selector: (row) => row.mobile,
      sortable: true,
      width: "150px",
    },
    {
      cell: (row) => (
        <button
          className="editButton"
          onClick={() => navigate(`/admin/users/insert-user/${row.id}`)}
        >
          Editar
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      id: "edit",
      width: "60px",
    },
    {
      cell: (row) => (
        <button className="deleteButton" onClick={() => DeleteUser(row.id)}>
          Eliminar
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      id: "delete",
      width: "80px",
    },
  ];
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
    <div className=" w-full">
      <DataTable
        columns={column}
        data={records}
        pagination
        selectableRows
        fixedHeader
        fixedHeaderScrollHeight="550px"
        selectableRowsHighlight
        title="Asesores verificados"
        progressPending={pending}
        highlightOnHover
        progressComponent={<MySpinner />}
        paginationComponentOptions={paginationComponentOptions}
        subHeader
        subHeaderComponent={
          <div className="relative w-full my-1 px-2">
            <input
              type="text"
              onChange={handleFilter}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Filtrar por correo electrónico"
            />
          </div>
        }
      ></DataTable>
    </div>
  );
};

export default UsersList;
