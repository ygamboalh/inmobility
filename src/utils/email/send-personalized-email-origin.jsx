import axios from "axios";

function enviarCorreoPersonalizadoOrigen(destinatario, body, origin) {
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
        subject: "Sobre visita",
        htmlContent: `<html><head></head><body><p>Estimado,</p>${body} </p>
        <hr/>
               Correo del visitante: <label>${origin}</label>
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
export default enviarCorreoPersonalizadoOrigen;
