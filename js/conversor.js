document.addEventListener("DOMContentLoaded", async () => {
    const apiKey = "69314206086ab0364ce03c2c";  // Clave de la API para acceder a los datos de conversión de moneda
    const urlBase = "https://v6.exchangerate-api.com/v6/"; // URL base de la API

    // Selección de elementos del DOM
    const cantidadInput = document.getElementById("cantidad"); 
    const monedaOrigenSelect = document.getElementById("moneda-origen");
    const monedaDestinoSelect = document.getElementById("moneda-destino");
    const botonConvertir = document.getElementById("convertir");
    const resultadoTexto = document.getElementById("resultado"); 

    // Función para cargar la lista de monedas disponibles desde la API
    async function cargarMonedas() {
        try {
            const respuesta = await fetch(`${urlBase}${apiKey}/codes`); // Llamada a la API para obtener las monedas soportadas
            const datos = await respuesta.json(); // Convertimos la respuesta a formato JSON

            if (datos.result === "success") { // Verificamos si la respuesta es exitosa
                datos.supported_codes.forEach(([codigo, nombre]) => { // Iteramos sobre las monedas obtenidas
                    const opcion1 = new Option(`${nombre} (${codigo})`, codigo); // Creamos una opción para el select de origen
                    const opcion2 = new Option(`${nombre} (${codigo})`, codigo); // Creamos una opción para el select de destino
                    monedaOrigenSelect.appendChild(opcion1); // Agregamos la opción al select de origen
                    monedaDestinoSelect.appendChild(opcion2); // Agregamos la opción al select de destino
                });
            }
        } catch (error) {
            console.error("Error al obtener monedas:", error); 
        }
    }

    // Función para convertir la moneda seleccionada
    async function convertirMoneda() {
        const cantidad = parseFloat(cantidadInput.value); // Obtenemos el valor ingresado por el usuario y lo convertimos en número
        const monedaOrigen = monedaOrigenSelect.value; // Obtenemos la moneda de origen seleccionada
        const monedaDestino = monedaDestinoSelect.value; // Obtenemos la moneda de destino seleccionada

        // Validamos que la cantidad ingresada sea un número válido y mayor que 0
        if (isNaN(cantidad) || cantidad <= 0) {
            resultadoTexto.textContent = "Ingrese una cantidad válida."; // Mostramos un mensaje de error
            return; // Salimos de la función
        }

        try {
            // Llamamos a la API para obtener la conversión entre las monedas seleccionadas
            const respuesta = await fetch(`${urlBase}${apiKey}/pair/${monedaOrigen}/${monedaDestino}/${cantidad}`);
            const datos = await respuesta.json(); // Convertimos la respuesta a JSON

            if (datos.result === "success") { // Si la conversión fue bien
                resultadoTexto.textContent = `${cantidad} ${monedaOrigen} = ${datos.conversion_result.toFixed(2)} ${monedaDestino}`;
            } else {
                resultadoTexto.textContent = "Error en la conversión."; // Mostramos un mensaje de error en caso de fallo
            }
        } catch (error) {
            resultadoTexto.textContent = "No se pudo obtener la tasa de cambio."; // Mensaje de error para el usuario
        }
    }

    // Agregamos el evento al botón para ejecutar la conversión al hacer clic
    botonConvertir.addEventListener("click", convertirMoneda);

    // Cargamos las monedas al cargar la página
    cargarMonedas();
});
