import { useEffect, useState } from "react";

export default function Experiencias() {
    const [comentarios, setComentarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    
    const [nuevoComentario, setNuevoComentario] = useState({
        destino: "", 
        comentario: "",
        estrellas: 5
    });

    const cargarComentarios = () => {
        fetch("http://localhost:3000/comentarios")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setComentarios(data);
                setCargando(false);
            })
            .catch(err => { console.error(err); setCargando(false); });
    };

    useEffect(() => { cargarComentarios(); }, []);

    const handleChange = (e) => {
        setNuevoComentario({
            ...nuevoComentario,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Debes iniciar sesión para publicar.");
            return;
        }

        fetch("http://localhost:3000/comentarios", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(nuevoComentario)
        })
        .then(res => {
            if (res.ok) {
                setNuevoComentario({ destino: "", comentario: "", estrellas: 5 });
                cargarComentarios();
            } else {
                res.json().then(err => alert(err.error));
            }
        })
        .catch(err => console.error(err));
    };

    return (
        <div className="experiencias-container">
            <h2 className="titulo-seccion">Experiencias de otros viajeros</h2>

            <div className="formulario-card">
                <h3>✍️ Comparte tu aventura</h3>
                
                <div className="usuario-publicando">
                    Usuario: <strong>{localStorage.getItem("usuario") || "Desconocido"}</strong>
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

                    <div className="form-footer">
                        <select 
                            name="estrellas" 
                            value={nuevoComentario.estrellas} 
                            onChange={handleChange} 
                            className="select-style" 
                            style={{width: "auto", marginBottom: 0}}
                        >
                            <option value="5">⭐⭐⭐⭐⭐ Excelente</option>
                            <option value="4">⭐⭐⭐⭐ Muy bueno</option>
                            <option value="3">⭐⭐⭐ Normal</option>
                            <option value="2">⭐⭐ Regular</option>
                            <option value="1">⭐ Malo</option>
                        </select>
                        <button type="submit" className="btn-publicar">Publicar</button>
                    </div>
                </form>
            </div>

            {cargando && <p className="text-center">Cargando experiencias...</p>}
            
            <div className="grid-experiencias">
                {comentarios.map((c, i) => (
                    <div key={i} className="card-experiencia">
                        <div className="card-header">
                            <div className="usuario-info">
                                <img 
                                    src={`https://ui-avatars.com/api/?name=${c.nombre || "User"}&background=0a6aa6&color=fff&size=60&bold=true`} 
                                    alt="Avatar" 
                                    className="avatar" 
                                />
                                <div>
                                    <strong className="nombre-usuario">{c.nombre || "Anónimo"}</strong>
                                    <small className="fecha-publicacion">{c.fecha_comentario}</small>
                                </div>
                            </div>
                            <div className="valoracion">{"⭐".repeat(c.estrellas || 5)}</div>
                        </div>
                        <div className="card-body">
                            <h4>📍 {c.destino}</h4> 
                            <p className="comentario-texto">"{c.comentario}"</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}