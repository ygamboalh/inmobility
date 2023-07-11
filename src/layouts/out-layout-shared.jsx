import { Outlet } from "react-router-dom";

const ExtraLayoutShared = () => {
  return (
    <div className="h-screen mt-3 -mb-32">
      <Outlet />
    </div>
  );
};

export default ExtraLayoutShared;
