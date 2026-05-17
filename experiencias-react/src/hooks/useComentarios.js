import { useEffect, useState } from "react";

export function useComentarios() {
    const [comentarios, setComentarios] = useState([]);
    const [cargando, setCargando] = useState(true);

    const cargarComentarios = () => {
        setCargando(true);
        const token = localStorage.getItem("token");

        fetch("/comentarios", {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        })
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