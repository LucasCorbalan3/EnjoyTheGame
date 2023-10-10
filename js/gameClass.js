export class Game {
  constructor(codigo, nombre, categoria, descripcion, publicado, url) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.categoria = categoria;
    this.descripcion = descripcion;
    this.publicado = publicado;
    this.url = url;
  }

  get mostrarCodigo() {
    return this.codigo;
  }
  get mostrarNombre() {
    return this.nombre;
  }
  get mostrarCategoria() {
    return this.categoria;
  }
  get mostrarDescripcion() {
    return this.descripcion;
  }
  get mostrarPublicado() {
    return this.publicado;
  }
  get mostrarUrl() {
    return this.url;
  }
  set modificarCodigo(nuevoCodigo) {
    this.codigo = nuevoCodigo;
  }
  set modificarNombre(nuevoNombre) {
    this.nombre = nuevoNombre;
  }
  set modificarCategoria(nuevoCategoria) {
    this.categoria = nuevoCategoria;
  }
  set modificarDescripcion(nuevaDescripcion) {
    this.descripcion = nuevaDescripcion;
  }
  set modificarPublicado(nuevoPublicado) {
    this.publicado = nuevoPublicado;
  }
  set modificarUrl(nuevaUrl) {
    this.url = nuevaUrl;
  }
}
