function DestinoCard({ destino, onClick }) {
    return (
        <div className="card" onClick={onClick}>
        <img src={destino.imagen} alt={destino.nombre} />
        <h3>{destino.nombre}</h3>
        <p><strong>Moneda:</strong> {destino.moneda}</p>
        <p><strong>Idioma:</strong> {
            Array.isArray(destino.idioma)
            ? destino.idioma.join(", ")
            : destino.idioma
        }</p>
        <p>{destino.descripcion}</p>
        </div>
    );
}

export default DestinoCard;
