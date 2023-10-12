let destacado = JSON.parse(localStorage.getItem("Destacado")) || [];
let listaJuegos = JSON.parse(localStorage.getItem("Juegos")) || [];

let divPadre = document.getElementById("padre");
let divMadre = document.getElementById("madre");

let divPadreNovedades = document.getElementById("padreNovedades");
let divPadreEstrategia = document.getElementById("padreEstrategia");
let divPadreInfantil = document.getElementById("padreInfantil");
let divPadreDeportes = document.getElementById("padreDeportes");

divPadre.innerHTML += `<img
class="w-100 mb-4 divs"
src="${destacado[0].url}"
alt="imagen.jpg"
/>`;
divMadre.innerHTML += `<h5 class="card-title my-4">${destacado[0].nombre}</h5>
<p class="card-text">Categoría:   ${destacado[0].categoria}</p>
<p class="card-text">Publicado:   ${destacado[0].publicado}</p>
<p class="card-text my-3">${destacado[0].descripcion}</p>
<a href="GameDetails.html" class="btn buttonDetails my-5">Ver más</a>`;

/*for ( i = 0 ; i < listaJuegos.length ; i++) {
    if( listaJuegos[i].categoria ===)
}*/
