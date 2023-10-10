import {
  campoRequerido,
  validarEmail,
  validarRepetirContrasena,
  generalValidation,
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
let campoNombreApellido = document.getElementById("NombreApellido");
let campoAsunto = document.getElementById("Asunto");
let campoObservaciones = document.getElementById("Observaciones");
let inquiryForm = document.getElementById("inquiryForm");

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
  campoFormLogin.addEventListener("submit", validarRegistro);
}

if (FormInicioSesion) {
  FormInicioSesion.addEventListener("submit", InicioSesion);
}

campoNombreApellido.addEventListener("blur", () => {
  campoRequerido(campoNombreApellido);
});

campoAsunto.addEventListener("blur", () => {
  campoRequerido(campoAsunto);
});

campoObservaciones.addEventListener("blur", () => {
  campoRequerido(campoObservaciones);
});

inquiryForm.addEventListener("submit", generalValidation);

function crearUsuario() {
  let usuarioNuevo = new Usuario(
    campoNombre.value,
    campoApellido.value,
    campoEmail.value,
    campoContrasena.value
  );
  listaUsuario.push(usuarioNuevo);
  clearForm();
  guadarLocalStorage();
}

function clearForm() {
  campoFormLogin.reset();
  campoNombre.className = "form-control";
  campoApellido.className = "form-control";
  campoEmail.className = "form-control";
  campoContrasena.className = "form-control";
  campoRepetirContrasena.className = "form-control";
  campoCheckboxRobot.className = "form-check";
  usuarioExistente = false;
}

function guadarLocalStorage() {
  localStorage.setItem("Usuarios", JSON.stringify(listaUsuario));
}

function validarRegistro(e) {
  e.preventDefault();
  var nombre = document.getElementById("Nombre").value;
  var email = document.getElementById("Email").value;
  var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  var usuarioExistente = usuarios.find(function (usuario) {
    return usuario.email === email && usuario.nombre === nombre;
  });
  if (usuarioExistente) {
    alert("El usuario con este correo electrónico ya está registrado.");
    return false;
  }
  crearUsuario();
  guadarLocalStorage();
  clearForm();
  Swal.fire("Bien Hecho!", "Creaste Correctamente tu usuario!", "success");
  return true;
}

function InicioSesion(e) {
  e.preventDefault();
  // Obtiene el valor del campo de correo electrónico del formulario de inicio de sesión
  var emailInicioSesion = document.getElementById("UsuarioLog").value;
  var contrasenaInisionSesion = document.getElementById("ContrasenaLog").value;
  var usuarioAdmin = "admin123@gmail";
  var contrasenaAdmin = "123";
  // Obtiene los usuarios del localStorage
  var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Valida si el usuario es un administrador
  if (
    emailInicioSesion === usuarioAdmin &&
    contrasenaInisionSesion === contrasenaAdmin
  ) {
    // Redirige al administrador a admin.html
    window.location.href = "admin.html";
  } else {
    // Valida si el usuario existe en el localStorage
    var usuarioExistente = usuarios.find(function (usuario) {
      return usuario.email === emailInicioSesion;
    });

    // Si el usuario existe, redirige a index.html
    // Si no existe, muestra una alerta con SweetAlert
    if (usuarioExistente) {
      window.location.href = "index.html";
    } else {
      // Muestra una alerta con SweetAlert indicando que el usuario no existe
      alert("El usuario con este correo electrónico no está registrado.");

    }
  }
}
