import {
  campoRequerido,
  validarFormularioJuego,
  validarURL,
  cerrarSesion,
} from "./validations.js";

import { Game } from "./gameClass.js";

let campoCodigo = document.getElementById("codigo");
let campoNombreJuego = document.getElementById("NombreJuego");
let campoCategoria = document.getElementById("Categoría");
let campoDescripcion = document.getElementById("Descripcion");
let campoPublicado = document.getElementById("Publicado");
let campoURL = document.getElementById("URL");
let campoFormJuego = document.getElementById("FormNewGame");
let check;
let cerrarsesion = document.getElementById("cerrarsesion");
let juegoExistente = false;

let boton = document.getElementById("NuevoJuego");

let listaJuegos = JSON.parse(localStorage.getItem("Juegos")) || [];
let listaCodigos = JSON.parse(localStorage.getItem("Codigos")) || [];
let destacado = JSON.parse(localStorage.getItem("Destacado")) || [];

if (destacado.length > 0) {
  destacado.splice(0, 1);
}

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

boton.addEventListener("click", () => {
  limpiarForm();
});

campoFormJuego.addEventListener("submit", agregarJuego);

cargaInicial();

function limpiarForm() {
  campoFormJuego.reset();
  campoNombreJuego.className = "form-control";
  campoCategoria.className = "form-control";
  campoDescripcion.className = "form-control";
  campoURL.className = "form-control";

  juegoExistente = false;
}

function guardarJuegosEnLocalStorage() {
  localStorage.setItem("Juegos", JSON.stringify(listaJuegos));
}

function guardarCodigosEnLocalStorage() {
  localStorage.setItem("Codigos", JSON.stringify(listaCodigos));
}

function guardarDestacadoEnLocalStorage() {
  localStorage.setItem("Destacado", JSON.stringify(destacado));
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

function generarCodigoUnico() {
  let numeroAleatorio;
  let numeroAleatorioConvertido;
  while (true) {
    numeroAleatorio = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    numeroAleatorioConvertido = numeroAleatorio.toString();
    if (!listaCodigos.includes(numeroAleatorioConvertido)) {
      return numeroAleatorioConvertido;
    }
  }
}

function crearJuego() {
  let codigo = generarCodigoUnico();
  let juegoNuevo = new Game(
    codigo,
    campoNombreJuego.value,
    campoCategoria.value,
    campoDescripcion.value,
    check,
    campoURL.value
  );
  listaCodigos.push(juegoNuevo.codigo);
  listaJuegos.push(juegoNuevo);
  limpiarForm();
  juegoExistente = false;
  guardarCodigosEnLocalStorage();
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
  <td><button class="btn btn-success"
  id="Modificar" data-bs-toggle="modal"
  data-bs-target="#exampleModal" onclick="prepararJuego(${juegoNuevo.codigo})">Modificar</button>
<button
  class="btn btn-danger"
  id="Eliminar" onclick="eliminarJuego(${juegoNuevo.codigo})">
  Eliminar
</button><button
class="btn btn-primary"
id="Destacar" onclick="destacarJuego(${juegoNuevo.codigo})">
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
  campoCodigo.value = juegoBuscado.codigo;
  campoNombreJuego.value = juegoBuscado.nombre;
  campoCategoria.value = juegoBuscado.categoria;
  campoDescripcion.value = juegoBuscado.descripcion;
  campoPublicado.value = juegoBuscado.publicado;
  campoURL.value = juegoBuscado.url;

  juegoExistente = true;
};

function modificarJuego() {
  let indiceJuego = listaJuegos.findIndex(
    (itemJuego) => itemJuego.codigo === campoCodigo.value
  );

  listaJuegos[indiceJuego].nombre = campoNombreJuego.value;
  listaJuegos[indiceJuego].categoria = campoCategoria.value;
  listaJuegos[indiceJuego].descripcion = campoDescripcion.value;
  listaJuegos[indiceJuego].publicado = campoPublicado.value;
  listaJuegos[indiceJuego].url = campoURL.value;

  guardarJuegosEnLocalStorage();
  borrarTabla();
  cargaInicial();
  limpiarForm();

  Swal.fire({
    icon: "success",
    title: "Juego modificado",
    showConfirmButton: false,
    timer: 1500,
  });
}

function borrarTabla() {
  let tablaJuegos = document.getElementById("tablaJuegos");
  tablaJuegos.innerHTML = "";
}

window.eliminarJuego = function (claveUnica) {
  Swal.fire({
    title: "Seguro que desea eliminar este producto?",
    text: "La acción no prodrá revertirse!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      let clave = claveUnica.toString();
      let nuevaListaJuegos = listaJuegos.filter(
        (itemJuego) => itemJuego.codigo !== clave
      );
      listaJuegos = [...nuevaListaJuegos];
      guardarJuegosEnLocalStorage();
      borrarTabla();
      cargaInicial();
      Swal.fire(
        "Producto eliminado!",
        "El producto fue eliminado correctamente!",
        "success"
      );
    }
  });
};

window.destacarJuego = function (claveUnica) {
  let clave = claveUnica.toString();
  let juegoBuscado = listaJuegos.find(
    (itemJuego) => itemJuego.codigo === clave
  );
  console.log(juegoBuscado);
  destacado.push(juegoBuscado);
  guardarDestacadoEnLocalStorage();
  console.log(destacado);
  destacado.shift();
  Swal.fire({
    icon: "success",
    title: "Juego Destacado",
    showConfirmButton: false,
    timer: 1500,
  });
};
