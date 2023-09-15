import MetaData from "../../../components/Metadata/metadata";
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
