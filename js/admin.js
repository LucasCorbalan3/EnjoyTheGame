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
let botonCargarDatosDePrueba = document.getElementById("cargarDatos");

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
    Swal.fire({
      icon: "error",
      title: "Juego no agregado",
      text: "Debe completar todos los campos de manera válida",
    });
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
  destacado.push(juegoBuscado);
  guardarDestacadoEnLocalStorage();
  destacado.shift();
  Swal.fire({
    icon: "success",
    title: "Juego Destacado",
    showConfirmButton: false,
    timer: 1500,
  });
};

botonCargarDatosDePrueba.addEventListener("click", cargarDatosPrueba);

function cargarDatosPrueba() {
  let datos = [
    {
      codigo: "27133",
      nombre: "Counter Strike 2",
      categoria: "Novedades",
      descripcion:
        "Counter-Strike 2, la secuela del clásico shooter en primera persona, sigue cautivando a los fanáticos de la acción. Los jugadores se enfrentan en dos equipos, terroristas y fuerzas especiales, en emocionantes partidas de estrategia y puntería. Los mapas son detallados y variados, desde estaciones de tren hasta instalaciones militares. La cooperación y la precisión son esenciales para el éxito en el combate en línea. Counter-Strike 2 mantiene la tensión y el equilibrio que hicieron famosa a la serie, con armas realistas y modos de juego dinámicos.",
      publicado: "Si",
      url: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/capsule_616x353.jpg?t=1696359298",
    },
    {
      codigo: "13539",
      nombre: "Age of Empires 2",
      categoria: "Estrategia",
      descripcion:
        "Age of Empires II, un videojuego de estrategia en tiempo real, transporta a los jugadores a la Edad Media. Los jugadores lideran civilizaciones históricas y construyen imperios desde cero, recolectando recursos, investigando tecnologías y enfrentándose en batallas épicas. El juego ofrece una amplia variedad de unidades y edificios, lo que permite estrategias diversificadas. Su modo campaña abarca momentos históricos cruciales. Con gráficos mejorados y jugabilidad refinada, la edición definitiva mantiene su atractivo.",
      publicado: "No",
      url: "https://elchapuzasinformatico.com/wp-content/uploads/2019/04/Age-of-Empires-II.jpg",
    },
    {
      codigo: "260893",
      nombre: "EA Sports FC",
      categoria: "Deportes",
      descripcion:
        "EA Sports FC, el último lanzamiento de la exitosa franquicia, redefine la simulación de fútbol. Con gráficos de vanguardia, mecánicas de juego fluidas y una variedad de modos, desde carreras de equipos hasta partidas en línea, ofrece una experiencia auténtica y emocionante para los fanáticos del fútbol en todo el mundo. Sumérgete en la acción y lleva a tu equipo a la victoria en este emocionante simulador deportivo.",
      publicado: "Si",
      url: "https://i.ytimg.com/vi/XhP3Xh4LMA8/maxresdefault.jpg",
    },
    {
      codigo: "27133",
      nombre: "Counter Strike 2",
      categoria: "Novedades",
      descripcion:
        "Counter-Strike 2, la secuela del clásico shooter en primera persona, sigue cautivando a los fanáticos de la acción. Los jugadores se enfrentan en dos equipos, terroristas y fuerzas especiales, en emocionantes partidas de estrategia y puntería. Los mapas son detallados y variados, desde estaciones de tren hasta instalaciones militares. La cooperación y la precisión son esenciales para el éxito en el combate en línea. Counter-Strike 2 mantiene la tensión y el equilibrio que hicieron famosa a la serie, con armas realistas y modos de juego dinámicos.",
      publicado: "Si",
      url: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/capsule_616x353.jpg?t=1696359298",
    },
    {
      codigo: "11111",
      nombre: "Minecraft",
      categoria: "Infantil",
      descripcion:
        "Minecraft es un popular videojuego sandbox creado por Mojang Studios. Se destaca por su mundo abierto y bloqueado, donde los jugadores pueden construir, explorar y sobrevivir. La estética pixelada y la libertad creativa son sus sellos distintivos. Los jugadores pueden cavar, construir estructuras, cultivar, criar ganado y enfrentarse a enemigos, como zombis y esqueletos. Minecraft ofrece múltiples modos de juego, desde supervivencia hasta creativo, y tiene una próspera comunidad de modders. Es una experiencia única donde la imaginación y la creatividad son las claves para sobrevivir y prosperar.",
      publicado: "Si",
      url: "https://www.eltiempo.com/files/image_1200_680/uploads/2023/03/31/642756e65c75c.png",
    },
    {
      codigo: "22222",
      nombre: "Call of duty",
      categoria: "Novedades",
      descripcion:
        "Call of Duty es una icónica franquicia de videojuegos de disparos en primera persona (FPS) que abarca una variedad de conflictos militares, desde la Segunda Guerra Mundial hasta la era moderna. Con modos para un jugador emocionantes y multijugador competitivo, ofrece una experiencia realista y gráficos impresionantes, convirtiéndose en un referente en la industria del videojuego.",
      publicado: "Si",
      url: "https://bnetcmsus-a.akamaihd.net/cms/blog_header/KHQRTCILZAVT1654115190478.jpg",
    },
    {
      codigo: "33333",
      nombre: "Starcraft",
      categoria: "Estrategia",
      descripcion:
        "StarCraft es una influyente serie de videojuegos de estrategia en tiempo real (RTS) desarrollada por Blizzard Entertainment. Ambientada en un universo de ciencia ficción, ofrece tres facciones únicas con sus propias estrategias y unidades. Su robusto modo multijugador y emocionantes campañas para un jugador lo convierten en un pilar del género RTS, con una comunidad de jugadores dedicados.",
      publicado: "No",
      url: "https://i.blogs.es/bfc345/starcraft-cabecera/1366_2000.jpg",
    },
    {
      codigo: "44444",
      nombre: "Need for Speed",
      categoria: "Deportes",
      descripcion:
        "Counter-Strike 2, la secuela del clásico shooter en primera persona, sigue cautivando a los fanáticos de la acción. Los jugadores se enfrentan en dos equipos, terroristas y fuerzas especiales, en emocionantes partidas de estrategia y puntería. Los mapas son detallados y variados, desde estaciones de tren hasta instalaciones militares. La cooperación y la precisión son esenciales para el éxito en el combate en línea. Counter-Strike 2 mantiene la tensión y el equilibrio que hicieron famosa a la serie, con armas realistas y modos de juego dinámicos.",
      publicado: "No",
      url: "https://www.mundodeportivo.com/alfabeta/hero/2023/08/most-wanted-portada.jpg?width=1200",
    },
    {
      codigo: "55555",
      nombre: "Crash Bandicoot",
      categoria: "Infantil",
      descripcion:
        "Crash Bandicoot N. Sane Trilogy es una remasterización de los tres juegos originales de Crash Bandicoot lanzados para PlayStation. Esta colección, lanzada en 2017, trae de vuelta los clásicos juegos de plataformas con gráficos y sonidos remasterizados. Ofrece la misma jugabilidad divertida y desafiante que hizo famosa a la franquicia, pero con un aspecto modernizado y un rendimiento suave. Es una oportunidad perfecta para revivir la nostalgia y experimentar la trilogía original con una calidad mejorada.",
      publicado: "Si",
      url: "https://i.blogs.es/1dbd22/crash-bandicoot-n.-sane-trilogy/1366_2000.png",
    },
    {
      codigo: "66666",
      nombre: "Pokemón Violeta",
      categoria: "Infantil",
      descripcion:
        "La serie de juegos Pokémon, creada por Nintendo y Game Freak en 1996, se centra en capturar, entrenar y luchar con criaturas llamadas Pokémon. Los jugadores aspiran a ser Maestros Pokémon al completar la Pokédex, vencer a líderes de gimnasio y a la Liga Pokémon, y enfrentarse a equipos villanos. La estrategia en batallas basadas en turnos y la interacción social son pilares de la franquicia. Pokémon ha evolucionado y expandido su presencia en múltiples plataformas, medios y géneros, convirtiéndose en un fenómeno global.",
      publicado: "No",
      url: "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000053971/842b2784d91520d41a947dec17fac116fec889bb1f1db4023615af8429dae00d",
    },
    {
      codigo: "77777",
      nombre: "Top Spin 4",
      categoria: "Deportes",
      descripcion:
        "Top Spin 4 es un simulador de tenis de 2K Czech. Ofrece realismo y una amplia selección de jugadores y canchas. Los modos de juego incluyen carreras de tenis y torneos de Grand Slam. Es apreciado por su autenticidad en la jugabilidad y sigue siendo una opción popular en el género de simulación de tenis.",
      publicado: "No",
      url: "https://areajugones.sport.es/wp-content/uploads/2022/05/top-spin-4.jpg",
    },
    {
      codigo: "88888",
      nombre: "World of warcraft",
      categoria: "Estrategia",
      descripcion:
        "World of Warcraft (WoW) es un popular MMORPG de fantasía desarrollado por Blizzard Entertainment. Ambientado en el mundo de Azeroth, los jugadores pueden elegir entre diversas razas y clases, explorar un vasto mundo, completar misiones, luchar contra monstruos y otros jugadores, y participar en emocionantes raids y batallas JcJ. WoW se destaca por su rica narrativa, una comunidad activa y actualizaciones regulares que mantienen su longevidad y éxito en la industria de los videojuegos.",
      publicado: "Si",
      url: "https://cloudfront-us-east-1.images.arcpublishing.com/copesa/K6XOUGPDCNFE7BMSCIRBH43A74.jpg",
    },
  ];

  if (!localStorage.getItem("Juegos")) {
    localStorage.setItem("Juegos", JSON.stringify(datos));
    listaJuegos = datos;
    listaJuegos.forEach((itemJuego) => {
      crearFila(itemJuego);
    });
  }
}
