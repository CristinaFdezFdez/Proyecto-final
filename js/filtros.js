document.addEventListener("DOMContentLoaded", () => {
    
    // Añado eventos a los botones para redirigir con diferentes filtros
    document.getElementById("btn-destinos").addEventListener("click", () => redirigir("nombre"));
    document.getElementById("btn-monedas").addEventListener("click", () => redirigir("moneda"));
    document.getElementById("btn-idiomas").addEventListener("click", () => redirigir("idioma"));
    
    // Redirige a destinos.html sin filtros
    document.getElementById("btn-todo").addEventListener("click", () => window.location.href = "./pages/destinos.html");

    // Función para redirigir con un filtro específico
    function redirigir(filtro) {
        window.location.href = `./pages/destinos.html?filtro=${filtro}`;
    }
    
});
