import axios from "axios";

function enviarCorreoPersonalizado(destinatario, property, body) {
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
          "api-key":
            "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",
        },
      }
    )
    .then((response) => {
      console.log("Correo electrónico enviado con éxito", response);
    })
    .catch((error) => {
      console.error("Error al enviar el correo electrónico", error);
    });
}
export default enviarCorreoPersonalizado;
