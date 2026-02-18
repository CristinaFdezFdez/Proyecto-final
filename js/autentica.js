document.addEventListener("DOMContentLoaded", () => {
    const inicio = document.getElementById("inicio");
    const registro = document.getElementById("registro");
    const salir = document.getElementById("salir");
    const salirLink = document.getElementById("salir");
    const mensajeNoSesion = document.getElementById('mensajeNoSesion');
    const contenidoExperiencias = document.getElementById('contenidoExperiencias');

    if (localStorage.getItem("token")) {
        // Usuario logueado: Ocultar "Iniciar Sesión" y mostrar "Cerrar Sesión"
        if (inicio) inicio.style.display = "none";
        if (registro) registro.style.display = "none";
        if (salir) salir.style.display = "block";

        // MOSTRAR REACT Y OCULTAR PARALLAX
        if (mensajeNoSesion) mensajeNoSesion.style.display = "none";
        if (contenidoExperiencias) {
            console.log("Sesión activa: mostrando contenedor de React");
            contenidoExperiencias.style.display = "block";}

    } else {
        // Usuario NO logueado: Mostrar "Iniciar Sesión" y ocultar "Cerrar Sesión"
        if (inicio) inicio.style.display = "block";
        if (registro) registro.style.display = "none";
        if (salir) salir.style.display = "none";

        // MOSTRAR PARALLAX Y OCULTAR REACT
        if (mensajeNoSesion) mensajeNoSesion.style.display = "block";
        if (contenidoExperiencias) contenidoExperiencias.style.display = "none";
    }

    // Evento para cerrar sesión
    if (salirLink) {
        salirLink.addEventListener("click", (event) => {
            event.preventDefault();
            localStorage.removeItem("token"); 
            // IMPORTANTE: Al cerrar sesión, redirigimos para limpiar el estado
            window.location.href = "../pages/iniciar-sesion.html"; 
        });
    }
});