import axios from "axios";
import AxiosInstance from "../../api/AxiosInstance";
import { API } from "../../constant";

function enviarCorreo(destinatario, template) {
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
          templateId: template,
          params: {
            nombre: "Nombre del destinatario",
          },
          sender: {
            name: "Sistema CIC",
            email: "alianzaincr@gmail.com",
          },
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
export default enviarCorreo;
