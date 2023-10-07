import { validarEmail, campoRequerido } from "./validations.js";

let campoNombreApellido = document.getElementById("NombreApellido");
let campoAsunto = document.getElementById("Asunto");
let campoEmail = document.getElementById("Email");
let campoObservaciones = document.getElementById("Observaciones");
let inquiryForm = document.getElementById("inquiryForm");

campoNombreApellido.addEventListener("blur", () => {
  campoRequerido(campoNombreApellido);
});

campoAsunto.addEventListener("blur", () => {
  campoRequerido(campoAsunto);
});

campoEmail.addEventListener("blur", () => {
  validarEmail(campoEmail);
});

campoObservaciones.addEventListener("blur", () => {
  campoRequerido(campoObservaciones);
});

inquiryForm.addEventListener("submit", generalValidation);

const generalValidation = (
  campoNombreApellido,
  campoAsunto,
  campoEmail,
  campoObservaciones
) => {
  let alert = document.querySelector("#mensajeAlert");
  Swal.fire(
    "Bien Hecho!",
    "Tu consulta fue enviada al administrador!",
    "success"
  );
  if (
    campoRequerido(campoNombreApellido) &&
    campoRequerido(campoAsunto) &&
    campoRequerido(campoObservaciones) &&
    validarEmail(campoEmail)
  ) {
  } else {
    alert.className = "alert alert-danger my-3";
    return false;
  }
};
