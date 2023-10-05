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
  ValidarRepetirContrasena(CampoRepetirContrasena);
});

CampoFormLogin.addEventListener("submit",CreateUser);

function CreateUser(e) {
  e.preventDefault();
  if (
    ValidacionGeneral(
      CampoNombre,
      CampoApellido,
      CampoEmail,
      CampoContrasena,
      CampoRepetirContrasena
    )
  ) {
    Swal.fire("Bien Hecho!", "Creaste tu usuario con exito!", "success");
    ClearForm();
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Verifica el usuario o contraseña ya que no coinciden una u otra !",
    });
  }
}

function ClearForm() {
  CampoFormLogin.reset();
  CampoNombre.className = "form-control";
  CampoApellido.className = "form-control";
  CampoEmail.className = "form-control";
  CampoContrasena.className = "form-control";
  CampoRepetirContrasena.className = "form-control";
  CampoCheckboxRobot.className = "form-check";
}
