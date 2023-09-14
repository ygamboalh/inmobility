import { useState } from "react";
import { categories } from "../../BD/bd";

const CreatePortfolioModal = ({ isVisible, onDataReceived }) => {
  const [close, setClose] = useState(false);
  const [clienteComprador, setClienteComprador] = useState("");
  const [correoCliente, setCorreoCliente] = useState("");

  const closeModal = () => {
    onDataReceived({ close: false });
  };
  const sendDataToParent = () => {
    if (clienteComprador === "" || correoCliente === "") {
      return;
    } else {
      onDataReceived({
        close: false,
        data: {
          clienteComprador: clienteComprador,
          correoCliente: correoCliente,
        },
      });
    }
  };
  const handleClienteComprador = (event) => {
    const selectedOption = event.target.value;
    setClienteComprador(selectedOption);
  };
  const handleCorreoCliente = (event) => {
    const selectedOption = event.target.value;
    setCorreoCliente(selectedOption);
  };
  if (!isVisible) return null;
  return (
    <div className="fixed z-10 inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="flex flex-col mx-4">
        <button
          onClick={closeModal}
          className="place-self-end bg-blue-700 text-white w-16 h-7 rounded-md"
        >
          X
        </button>
        <div className="bg-white p-4 max-w-[500px]  rounded-md">
          <div className="flex justify-center  flex-row content-center items-center">
            <input
              type="text"
              name="clienteComprador"
              required
              className="categories m-2 w-full max-[500px]:mx-0  md:w-fit lg:mx-80"
              placeholder="Cliente comprador"
              onChange={handleClienteComprador}
            />
          </div>
          <div className="flex justify-center  flex-row content-center items-center">
            <input
              type="email"
              name="correoCliente"
              required
              className="categories m-2 w-full max-[500px]:mx-0  md:w-fit lg:mx-80"
              placeholder="Correo electrónico"
              onChange={handleCorreoCliente}
            />
          </div>
          <hr />
          <div className="flex justify-center mt-2">
            <button
              onClick={sendDataToParent}
              className="bg-blue-700 px-3 py-1 my-3 rounded-md text-white text-lg"
            >
              Iniciar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePortfolioModal;
