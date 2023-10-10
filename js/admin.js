import {
  campoRequerido,
  validarFormularioJuego,
  validarURL,
} from "./validations.js";

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

cargaInicial();

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
  let numeroAleatorio = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
  let codigo = numeroAleatorio.toString();
  let juegoNuevo = new Game(
    codigo,
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
  Swal.fire({
    icon: "success",
    title: "Juego agregado",
    showConfirmButton: false,
    timer: 1500,
  });
  crearFila(juegoNuevo);
}

function crearFila(juegoNuevo) {
  let tablaJuegos = document.getElementById("tablaJuegos");
  tablaJuegos.innerHTML += `<tr>
  <td>${juegoNuevo.codigo}</td>
  <td>${juegoNuevo.nombre}</td>
  <td>${juegoNuevo.categoria}</td>
  <td>${juegoNuevo.descripcion}</td>
  <td>${juegoNuevo.publicado}</td>
  <td><button class="btn btn-warning"
  id="Modificar" data-bs-toggle="modal"
  data-bs-target="#exampleModal" onclick="prepararJuego(${juegoNuevo.codigo})">Modificar</button>
<button
  class="btn btn-danger"
  id="Eliminar" onclick="eliminarJuego()">
  Eliminar
</button><button
class="btn btn-primary"
id="Destacar" onclick="destacarJuego()">
Destacar
</button></td>
</tr>`;
}

function cargaInicial() {
  if (listaJuegos.length > 0) {
    listaJuegos.map((itemJuego) => crearFila(itemJuego));
  }
}

window.prepararJuego = function (claveUnica) {
  let clave = claveUnica.toString();
  let juegoBuscado = listaJuegos.find(
    (itemJuego) => itemJuego.codigo === clave
  );
  console.log(juegoBuscado);
  campoNombreJuego.value = juegoBuscado.nombre;
  campoCategoria.value = juegoBuscado.categoria;
  campoDescripcion.value = juegoBuscado.descripcion;
  campoPublicado.value = juegoBuscado.publicado;
  campoURL.value = juegoBuscado.url;

  juegoExistente = true;
};

function modificarJuego() {
  let juegoBuscado = listaJuegos.find(
    (itemJuego) => itemJuego.nombre === campoNombreJuego.value
  );

  let indiceJuego = listaJuegos.findIndex(
    (itemJuego) => itemJuego.nombre === campoNombreJuego.value
  );
}
