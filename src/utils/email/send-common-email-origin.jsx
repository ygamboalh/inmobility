import axios from "axios";
import { API } from "../../constant";
import AxiosInstance from "../../api/AxiosInstance";

function enviarCorreoComunOrigen(destinatario, body, asunto) {
  let token = "";
  const result = AxiosInstance.get(
    `${API}tokens/?filters[type][$eq]=email`
  ).then((res) => {
    token = res?.data?.data[0].attributes.token;
    axios
      .post(
        "https://api.brevo.com/v3/smtp/email",
        {
          to: [{ email: destinatario }],
          sender: {
            name: "Sistema CIC",
            email: "alianzaincr@gmail.com",
          },
          subject: asunto,
          htmlContent: `<html><head></head><body><p>Estimado,</p>${body} </p>
        
        </body></html>`,
        },
        {
          headers: {
            "api-key": token,
          },
        }
      )
      .then((response) => {
        console.log("Correo electrónico enviado con éxito", response);
      })
      .catch((error) => {
        console.error("Error al enviar el correo electrónico", error);
      });
  });
}
export default enviarCorreoComunOrigen;
