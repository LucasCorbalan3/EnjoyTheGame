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

const validarFormularioJuego = (nombre, categoria, descripcion, url) => {
  if (
    campoRequerido(nombre) &&
    campoRequerido(categoria) &&
    campoRequerido(descripcion) &&
    validarURL(url)
  ) {
    alerta.className = "alert alert-danger my-3 d-none";
    return true;
  } else {
    alerta.className = "alert alert-danger my-3";
    return false;
  }
};

const generalValidation = (
  campoNombreApellido,
  campoAsunto,
  campoEmail,
  campoObservaciones
) => {
  let alert = document.querySelector("#mensajeAlert");
  Swal.fire(
    "Bien Hecho!",
    "Tu consulta fue enviada al administrador!",
    "success"
  );
  if (
    campoRequerido(campoNombreApellido) &&
    campoRequerido(campoAsunto) &&
    campoRequerido(campoObservaciones) &&
    validarEmail(campoEmail)
  ) {
  } else {
    alert.className = "alert alert-danger my-3";
    return false;
  }
};

const cerrarSesion = () => {
  localStorage.removeItem("usuario");
  window.location.href = "login.html";
}


const usuarioisAdmin = () => {
  let listaUsuario = JSON.parse(localStorage.getItem("Usuarios")) || [];
  if (
    listaUsuario &&
    listaUsuario?.lenght > 0 &&
    listaUsuario?.some((usuario) => usuario.isAdmin === true)
  ) {
    let linkAdmin = document.getElementById("linkAdmin");
    linkAdmin.className = "nav-item";
  }
};

export {
  campoRequerido,
  validarEmail,
  validarRepetirContrasena,
  validarURL,
  validarFormularioJuego,
  generalValidation,
  cerrarSesion,
  usuarioisAdmin,
};
