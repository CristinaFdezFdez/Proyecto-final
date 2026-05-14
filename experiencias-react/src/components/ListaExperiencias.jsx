import TarjetaExperiencia from "./TarjetaExperiencia";

export default function ListaExperiencias({ comentarios, cargando }) {
    if (cargando) {
        return <p className="text-center">Cargando experiencias...</p>;
    }

    if (comentarios.length === 0) {
        return (
            <div className="estado-vacio-experiencias">
                <h3>No hay experiencias con esos filtros</h3>
                <p>Prueba con otra categoría o busca otro destino.</p>
            </div>
        );
    }

    return (
        <div className="grid-experiencias">
            {comentarios.map((comentario, i) => (
                <TarjetaExperiencia
                    key={comentario._id || i}
                    experiencia={comentario}
                />
            ))}
        </div>
    );
}