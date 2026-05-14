import { CATEGORIAS } from "../utils/categorias";

export default function FiltrosExperiencias({
    categoriaActiva,
    setCategoriaActiva,
    busquedaDestino,
    setBusquedaDestino,
    total,
    visibles,
    limpiarFiltros
}) {
    return (
        <section className="filtros-experiencias">
            <h3>Filtra experiencias</h3>

            <input
                type="text"
                placeholder="Buscar por destino..."
                value={busquedaDestino}
                onChange={(e) => setBusquedaDestino(e.target.value)}
                className="input-busqueda-experiencias"
            />

            <div className="chips-categorias">
                <button
                    type="button"
                    className={categoriaActiva === "todas" ? "chip-categoria activo" : "chip-categoria"}
                    onClick={() => setCategoriaActiva("todas")}
                >
                    🌍 Todas
                </button>

                {CATEGORIAS.map(cat => (
                    <button
                        type="button"
                        key={cat.value}
                        className={categoriaActiva === cat.value ? "chip-categoria activo" : "chip-categoria"}
                        onClick={() => setCategoriaActiva(cat.value)}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            <div className="contador-experiencias">
                Mostrando <strong>{visibles}</strong> de <strong>{total}</strong> experiencias
            </div>

            {(categoriaActiva !== "todas" || busquedaDestino.trim()) && (
                <button
                    type="button"
                    className="btn-limpiar-filtros"
                    onClick={limpiarFiltros}
                >
                    Limpiar filtros
                </button>
            )}
        </section>
    );
}