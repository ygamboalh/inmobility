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
import no_image from "../../assets/images/no_image_default.jpg";
const Share = (pdfUrl) => {
  return (
    <div>
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
  );
};

export default Share;
