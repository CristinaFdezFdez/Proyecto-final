document.addEventListener("DOMContentLoaded", async () => {

    const contenedor = document.getElementById("destinos-container");
    const busquedaFlotante = document.getElementById("busqueda-flotante");
    const busquedaTitulo = document.getElementById("busqueda-titulo");
    const busquedaInput = document.getElementById("busqueda-input");
    const busquedaBoton = document.getElementById("busqueda-boton");

    let destinos = [];
    let indexActual = 0;

    let filtroActual = new URLSearchParams(window.location.search).get("filtro");

    // Si hay un filtro, mostramos el panel de búsqueda flotante con el título adecuado
    if (filtroActual) {
        busquedaTitulo.textContent = `Filtrar por ${filtroActual}:`;
        busquedaFlotante.style.display = "flex";
    } else {
        busquedaFlotante.style.display = "none";
    }

    busquedaBoton.addEventListener("click", () => {
        const valor = busquedaInput.value.trim();
        if (valor) {
            const filtro = {};
            filtro[filtroActual] = valor;
            obtenerDestinos(filtro);
        }
    });

    // Función para obtener los destinos desde el servidor con un filtro opcional
    async function obtenerDestinos(filtro = {}) {
        let url = "http://localhost:3000/destinos?";

        Object.keys(filtro).forEach(key => {
            url += `${key}=${encodeURIComponent(filtro[key])}&`;
        });

        try {
            const res = await fetch(url);
            destinos = await res.json();
            mostrarDestinos(destinos);
        } catch (error) {
            console.error("Error al obtener destinos:", error);
        }
    }

    function mostrarDestinos(listaDestinos) {
        contenedor.innerHTML = "";

        listaDestinos.forEach((destino, index) => {

            const destinoCard = document.createElement("div");
            destinoCard.classList.add("destino-card");

            destinoCard.innerHTML = `
                <img src="${destino.imagen}" alt="Imagen de ${destino.nombre}">
                <h3>${destino.nombre}</h3>
                <div class="detalles">
                    <p><strong>Moneda:</strong> ${destino.moneda}</p>
                    <p><strong>Idioma:</strong> ${Array.isArray(destino.idioma) ? destino.idioma.join(", ") : destino.idioma}</p>
                    <p><strong>Descripción:</strong> ${destino.descripcion}</p>
                </div>
            `;

            destinoCard.addEventListener("click", () => {
                indexActual = index;
                mostrarModal(destinos[indexActual]);
            });

            contenedor.appendChild(destinoCard);
        });
    }

    // MODAL
    const modal = document.getElementById("modal");
    const closeModal = document.getElementById("close-modal");
    const prevButton = document.getElementById("prev-modal");
    const nextButton = document.getElementById("next-modal");

    function mostrarModal(destino) {
        document.getElementById("modal-img").src = destino.imagen;
        document.getElementById("modal-name").textContent = destino.nombre;
        modal.style.display = "block";
    }

    function cambiarImagen(direccion) {
        indexActual += direccion;
        if (indexActual < 0) indexActual = destinos.length - 1;
        if (indexActual >= destinos.length) indexActual = 0;
        mostrarModal(destinos[indexActual]);
    }

    prevButton.addEventListener("click", () => cambiarImagen(-1));
    nextButton.addEventListener("click", () => cambiarImagen(1));
    closeModal.addEventListener("click", () => modal.style.display = "none");

    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") cambiarImagen(-1);
        if (e.key === "ArrowRight") cambiarImagen(1);
    });

    // Llamamos a la función para obtener y mostrar los destinos sin filtro inicial
    obtenerDestinos(); 
});
