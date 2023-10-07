let campoNombreApellido = document.getElementById("Nombre");
let campoAsunto = document.getElementById("Asunto");
let campoEmail = document.getElementById("Email");
let campoObservaciones = document.getElementById("Observaciones");
let inquiryForm = document.getElementById('inquiryForm');

const requiredField = (input) => {
  if (input.value.length > 0) {
    input.className = "form-control is-Valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
};

const validateEmail = (input) => {
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

const generalValidation = (
  campoNombreApellido,
  campoAsunto,
  campoEmail,
  campoObservaciones
) => {
    let alert = document.querySelector('#mensajeAlert')
  if (
    requiredField(campoNombreApellido) &&
    requiredField(campoAsunto) &&
    requiredField(campoObservaciones) &&
    validateEmail(campoEmail)
  ) {
    alert.className = "alert alert-danger my-3 d-none"
    return true;
  }else{
    alert.className = "alert alert-danger my-3"
    return false;
  }
};

campoNombreApellido.addEventListener("blur", () => {
  requiredField(campoNombreApellido);
});

campoAsunto.addEventListener("blur", () => {
  requiredField(campoAsunto);
});

campoEmail.addEventListener("blur", () => {
  validateEmail(campoEmail);
});

campoObservaciones.addEventListener("blur", () => {
  requiredField(campoObservaciones);
});

inquiryForm.addEventListener('submit', generalValidation);
