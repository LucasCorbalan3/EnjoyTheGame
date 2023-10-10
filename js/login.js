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
  // Lógica de validación para el formulario de registro
  // Puedes implementar validaciones adicionales según tus necesidades

  // Obtiene los valores de los campos del formulario de registro
  var nombre = document.getElementById("Nombre").value;
  var email = document.getElementById("Email").value;
  // Valida si el usuario ya existe en el localStorage
  var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  var usuarioExistente = usuarios.find(function (usuario) {
    return usuario.email === email && usuario.nombre === nombre;
  });
  // Si el usuario ya existe, muestra una alerta y previene el envío del formulario
  if (usuarioExistente) {
    alert("El usuario con este correo electrónico ya está registrado.");
    return false;
  }

  // Si el usuario no existe, agrega el nuevo usuario al localStorage
  crearUsuario();
  guadarLocalStorage();
  clearForm();
  Swal.fire("Bien Hecho!", "Creaste Correctamente tu usuario!", "success");
  // Continúa con el envío del formulario
  return true;
}


