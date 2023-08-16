import MetaData from "../Metadata/metadata";

export const AdviserCard = ({ children }) => {
  return (
    <div className="border flex py-4 lg:my-0 justify-center align-middle w-full lg:p-4 shadow-1 hover:shadow-2xl rounded-lg hover:bg-gray-400 bg-gray-300">
      <MetaData title="Asesor verificado" description="Asesor verificado" />
      {children}
    </div>
  );
};
