import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

import { useNavigate } from "react-router-dom";
import { BiCopyAlt } from "react-icons/bi";
import MySpinner from "../Spinner/spinner";
const ShareAdviser = (url) => {
  const pdfUrl = url.pdfUrl;
  const adviser = url.adviser;
  const navigate = useNavigate();
  function copyToPaper(text) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="flex flex-row max-[500px]:flex-col items-center align-middle my-2">
      <div className="flex flex-row align-middle">
        <EmailShareButton url={pdfUrl}>
          <EmailIcon round={true} size={30}></EmailIcon>
        </EmailShareButton>
        <FacebookShareButton url={pdfUrl}>
          <FacebookIcon
            size={30}
            logoFillColor="blue"
            round={true}
          ></FacebookIcon>
        </FacebookShareButton>
        <WhatsappShareButton url={pdfUrl}>
          <WhatsappIcon size={30} round={true}></WhatsappIcon>
        </WhatsappShareButton>
        <FacebookMessengerShareButton url={pdfUrl}>
          <FacebookMessengerIcon size={30} round={true}></FacebookMessengerIcon>
        </FacebookMessengerShareButton>
        <TwitterShareButton url={pdfUrl}>
          <TwitterIcon size={30} round={true}></TwitterIcon>
        </TwitterShareButton>
        <TelegramShareButton url={pdfUrl}>
          <TelegramIcon size={30} round={true}></TelegramIcon>
        </TelegramShareButton>
      </div>
      <div className="align-middle flex ml-1 max-[500px]:mt-2 flex-col">
        <button
          onClick={() => {
            copyToPaper(pdfUrl);
          }}
          type="button"
          class="px-3 py-1 text-sm font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-2xl hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          <BiCopyAlt size={25} />
          <span className="">Enlace para compartir</span>
        </button>
      </div>
    </div>
  );
};

export default ShareAdviser;
