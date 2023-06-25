import PropertiesPending from "./properties-pending";

const PropertyListPending = () => {
  return (
    <div className="overflow-x-auto mx-8 shadow-md sm:rounded-lg">
      <table className="w-full mt-1 text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"></thead>
        <tbody>
          <PropertiesPending />
        </tbody>
      </table>
    </div>
  );
};

export default PropertyListPending;
