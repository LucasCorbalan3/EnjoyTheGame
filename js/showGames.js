let destacado = JSON.parse(localStorage.getItem("Destacado")) || [];

let divPadre = document.getElementById("padre");
let divMadre = document.getElementById("madre");

divPadre.innerHTML += `<img
class="w-100 mb-4 divs"
src="${destacado[0].url}"
alt="imagen.jpg"
/>`;
divMadre.innerHTML += `<h5 class="card-title my-4">${destacado[0].nombre}</h5>
<p class="card-text">${destacado[0].publicado}</p>
<p class="card-text my-3">${destacado[0].descripcion}</p>
<a href="Error404.html" class="btn buttonDetails my-5">Ver más</a>`;
