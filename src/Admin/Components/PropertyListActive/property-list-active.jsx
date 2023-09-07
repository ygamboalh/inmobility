import MetaData from "../../../components/Metadata/metadata";
import PropertiesList from "./properties";

const PropertyListActive = () => {
  return (
    <div className="z-0 overflow-x-auto mx-2 shadow-md sm:rounded-lg">
      <MetaData title="Propiedades activas" description="Propiedades activas" />
      <table className="w-full mt-1 text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"></thead>
        <tbody>
          <PropertiesList />
        </tbody>
      </table>
    </div>
  );
};

export default PropertyListActive;
