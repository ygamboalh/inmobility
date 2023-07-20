import axios from "axios";

function enviarCorreoComunOrigen(destinatario, body, asunto) {
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
        subject: asunto,
        htmlContent: `<html><head></head><body><p>Estimado,</p>${body} </p>
        
        </body></html>`,
      },
      {
        headers: {
          "api-key": "",
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
export default enviarCorreoComunOrigen;
