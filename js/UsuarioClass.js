export class Usuario {
  constructor(
    parametroNombre,
    parametroApellido,
    parametroEmail,
    parametroContrasena
  ) {
    this.Nombre = parametroNombre;
    this.Apellido = parametroApellido;
    this.Email = parametroEmail;
    this.Contrasena = parametroContrasena;
  }

  get mostrarNombre() {
    return this.Nombre;
  }

  get mostrarApellido() {
    return this.Apellido;
  }

  get mostrarEmail() {
    return this.Email;
  }

  get mostrarContrasena() {
    return this.Contrasena;
  }

  set setNombre(NuevoNombre) {
    this.Nombre = NuevoNombre;
  }

  set setEmail(NuevoEmail) {
    this.Email = NuevoEmail;
  }

  set setApellido(NuevoApellido) {
    this.Apellido = NuevoApellido;
  }

  set setContrasena(NuevoConstrasena) {
    this.Nombre = NuevoConstrasena;
  }
}
