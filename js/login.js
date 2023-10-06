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
let CampoFormLogin = document.getElementById("FormLogin");
let UserExistente = false;

CampoNombre.addEventListener("blur", () => {
  CampoRequerido(CampoNombre);
});

CampoApellido.addEventListener("blur", () => {
  CampoRequerido(CampoApellido);
});

CampoEmail.addEventListener("blur", () => {
  validarEmail(CampoEmail);
});

CampoContrasena.addEventListener("blur", () => {
  CampoRequerido(CampoContrasena);
});

CampoRepetirContrasena.addEventListener("blur", () => {
  ValidarRepetirContrasena(CampoRepetirContrasena);
});

CampoFormLogin.addEventListener("submit", SaveUser);

function SaveUser(e) {
  e.PreventDefaut();
  if (
    ValidacionGeneral(
      CampoNombre,
      CampoApellido,
      CampoEmail,
      CampoContrasena,
      CampoRepetirContrasena
    )
  ) {
    if (!UserExistente) {
      CreateUsuario();
    } else {
    }
  }
}
