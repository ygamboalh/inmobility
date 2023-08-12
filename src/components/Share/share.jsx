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

import { BiUserCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const Share = (url) => {
  const pdfUrl = url.pdfUrl;
  const adviser = url.adviser;
  console.log("url y adiviser", adviser);
  const navigate = useNavigate();
  return (
    <div className="flex flex-row items-center align-middle">
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
      <div className="mt-2">
        <button
          type="button"
          onClick={() => {
            navigate("/home/contact", { state: adviser });
          }}
          className="w-[30px] h-[30px] rounded-full bg-blue-500"
        >
          <BiUserCircle size={30} color="white" />
        </button>
      </div>
    </div>
  );
};

export default Share;
