import MetaData from "../Metadata/metadata";

export const AdviserCard = ({ children }) => {
  return (
    <div className="border flex md:grid-col-2 py-4 lg:my-0 justify-center align-middle lg:p-4 lg:w-full shadow-1 hover:shadow-2xl rounded-lg hover:bg-gray-400 bg-gray-300">
      <MetaData title="Asesor verificado" description="Asesor verificado" />
      {children}
    </div>
  );
};
