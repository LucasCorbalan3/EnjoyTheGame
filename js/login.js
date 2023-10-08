import {
  campoRequerido,
  validarEmail,
  validarRepetirContrasena,
  validacionGeneral,
} from "./validations.js";

import { Usuario } from "./UsuarioClass.js";

let campoNombre = document.getElementById("Nombre");
let campoApellido = document.getElementById("Apellido");
let campoEmail = document.getElementById("Email");
let campoContrasena = document.getElementById("Contrasena");
let campoRepetirContrasena = document.getElementById("Repetircontrasena");
let campoCheckboxRobot = document.getElementById("checkboxRobot");
let campoFormLogin = document.getElementById("FormLogin");

let FormInicioSesion = document.getElementById("FormInicioSesion");

let usuarioExistente = false;

let listaUsuario = JSON.parse(localStorage.getItem("Usuarios")) || [];

if (campoNombre) {
  campoNombre.addEventListener("blur", () => {
    campoRequerido(campoNombre);
  });
}
if (campoApellido) {
  campoApellido.addEventListener("blur", () => {
    campoRequerido(campoApellido);
  });
}
if (campoEmail) {
  campoEmail.addEventListener("blur", () => {
    validarEmail(campoEmail);
  });
}
if (campoContrasena) {
  campoContrasena.addEventListener("blur", () => {
    campoRequerido(campoContrasena);
  });
}
if (campoRepetirContrasena) {
  campoRepetirContrasena.addEventListener("blur", () => {
    validarRepetirContrasena(campoRepetirContrasena);
  });
}

if (campoFormLogin) {
  campoFormLogin.addEventListener("submit", RegisterUser);
}

if (FormInicioSesion) {
  FormInicioSesion.addEventListener("submit", InicioSesion);
}

function RegisterUser(e) {
  e.preventDefault();
  if (
    validacionGeneral(
      campoNombre,
      campoApellido,
      campoEmail,
      campoContrasena,
      campoRepetirContrasena
    )
  ) {
    if (!usuarioExistente) {
      clearForm();
      crearUsuario();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Verifica el usuario o contraseña ya que no coinciden una u otra !",
      });
    }
  }
}

function clearForm() {
  campoFormLogin.reset();
  campoNombre.className = "form-control";
  campoApellido.className = "form-control";
  campoEmail.className = "form-control";
  campoContrasena.className = "form-control";
  campoRepetirContrasena.className = "form-control";
  campoCheckboxRobot.className = "form-check";
}

function crearUsuario() {
  let usuarioNuevo = new Usuario(
    campoNombre.value,
    campoApellido.value,
    campoEmail.value,
    campoContrasena.value
  );
  listaUsuario.push(usuarioNuevo);
  guadarLocalStorage();
  Swal.fire("Bien Hecho!", "Creaste Correctamente tu usuario!", "success");
}

function guadarLocalStorage() {
  localStorage.setItem("Usuarios", JSON.stringify(listaUsuario));
}

function InicioSesion(e) {
  const Usuario = document.getElementById("UsuarioLog").value;
  const contrasena = document.getElementById("ContrasenaLog").value;
  const usuarioExistente = listaUsuarios.find(
    (u) => u.email === Usuario.email.value
  );
  if (!usuarioExistente || usuarioExistente.contrasena !== usuariocontrasena) {
    e.preventDefault(); // Evita que se envíe el formulario
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El usuario o contraseña no conciden con un usuario registrado!",
    });
  }
}
