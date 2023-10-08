import {
  campoRequerido,
  validarFormularioJuego,
  validarURL,
  crearFila,
} from "./functionsLoginGames.js";

import { Game } from "./gameClass.js";

let campoNombreJuego = document.getElementById("NombreJuego");
let campoCategoria = document.getElementById("Categoría");
let campoDescripcion = document.getElementById("Descripcion");
let campoPublicado = document.getElementById("Publicado");
let campoURL = document.getElementById("URL");
let campoFormJuego = document.getElementById("FormNewGame");
let check;

let juegoExistente = false;

let listaJuegos = JSON.parse(localStorage.getItem("Juegos")) || [];

campoNombreJuego.addEventListener("blur", () => {
  campoRequerido(campoNombreJuego);
});

campoCategoria.addEventListener("blur", () => {
  campoRequerido(campoCategoria);
});

campoDescripcion.addEventListener("blur", () => {
  campoRequerido(campoDescripcion);
});

campoURL.addEventListener("blur", () => {
  validarURL(campoURL);
});

campoFormJuego.addEventListener("submit", agregarJuego);

function limpiarForm() {
  campoFormJuego.reset();
  campoNombreJuego.className = "form-control";
  campoCategoria.className = "form-control";
  campoDescripcion.className = "form-control";
  campoURL.className = "form-control";
  campoPublicado.className = "form-check-input";
}

function guardarJuegosEnLocalStorage() {
  localStorage.setItem("Juegos", JSON.stringify(listaJuegos));
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
  crearFila(juegoNuevo);
}

function modificarJuego() {}
