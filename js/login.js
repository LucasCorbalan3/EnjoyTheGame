import {
  campoRequerido,
  validarEmail,
  validarRepetirContrasena,
  validacionGeneral,
  validarFormularioJuego,
  validarURL,
} from "./validations.js";

import { Usuario } from "./UsuarioClass.js";
import { Game } from "./gameClass.js";

let campoNombre = document.getElementById("Nombre");
let campoApellido = document.getElementById("Apellido");
let campoEmail = document.getElementById("Email");
let campoContrasena = document.getElementById("Contrasena");
let campoRepetirContrasena = document.getElementById("Repetircontrasena");
let campoCheckboxRobot = document.getElementById("checkboxRobot");
let campoFormLogin = document.getElementById("FormLogin");

let FormInicioSesion = document.getElementById("FormInicioSesion");

let campoNombreJuego = document.getElementById("NombreJuego");
let campoCategoria = document.getElementById("Categoría");
let campoDescripcion = document.getElementById("Descripcion");
let campoPublicado = document.getElementById("Publicado");
let campoURL = document.getElementById("URL");
let campoFormJuego = document.getElementById("FormNewGame");
let check;

let juegoExistente = false;
let usuarioExistente = false;

let listaUsuario = JSON.parse(localStorage.getItem("Usuarios")) || [];
let listaJuegos = JSON.parse(localStorage.getItem("Juegos")) || [];

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
if (campoNombreJuego) {
  campoNombreJuego.addEventListener("blur", () => {
    campoRequerido(campoNombreJuego);
  });
}
if (campoCategoria) {
  campoCategoria.addEventListener("blur", () => {
    campoRequerido(campoCategoria);
  });
}
if (campoDescripcion) {
  campoDescripcion.addEventListener("blur", () => {
    campoRequerido(campoDescripcion);
  });
}
if (campoURL) {
  campoURL.addEventListener("blur", () => {
    validarURL(campoURL);
  });
}

if (campoFormJuego) {
  campoFormJuego.addEventListener("submit", agregarJuego);
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

function limpiarForm() {
  campoFormJuego.reset();
  campoNombreJuego.className = "form-control";
  campoCategoria.className = "form-control";
  campoDescripcion.className = "form-control";
  campoURL.className = "form-control";
  campoPublicado.className = "form-check-input";
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

function guardarJuegosEnLocalStorage() {
  localStorage.setItem("Juegos", JSON.stringify(listaJuegos));
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

const numeroAleatorio = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

function agregarJuego(event) {
  event.preventDefault();
  let botonAlerta = document.getElementById("btnAlerta");
  if (campoPublicado) {
    if (campoPublicado.checked) {
      check = "Si";
    } else {
      check = "No";
    }
  }
  if (
    validarFormularioJuego(
      campoNombreJuego,
      campoCategoria,
      campoDescripcion,
      campoURL
    )
  ) {
    botonAlerta.className = "alert alert-danger my-3 d-none";
    if (!juegoExistente) {
      crearJuego();
    } else {
      modificarJuego();
    }
  } else {
    botonAlerta.className = "alert alert-danger my-3";
  }
}

function crearJuego() {
  let juegoNuevo = new Game(
    numeroAleatorio,
    campoNombreJuego.value,
    campoCategoria.value,
    campoDescripcion.value,
    check,
    campoURL.value
  );
  listaJuegos.push(juegoNuevo);
  limpiarForm();
  juegoExistente = false;
  guardarJuegosEnLocalStorage();
}

function modificarJuego() {}
