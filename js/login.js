import {
  CampoRequerido,
  validarEmail,
  ValidarRepetirContrasena,
  ValidacionGeneral,
} from "./validations.js";

import { Usuario } from "./UsuarioClass.js";

let CampoNombre = document.getElementById("Nombre");
let CampoApellido = document.getElementById("Apellido");
let CampoEmail = document.getElementById("Email");
let CampoContrasena = document.getElementById("Contrasena");
let CampoRepetirContrasena = document.getElementById("Repetircontrasena");
let CampoCheckboxRobot = document.getElementById("checkboxRobot");
let CampoFormLogin = document.getElementById("FormLogin");

let UsuarioExistente = false;
let ListaUsuario = [];

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

CampoFormLogin.addEventListener("submit", RegisterUser);

function RegisterUser(e) {
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
    if (!UsuarioExistente) {
      CrearUsuario();
      ClearForm();
    }
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

function CrearUsuario() {
  let UsuarioNuevo = new Usuario(
    CampoNombre.value,
    CampoApellido.value,
    CampoEmail.value,
    CampoContrasena.value
  );
  ListaUsuario.push(UsuarioNuevo);
  guadarLocalStorage();
  Swal.fire("Bien Hecho!", "Creaste Correctamente tu usuario!", "success");
}

function guadarLocalStorage() {
  localStorage.setItem("keynuevo", JSON.stringify(ListaUsuario));
}
