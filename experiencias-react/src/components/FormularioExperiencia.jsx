import { useState } from "react";
import { CATEGORIAS } from "../utils/categorias";
import { obtenerNombreUsuario } from "../utils/usuario";

export default function FormularioExperiencia({ onComentarioCreado }) {
    const [enviando, setEnviando] = useState(false);
    const [archivo, setArchivo] = useState(null);

    const [nuevoComentario, setNuevoComentario] = useState({
        destino: "",
        comentario: "",
        estrellas: 5,
        categoria: "ciudad",
    });

    const handleChange = (e) => {
        setNuevoComentario({
            ...nuevoComentario,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (enviando) return;
        setEnviando(true);

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Debes iniciar sesión para publicar.");
            setEnviando(false);
            return;
        }

        const formData = new FormData();
        formData.append("destino", nuevoComentario.destino);
        formData.append("comentario", nuevoComentario.comentario);
        formData.append("estrellas", nuevoComentario.estrellas);
        formData.append("categoria", nuevoComentario.categoria);

        if (archivo) {
            formData.append("imagen", archivo);
        }

        fetch("/comentarios", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token
            },
            body: formData
        })
            .then(res => {
                if (res.ok) {
                    setNuevoComentario({
                        destino: "",
                        comentario: "",
                        estrellas: 5,
                        categoria: "ciudad"
                    });

                    setArchivo(null);

                    const inputFoto = document.getElementById("input-foto");
                    if (inputFoto) inputFoto.value = "";

                    onComentarioCreado();
                } else {
                    res.json().then(err => alert(err.error));
                }
            })
            .catch(err => console.error(err))
            .finally(() => setEnviando(false));
    };

    return (
        <div className="formulario-card">
            <h3>✍️ Comparte tu aventura</h3>

            <div className="usuario-publicando">
                Usuario: <strong>{obtenerNombreUsuario()}</strong>
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="destino"
                    placeholder="¿Qué destino visitaste?"
                    value={nuevoComentario.destino}
                    onChange={handleChange}
                    required
                    className="input-style"
                />

                <textarea
                    name="comentario"
                    placeholder="Cuéntanos tu experiencia..."
                    value={nuevoComentario.comentario}
                    onChange={handleChange}
                    required
                    className="textarea-style"
                ></textarea>

                <select
                    name="categoria"
                    value={nuevoComentario.categoria}
                    onChange={handleChange}
                    className="select-style"
                    style={{ width: "100%", marginBottom: "10px" }}
                >
                    {CATEGORIAS.map(cat => (
                        <option key={cat.value} value={cat.value}>
                            {cat.label}
                        </option>
                    ))}
                </select>

                <div style={{ marginTop: "10px", marginBottom: "15px", textAlign: "left" }}>
                    <label
                        style={{
                            display: "block",
                            marginBottom: "5px",
                            fontWeight: "bold",
                            fontSize: "0.9rem"
                        }}
                    >
                        📸 Sube una foto de tu viaje:
                    </label>

                    <input
                        id="input-foto"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setArchivo(e.target.files[0])}
                        style={{
                            width: "100%",
                            padding: "5px",
                            border: "1px dashed #ccc",
                            borderRadius: "5px"
                        }}
                    />
                </div>

                <div className="form-footer">
                    <select
                        name="estrellas"
                        value={nuevoComentario.estrellas}
                        onChange={handleChange}
                        className="select-style"
                        style={{ width: "auto", marginBottom: 0 }}
                    >
                        <option value="5">⭐⭐⭐⭐⭐ Excelente</option>
                        <option value="4">⭐⭐⭐⭐ Muy bueno</option>
                        <option value="3">⭐⭐⭐ Normal</option>
                        <option value="2">⭐⭐ Regular</option>
                        <option value="1">⭐ Malo</option>
                    </select>

                    <button
                        type="submit"
                        className="btn-publicar"
                        disabled={enviando}
                    >
                        {enviando ? "Publicando..." : "Publicar"}
                    </button>
                </div>
            </form>
        </div>
    );
}