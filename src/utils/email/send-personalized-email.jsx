import axios from "axios";
import AxiosInstance from "../../api/AxiosInstance";
import { API } from "../../constant";

function enviarCorreoPersonalizado(destinatario, property, body) {
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
          params: {
            nombre: "Nombre del destinatario",
          },
          sender: {
            name: "Sistema CIC",
            email: "alianzaincr@gmail.com",
          },
          subject: "Propiedad eliminada o editada",
          htmlContent: `<html><head></head><body><p>Estimado,</p>${body} </p>
        <hr/>
               Identificador de la propiedad: <label>${property.uniqueId}</label><br>
               Tipo de propiedad: <label>${property.tipoPropiedad}</label>
        </body></html>`,
        },
        {
          headers: {
            "api-key": token,
          },
        }
      )
      .then((response) => {
        console.log("sent");
      })
      .catch((error) => {
        console.error("error");
      });
  });
}
export default enviarCorreoPersonalizado;
