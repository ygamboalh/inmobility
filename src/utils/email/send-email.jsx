import axios from "axios";

function enviarCorreo(destinatario, template) {
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
export default enviarCorreo;
