let campoNombreApellido = document.getElementById("Nombre");
let campoEmail = document.getElementById("Email");
let campoObservaciones = document.getElementById("Observaciones");

const requiredField = (input) => {
    if (input.value.length > 0) {
      input.className = "form-control is-Valid";
      return true;
    } else {
       input.className = "form-control is-invalid";
       return false;
    }
}

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

  campoNombreApellido.addEventListener("blur", () => {
    requiredField(campoNombreApellido);
  });

  campoEmail.addEventListener("blur", () => {
    validateEmail(campoEmail);
  });

  campoObservaciones.addEventListener("blur", () => {
    requiredField(campoObservaciones);
  });
