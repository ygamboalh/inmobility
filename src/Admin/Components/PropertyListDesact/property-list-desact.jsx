import MetaData from "../../../components/Metadata/metadata";
import PropertiesDesact from "../PropertyListDesact/properties-desact";

const PropertyListDesact = () => {
  return (
    <div className="z-0 overflow-x-auto mx-2 shadow-md sm:rounded-lg">
      <MetaData
        title="Propiedades desactivadas"
        description="Propiedades desactivadas"
      />
      <table className="w-full mt-1 text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"></thead>
        <tbody>
          <PropertiesDesact />
        </tbody>
      </table>
    </div>
  );
};

export default PropertyListDesact;
