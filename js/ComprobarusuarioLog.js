function usuarioisAdmin() {
    let listaUsuario = JSON.parse(localStorage.getItem("Usuarios")) || [];
    console.log(listaUsuario);
    if (listaUsuario && listaUsuario?.lenght > 0 && listaUsuario?.some((usuario) => usuario.isAdmin === true)) {
    console.log('hola hola ');

    let linkAdmin = document.getElementById("linkAdmin");
    linkAdmin.className = "nav-item";
  }
}
