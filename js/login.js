import {
  CampoRequerido,
  validarEmail,
  ValidarRepetirContrasena,
  ValidacionGeneral,
} from "./validations.js";

let CampoNombre = document.getElementById("Nombre");
let CampoApellido = document.getElementById("Apellido");
let CampoEmail = document.getElementById("Email");
let CampoContrasena = document.getElementById("Contrasena");
let CampoRepetirContrasena = document.getElementById("Repetircontrasena");
let CampoCheckboxRobot = document.getElementById("checkboxRobot");
let CampoFormLogin = document.getElementById("FormLogin");

CampoNombre.addEventListener("blur", () => {
  console.log("aqui estoy");
  CampoRequerido(CampoNombre);
});

CampoApellido.addEventListener("blur", () => {
  console.log("aqui estoy2");
  CampoRequerido(CampoApellido);
});

CampoEmail.addEventListener("blur", () => {
  console.log("aqui estoy3");
  validarEmail(CampoEmail);
});

CampoContrasena.addEventListener("blur", () => {
  console.log("aqui estoy3");
  CampoRequerido(CampoContrasena);
});

CampoRepetirContrasena.addEventListener("blur", () => {
  console.log("aqui estoy5");
  CampoRequerido(CampoRepetirContrasena);
});

// CampoCheckboxRobot.addEventListener("click", () => {
//   console.log("aqui estoy6");
//   CampoRequerido(CampoCheckboxRobot);
// });

CampoFormLogin.addEventListener("submit", ValidacionGeneral);
