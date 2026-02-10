function ModalImagen({ destino, onClose }) {
    if (!destino) return null;

    return (
        <div className="modal" onClick={onClose}>
        <img src={destino.imagen} />
        <h3>{destino.nombre}</h3>
        </div>
    );
}

export default ModalImagen;
