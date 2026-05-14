import { getCategoria } from "../utils/categorias";

export default function TarjetaExperiencia({ experiencia }) {
    const cat = getCategoria(experiencia.categoria);

    return (
        <div className="card-experiencia">
            <div className="card-header">
                <div className="usuario-info">
                    <img
                        src={`https://ui-avatars.com/api/?name=${experiencia.nombre || "User"}&background=0a6aa6&color=fff&size=60&bold=true`}
                        alt="Avatar"
                        className="avatar"
                    />

                    <div>
                        <strong className="nombre-usuario">
                            {experiencia.nombre || "Anónimo"}
                        </strong>
                        <small className="fecha-publicacion">
                            {experiencia.fecha_comentario}
                        </small>
                    </div>
                </div>

                <div className="valoracion">
                    {"⭐".repeat(experiencia.estrellas || 5)}
                </div>
            </div>

            <div className="card-body" style={{ textAlign: "left" }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "6px",
                        flexWrap: "wrap"
                    }}
                >
                    <h4 style={{ margin: 0 }}>📍 {experiencia.destino}</h4>

                    {experiencia.categoria && (
                        <span
                            style={{
                                backgroundColor: cat.color,
                                color: "#fff",
                                fontSize: "0.75rem",
                                fontWeight: "600",
                                padding: "2px 10px",
                                borderRadius: "20px",
                                whiteSpace: "nowrap"
                            }}
                        >
                            {cat.label}
                        </span>
                    )}
                </div>

                <p className="comentario-texto">"{experiencia.comentario}"</p>

                {experiencia.imagen && (
                    <div
                        style={{
                            marginTop: "15px",
                            textAlign: "center",
                            backgroundColor: "#f3f4f6",
                            borderRadius: "8px",
                            padding: "10px"
                        }}
                    >
                        <img
                            src={experiencia.imagen}
                            alt={`Viaje a ${experiencia.destino}`}
                            style={{
                                maxWidth: "100%",
                                borderRadius: "4px",
                                maxHeight: "400px",
                                objectFit: "contain"
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}