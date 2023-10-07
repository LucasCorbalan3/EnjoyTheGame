import {
  campoRequerido,
  validarEmail,
  validarRepetirContrasena,
  validacionGeneral,
  validarFormularioJuego,
  checkbox,
} from "./validations.js";

import { Usuario } from "./UsuarioClass.js";

let campoNombre = document.getElementById("Nombre");
let campoApellido = document.getElementById("Apellido");
let campoEmail = document.getElementById("Email");
let campoContrasena = document.getElementById("Contrasena");
let campoRepetirContrasena = document.getElementById("Repetircontrasena");
let campoCheckboxRobot = document.getElementById("checkboxRobot");
let campoFormLogin = document.getElementById("FormLogin");

let usuarioExistente = false;
let listaUsuario = [];

let campoNombreJuego = document.getElementById("NombreJuego");
let campoCategoria = document.getElementById("Categoría");
let campoDescripcion = document.getElementById("Descripcion");
let campoPublicado = document.getElementById("Publicado");
let campoFormJuego = document.getElementById("FormNewGame");
let checkeado;

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
if (campoPublicado) {
  checkeado = checkbox();
}
if (campoFormJuego) {
  campoFormJuego.addEventListener("submit", () => {
    validarFormularioJuego(
      event,
      campoNombreJuego,
      campoCategoria,
      campoDescripcion
    );
  });
}

campoFormLogin.addEventListener("submit", RegisterUser);

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
  localStorage.setItem("keynuevo", JSON.stringify(listaUsuario));
}
