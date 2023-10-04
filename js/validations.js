const CampoRequerido = (input) => {
  console.log(input.value);
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

const ValidarRepetirContrasena = (CampoContrasena) => {
  console.log("la contraseña no es la misma");
  if ((CampoContrasena.value === CampoRepetirContrasena.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
};

const ValidacionGeneral = (
  CampoNombre,
  CampoApellido,
  CampoEmail,
  CampoContrasena,
  CampoRepetirContrasena
) => {
  console.log('hola pibe');
  let alert = document.getElementById("mjeAlerta");
  if (
    CampoRequerido(CampoNombre) &&
    CampoRequerido(CampoApellido) &&
    CampoRequerido(CampoEmail) &&
    CampoRequerido(CampoContrasena) &&
    CampoRequerido(CampoRepetirContrasena) &&
    CampoRequerido(CampoCheckboxRobot)
  ) {
    alert.className = "alert alert-danger my-3 d-none";
    return true;
  } else {
    alert.className = "alert alert-danger my-3";
    return false;
  }
  
};


export {
  CampoRequerido,
  validarEmail,
  ValidarRepetirContrasena,
  ValidacionGeneral,
};

