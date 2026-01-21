async function obtenerRecomendaciones() {
    try {
        const respuesta = await fetch("http://localhost:3000/destinos");
        let destinos = await respuesta.json();

        // Por si hay menos de 5 destinos en la BD
        const cantidad = Math.min(5, destinos.length);

        let seleccionados = [];
        let indicesSeleccionados = new Set();

        while (seleccionados.length < cantidad) {
            let index = Math.floor(Math.random() * destinos.length);

            if (!indicesSeleccionados.has(index)) {
                indicesSeleccionados.add(index);
                seleccionados.push(destinos[index]); 
            }
        }

        mostrarRecomendaciones(seleccionados);
    } catch (error) {
        console.error("Error al obtener los destinos recomendados:", error);
    }
}

function mostrarRecomendaciones(destinos) {
    const carousel = document.getElementById("recomendaciones-carousel");

    carousel.innerHTML = "";

    destinos.forEach(destino => {
        const item = document.createElement("div");
        item.classList.add("item");

        item.innerHTML = `
            <img src="${destino.imagen}" alt="${destino.nombre}">
            <p>${destino.nombre}</p>
        `;

        carousel.appendChild(item);
    });
}

obtenerRecomendaciones();
