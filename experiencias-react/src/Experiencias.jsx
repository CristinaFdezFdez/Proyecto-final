import { useState } from "react";
import FormularioExperiencia from "./components/FormularioExperiencia";
import FiltrosExperiencias from "./components/FiltrosExperiencias";
import ListaExperiencias from "./components/ListaExperiencias";
import { useComentarios } from "./hooks/useComentarios";

export default function Experiencias() {
    const { comentarios, cargando, cargarComentarios } = useComentarios();

    const [categoriaActiva, setCategoriaActiva] = useState("todas");
    const [busquedaDestino, setBusquedaDestino] = useState("");

    const comentariosFiltrados = comentarios.filter((c) => {
        const coincideCategoria =
            categoriaActiva === "todas" || c.categoria === categoriaActiva;

        const coincideDestino =
            !busquedaDestino.trim() ||
            (c.destino || "").toLowerCase().includes(busquedaDestino.toLowerCase());

        return coincideCategoria && coincideDestino;
    });

    const limpiarFiltros = () => {
        setCategoriaActiva("todas");
        setBusquedaDestino("");
    };

    return (
        <div className="experiencias-container">
            <h2 className="titulo-seccion">Experiencias de otros viajeros</h2>

            <FormularioExperiencia onComentarioCreado={cargarComentarios} />

            <FiltrosExperiencias
                categoriaActiva={categoriaActiva}
                setCategoriaActiva={setCategoriaActiva}
                busquedaDestino={busquedaDestino}
                setBusquedaDestino={setBusquedaDestino}
                total={comentarios.length}
                visibles={comentariosFiltrados.length}
                limpiarFiltros={limpiarFiltros}
            />

            <ListaExperiencias
                comentarios={comentariosFiltrados}
                cargando={cargando}
            />
        </div>
    );
}