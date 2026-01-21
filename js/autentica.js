document.addEventListener("DOMContentLoaded", () => {
    const inicio = document.getElementById("inicio");
    const registro = document.getElementById("registro");
    const salir = document.getElementById("salir");
    const salirLink = document.getElementById("salir");

    if (localStorage.getItem("token")) {
        // Usuario logueado: Ocultar "Iniciar Sesión" y mostrar "Cerrar Sesión"
        if (inicio) inicio.style.display = "none";
        if (registro) registro.style.display = "none";
        if (salir) salir.style.display = "block";
    } else {
        // Usuario NO logueado: Mostrar "Iniciar Sesión" y ocultar "Cerrar Sesión"
        if (inicio) inicio.style.display = "block";
        if (registro) registro.style.display = "none";
        if (salir) salir.style.display = "none";
    }

    // Evento para cerrar sesión
    if (salirLink) {
        salirLink.addEventListener("click", (event) => {
            event.preventDefault();
            localStorage.removeItem("token"); 
            window.location.href = "../pages/iniciar-sesion.html"; // Redirigir a iniciar-sesion
        });
    }
});
