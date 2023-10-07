const campoRequerido = (input) => {
  if (input.value.trim().length > 0) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
};

const validarEmail = (input) => {
  let patron =
    /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/;
  if (patron.test(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
};


const validarRepetirContrasena = (input) => {
  let contrasenaprimera = document.getElementById("Contrasena").value;
  let contrasenasegunda = document.getElementById("Repetircontrasena").value;
  if (contrasenaprimera === contrasenasegunda) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return true;
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

const validacionGeneral = (
  campoNombre,
  campoApellido,
  campoEmail,
  campoContrasena,
  campoRepetirContrasena
) => {
  let alert = document.getElementById("mjsAlerta");
  if (
    campoRequerido(campoNombre) &&
    campoRequerido(campoApellido) &&
    validarEmail(campoEmail) &&
    campoRequerido(campoContrasena) &&
    validarRepetirContrasena(campoRepetirContrasena)
  ) {
    alert.className = "alert alert-danger my-3 d-none";
    return true;
  } else {
    alert.className = "alert alert-danger my-3";
    return false;
  }
};

const validarFormularioJuego = (event, nombre, categoria, descripcion, url) => {
  let botonAlerta = document.getElementById("btnAlerta");
  console.log("En la funcion");
  if (
    campoRequerido(nombre) &&
    campoRequerido(categoria) &&
    campoRequerido(descripcion) &&
    validarURL(url)
  ) {
    botonAlerta.className = "alert alert-danger my-3 d-none";
    return true;
  } else {
    event.preventDefault();
    botonAlerta.className = "alert alert-danger my-3";
    return false;
  }
};

const checkbox = (input) => {
  if (input.checked) {
    return true;
  } else {
    return false;
  }
};

export {
  campoRequerido,
  validarEmail,
  validarRepetirContrasena,
  validacionGeneral,
  validarFormularioJuego,
  validarURL,
  checkbox,
};
