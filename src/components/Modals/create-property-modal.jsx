import { useState } from "react";
import { categories } from "../../BD/bd";

const CreatePropertyModal = ({ isVisible, onDataReceived }) => {
  const [close, setClose] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const closeModal = () => {
    console.log("opcion seleccionada", selectedOption);
    onDataReceived({ close: false });
  };
  const sendDataToParent = () => {
    console.log("opcion seleccionada", selectedOption);
    if (selectedOption === "") {
      return;
    } else {
      onDataReceived({ close: false, selected: selectedOption });
    }
  };
  const handleOptionSelectChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedOption(selectedOption);
  };
  //console.log("categoria seleccionada", selectedOption);
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
            <select
              required
              name="categories"
              value={selectedOption}
              //disabled={category}
              //defaultValue={category}
              onChange={handleOptionSelectChange}
              className="categories m-2 w-full max-[500px]:mx-0  md:w-fit lg:mx-80"
            >
              <option value="" label="">
                {"Seleccione la categoría"}
              </option>
              {categories.map((item) => (
                <option value={item.value} label={item.label}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>
          <hr />
          <div className="flex justify-center mt-2">
            <button
              onClick={sendDataToParent}
              className="bg-blue-700 px-3 py-1 my-3 rounded-md text-white text-lg"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePropertyModal;
