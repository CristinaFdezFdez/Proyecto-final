//CONEXIÓN AL SERVIDOR
const socket = io("http://localhost:3000");

// Leo el objeto 'nombre' 
const datosSesion = JSON.parse(localStorage.getItem("nombre"));

// Si existe el objeto y tiene un nombre, lo usamos. Si no, ponemos "Invitado"
const nombreUsuario = datosSesion && datosSesion.nombre ? datosSesion.nombre : "Invitado";

console.log("Conectado como:", nombreUsuario);

// ELEMENTOS DEL HTML
const cajaMensajes = document.getElementById("caja-mensajes");
const inputMensaje = document.getElementById("input-mensaje");
const btnEnviar = document.getElementById("btn-enviar");

//FUNCIÓN PARA ENVIAR 
function enviarMensaje() {
    const texto = inputMensaje.value.trim();
    
    if (texto !== "") {
        const datos = {
            usuario: nombreUsuario, 
            texto: texto,
            hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        socket.emit("mensaje_chat", datos);
        inputMensaje.value = "";
    }
}

// Eventos
btnEnviar.onclick = enviarMensaje;
inputMensaje.onkeypress = (e) => { if (e.key === "Enter") enviarMensaje(); };

//RECIBIR MENSAJES 
socket.on("mensaje_chat", (datos) => {
    const div = document.createElement("div");
    const esMio = datos.usuario === nombreUsuario;
    
    div.classList.add("message", esMio ? "mine" : "other");
    
    div.innerHTML = `
        <strong>${datos.usuario}</strong>
        <span>${datos.texto}</span>
        <small>${datos.hora}</small>
    `;

    cajaMensajes.appendChild(div);
    cajaMensajes.scrollTop = cajaMensajes.scrollHeight;
});