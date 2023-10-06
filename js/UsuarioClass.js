export class Usuario {
  constructor(Nombre, Apellido, Email, Contrasena) 
  {
    this.UserNombre = Nombre;
    this.UserApellido = Apellido;
    this.UserEmail = Email;
    this.UserContrasena = Contrasena;
  }

  get Nombre() {
    return this.Nombre;
  }

  get Apellido() {
    return this.Apellido;
  }

  get Email() {
    return this.Email;
  }

  get Contrasena() {
    return this.Contrasena;
  }

  set UsuarioNombre(NuevoNombre) {
    this.Nombre = NuevoNombre;
  }

  set UsuarioEmail(NuevoEmail) {
    this.Email = NuevoEmail;
  }

  set UsuarioApellido(NuevoApellido) {
    this.Apellido = NuevoApellido;
  }

  set UsuarioContrasena(NuevoConstrasena) {
    this.Nombre = NuevoConstrasena;
  }
}
