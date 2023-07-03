import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getToken, getUser, getUserRole, userData } from "../../utils/helpers";
import { API, BEARER } from "../../constant";

const RequireRole = async () => {
  const navigate = useNavigate();
  const location = useLocation();
  const response = await fetch(`${API}/users/me?populate=role`, {
    method: "GET",
    headers: { Authorization: `${BEARER} ${getToken()}` },
  });
  const data = await response.json();

  return data.role.name === "SuperAdmin" ? (
    <Outlet />
  ) : (
    <navigate to="/" state={{ from: location }} replace />
  );
};
export default RequireRole;
