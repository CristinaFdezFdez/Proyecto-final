const socket = io("http://localhost:3000");

const cajaMensajes = document.getElementById("caja-mensajes");
const inputMensaje = document.getElementById("input-mensaje");
const btnEnviar = document.getElementById("btn-enviar");

function obtenerNombreUsuario() {
    // Intento sacar mi nombre desencriptando el Token JWT que guardé en el login 
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const payload = token.split('.')[1];
            const decoded = JSON.parse(atob(payload));
            if (decoded.nombre) return decoded.nombre;
        } catch (e) {}
    }

    // Si lo del token falla, busco en el objeto usuario normal por si acaso
    const datosSesion = localStorage.getItem("usuario");
    if (datosSesion) {
        try {
            const userObj = JSON.parse(datosSesion);
            if (userObj && userObj.nombre) return userObj.nombre;
        } catch (e) {}
    }

    return "Invitado";
}

function enviarMensaje() {
    const texto = inputMensaje.value.trim();
    
    if (texto !== "") {
        const datos = {
            usuario: obtenerNombreUsuario(),
            texto: texto,
            // Saco la hora y minuto exacto de ahora mismo
            hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        socket.emit("mensaje_chat", datos);
        inputMensaje.value = "";
    }
}

btnEnviar.onclick = enviarMensaje;
inputMensaje.onkeypress = (e) => { 
    if (e.key === "Enter") enviarMensaje(); 
};

socket.on("mensaje_chat", (datos) => {
    const div = document.createElement("div");
    
    // Compruebo si el mensaje lo he enviado yo para ponerle mi clase CSS y que salga a un lado u otro
    const esMio = datos.usuario === obtenerNombreUsuario();
    div.classList.add("message", esMio ? "mine" : "other");
    
    div.innerHTML = `
        <strong>${datos.usuario}</strong>
        <span>${datos.texto}</span>
        <small style="font-size: 0.7em; color: gray; margin-left: 8px;">${datos.hora}</small>
    `;

    cajaMensajes.appendChild(div);
    cajaMensajes.scrollTop = cajaMensajes.scrollHeight;
});