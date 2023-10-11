let campoNombreApellido = document.getElementById("NombreApellido");
let campoAsunto = document.getElementById("Asunto");
let campoObservaciones = document.getElementById("Observaciones");
let inquiryForm = document.getElementById("inquiryForm");


campoNombreApellido.addEventListener("blur", () => {
    campoRequerido(campoNombreApellido);
  });
  
  campoAsunto.addEventListener("blur", () => {
    campoRequerido(campoAsunto);
  });
  
  campoObservaciones.addEventListener("blur", () => {
    campoRequerido(campoObservaciones);
  });
  
  inquiryForm.addEventListener("submit", generalValidation);
  