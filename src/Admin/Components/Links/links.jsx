import MetaData from "../../../components/Metadata/metadata";
import Navbar from "../NavBar/NavBar";
import LinkListActive from "./link-list-active";

const Links = () => {
  return (
    <div>
      <MetaData title="Lista de enlaces" description="Lista de enlaces" />
      <div>
        <hr />
        <LinkListActive />
      </div>
    </div>
  );
};

export default Links;
