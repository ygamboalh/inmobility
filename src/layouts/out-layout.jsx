import { Outlet } from "react-router-dom";

const ExtraLayout = () => {
    return (
        <div className="div-welcome">
            <Outlet/> 
        </div>
    )
};

export default ExtraLayout;