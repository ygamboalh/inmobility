import Navbar from "../NavBar/NavBar";
import LinkListActive from "./link-list-active";

const Links = () => {
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
