function Filtros({ onFiltrar }) {

    const handleSubmit = (e) => {
        e.preventDefault();

        const nombre = e.target.nombre.value;
        const moneda = e.target.moneda.value;
        const idioma = e.target.idioma.value;

        const params = new URLSearchParams();
        if (nombre) params.append("nombre", nombre);
        if (moneda) params.append("moneda", moneda);
        if (idioma) params.append("idioma", idioma);

        onFiltrar("?" + params.toString());
    };

    return (
        <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="País" />
        <input name="moneda" placeholder="Moneda" />
        <input name="idioma" placeholder="Idioma" />
        <button>Filtrar</button>
        </form>
    );
}

export default Filtros;
