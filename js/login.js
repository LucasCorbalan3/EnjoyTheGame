import {
  campoRequerido,
  validarEmail,
  validarRepetirContrasena,
  generalValidation,
  cerrarSesion,
  usuarioisAdmin,
} from "./validations.js";

import { Usuario } from "./UsuarioClass.js";
cargarUsuario();

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
let usuarioLog = JSON.parse(localStorage.getItem("userLog")) || [];

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

if (campoFormLogin) {
  campoFormLogin.addEventListener("submit", RegisterUser);
}

if (FormInicioSesion) {
  FormInicioSesion.addEventListener("submit", InicioSesion);
}

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
function guardarUserLogLocalStorage() {
  localStorage.setItem("userLog", JSON.stringify({ usuarioLog }));
}

function validarRegistro(e) {
  e.preventDefault();
  var nombre = document.getElementById("Nombre").value;
  var email = document.getElementById("Email").value;
  var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  var usuarioExiste = usuarios.find(function (usuario) {
    return usuario.email === email && usuario.nombre === nombre;
  });
  if (usuarioExiste) {
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
  var emailInicioSesion = document.getElementById("UsuarioLog").value;
  var contrasenaInisionSesion = document.getElementById("ContrasenaLog").value;
  let listaUsuario = JSON.parse(localStorage.getItem("Usuarios")) || [];
  if (
    listaUsuario?.some(
      (usuario) =>
        usuario.email === emailInicioSesion &&
        listaUsuario?.some(
          (usuario) => usuario.contraseña === contrasenaInisionSesion
        )
    )
  ) {
    window.location.href = "admin.html";
    usuarioisAdmin();
  } else {
    alert(
      "El usuario no se encuentra registrado, porfavor registrate antes de iniciar sesion"
    );
  }
}

function cargarUsuario() {
  const datos = [
    {
      nombre: "Admin",
      apellido: "Admin",
      email: "admin@enjoythegame.com",
      contraseña: "admin2023",
      isAdmin: true,
    },
    {
      nombre: "lucas",
      apellido: "corbalan",
      email: "lucas.corbalan.23@gmail.com",
      contraseña: "luca2938",
      isAdmin: false,
    },
    {
      nombre: "nico",
      apellido: "torregrosa",
      email: "nico.torregrosa@gmail.com",
      contraseña: "nico8383",
      isAdmin: false,
    },
    {
      nombre: "gerardo",
      apellido: "rosales",
      email: "gerardo.rosales@gmail.com",
      contraseña: "gerardoasdqwd",
      isAdmin: false,
    },
  ];

  if (!localStorage.getItem("Usuarios")) {
    localStorage.setItem("Usuarios", JSON.stringify(datos));
    listaUsuario = datos;
  }
}
