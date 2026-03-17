module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("Nuevo usuario conectado al chat");

        // Escuchamos el evento con el objeto que trae usuario y mensaje
        socket.on("mensaje_chat", (data) => {
            // Reenviamos a todos los clientes 
            io.emit("mensaje_chat", data); 
        });

        socket.on("disconnect", () => {
            console.log("Usuario desconectado");
        });
    });
};