import {
  validarEmail,
  campoRequerido,
  generalValidation,
} from "./validations.js";

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
