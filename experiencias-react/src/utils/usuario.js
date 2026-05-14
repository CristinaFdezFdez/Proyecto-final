export const obtenerNombreUsuario = () => {
    const token = localStorage.getItem("token");

    if (token) {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            if (payload.nombre && typeof payload.nombre === "string") {
                return payload.nombre;
            }
        } catch {
            // Token malformado, usamos fallback
        }
    }

    const usuarioLocal = localStorage.getItem("usuario");

    if (usuarioLocal) {
        try {
            const obj = JSON.parse(usuarioLocal);
            if (obj.nombre) return String(obj.nombre);
        } catch {
            return usuarioLocal;
        }
    }

    return "Desconocido";
};