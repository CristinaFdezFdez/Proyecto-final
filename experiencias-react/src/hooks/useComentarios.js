import { useEffect, useState } from "react";

export function useComentarios() {
    const [comentarios, setComentarios] = useState([]);
    const [cargando, setCargando] = useState(true);

    const cargarComentarios = () => {
        setCargando(true);

        fetch("/comentarios")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setComentarios(data);
                }
            })
            .catch(err => console.error(err))
            .finally(() => setCargando(false));
    };

    useEffect(() => {
    const cargarInicial = async () => {
        await cargarComentarios();
    };

    cargarInicial();
}, []);
    return { comentarios, cargando, cargarComentarios };
}