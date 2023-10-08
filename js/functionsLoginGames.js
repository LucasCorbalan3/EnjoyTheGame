const campoRequerido = (input) => {
  if (input.value.trim().length > 0) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
};

const validarURL = (input) => {
  let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  if (patron.test(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
};

const validarFormularioJuego = (nombre, categoria, descripcion, url) => {
  if (
    campoRequerido(nombre) &&
    campoRequerido(categoria) &&
    campoRequerido(descripcion) &&
    validarURL(url)
  ) {
    return true;
  } else {
    return false;
  }
};

function crearFila(juegoNuevo) {
  let tablaJuegos = document.getElementById("tablaJuegos");
  let fila = document.createElement("tr");
  let celda1 = document.createElement("th");
  let celda2 = document.createElement("th");
  let celda3 = document.createElement("th");
  let celda4 = document.createElement("th");
  let celda5 = document.createElement("th");
  let celda6 = document.createElement("th");
  celda1.innerHTML = `${juegoNuevo.codigo}`;
  celda2.innerHTML = `${juegoNuevo.nombre}`;
  celda3.innerHTML = `${juegoNuevo.categoria}`;
  celda4.innerHTML = `${juegoNuevo.descripcion}`;
  celda5.innerHTML = `${juegoNuevo.publicado}`;
  celda6.innerHTML = ``;
  fila.appendChild(celda1);
  fila.appendChild(celda2);
  fila.appendChild(celda3);
  fila.appendChild(celda4);
  fila.appendChild(celda5);
  fila.appendChild(celda6);

  tablaJuegos.appendChild(fila);
}

export { campoRequerido, validarFormularioJuego, validarURL, crearFila };
