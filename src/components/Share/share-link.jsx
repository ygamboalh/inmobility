import { useQuery } from "react-query";

import { BiCopyAlt } from "react-icons/bi";

import { authUserData } from "../../api/usersApi";
import { message } from "antd";
const ShareLink = (url) => {
  const pdfUrl = url.pdfUrl;
  const { data: userData } = useQuery("profile", authUserData);
  function copyToPaper(text) {
    navigator.clipboard.writeText(text);
    message.info("Enlace copiado");
  }

  return (
    <div className="flex flex-row max-[500px]:flex-col items-center align-middle my-1">
      <div className="align-middle flex ml-1 max-[500px]:mt-2 flex-row">
        <div>
          <button
            onClick={() => {
              copyToPaper(pdfUrl);
            }}
            type="button"
            className="px-3 py-1 text-sm font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-2xl hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            <BiCopyAlt size={20} />
            <span className="">Enlace para compartir</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareLink;
