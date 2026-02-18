module.exports = function(io) {
    io.on("connection", (socket) => {
        console.log("⚡ Nuevo viajero conectado:", socket.id);

        socket.on("mensaje_chat", (datos) => {
            console.log(`Mensaje de ${datos.usuario}: ${datos.texto}`);
            io.emit("mensaje_chat", datos);
        });

        socket.on("disconnect", () => {
            console.log("Usuario salió del chat");
        });
    });
};