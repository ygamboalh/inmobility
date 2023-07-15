import { Outlet } from "react-router-dom";
import Navbar from "../Admin/Components/NavBar/NavBar";

const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default AdminLayout;
