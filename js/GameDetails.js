let destacado = JSON.parse(localStorage.getItem("Destacado")) || [];
let divPapa = document.getElementById("papa");

console.log(divPapa);

divPapa.innerHTML += `<div
class="card card-body bg-dark text-light text-center my-5 divs"
style="width: 60rem"
>
<img src="${destacado[0].url}" class="card-img-top mx-auto img-fluid" alt="img" />
<div class="">
  <h5 class="card-title my-5">${destacado[0].nombre}</h5>
  <p class="card-text">Categoría:  ${destacado[0].categoria}</p>
  <p class="card-text">Publicado:  ${destacado[0].publicado}</p>
  <p class="card-text">${destacado[0].descripcion}</p>
  <a href="Error404.html" class="btn buttonDetails my-5">Comprar</a>
  <a href="index.html" class="btn buttonDetails my-5">Volver</a>
</div>
</div>`;
