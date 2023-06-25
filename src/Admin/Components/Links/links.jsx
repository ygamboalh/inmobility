import { useState } from "react";
import Navbar from "../NavBar/NavBar";
import UserListActive from "../UserListActive/user-list-active";
import { useNavigate } from "react-router-dom";
import UserListPending from "../UserListPending/user-list-pending";
import UserListDesact from "../UserListDesact/user-list-desact";
import LinkListActive from "./link-list-active";

const Links = () => {
  const [activeButton, setActiveButton] = useState(1);
  const navigate = useNavigate();
  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <hr />
        <div className="mt-24 mx-8 mb-2">
          <div className="inset-y-0 left-0 flex items-center pl-3"></div>
        </div>
        <LinkListActive />
      </div>
    </div>
  );
};

export default Links;
