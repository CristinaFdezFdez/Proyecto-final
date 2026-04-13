import { useEffect, useState } from "react";

export default function Experiencias() {
    const [comentarios, setComentarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    
    const [nuevoComentario, setNuevoComentario] = useState({
        destino: "", 
        comentario: "",
        estrellas: 5
    });

    // 1. NUEVO ESTADO PARA LA IMAGEN
    const [archivo, setArchivo] = useState(null);

    const obtenerNombreUsuario = () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload.nombre && typeof payload.nombre === 'string') return payload.nombre;
            } catch { 
                // Ignoramos errores 
            }
        }

        const usuarioLocal = localStorage.getItem("usuario");
        if (usuarioLocal) {
            try {
                const obj = JSON.parse(usuarioLocal);
                if (obj.nombre) return String(obj.nombre);
            } catch {
                return usuarioLocal;
            }
        }
        
        return "Desconocido";
    };

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

        // 2. USAMOS FORMDATA EN LUGAR DE JSON PARA PODER ENVIAR ARCHIVOS
        const formData = new FormData();
        formData.append("destino", nuevoComentario.destino);
        formData.append("comentario", nuevoComentario.comentario);
        formData.append("estrellas", nuevoComentario.estrellas);
        
        if (archivo) {
            formData.append("imagen", archivo);
        }

        fetch("http://localhost:3000/comentarios", {
            method: "POST",
            headers: { 
                "Authorization": "Bearer " + token
            },
            body: formData
        })
        .then(res => {
            if (res.ok) {
                // Limpiamos el formulario
                setNuevoComentario({ destino: "", comentario: "", estrellas: 5 });
                setArchivo(null);
                document.getElementById("input-foto").value = ""; // Limpia el input visualmente
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

                    <div style={{ marginTop: "10px", marginBottom: "15px", textAlign: "left" }}>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "0.9rem" }}>
                            📸 Sube una foto de tu viaje:
                        </label>
                        <input 
                            id="input-foto"
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => setArchivo(e.target.files[0])} 
                            style={{ width: "100%", padding: "5px", border: "1px dashed #ccc", borderRadius: "5px" }}
                        />
                    </div>

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
                        <div className="card-body" style={{ textAlign: "left" }}>
                            <h4>📍 {c.destino}</h4> 
                            <p className="comentario-texto">"{c.comentario}"</p>
                            
                            {c.imagen && (
                            <div style={{ marginTop: "15px", textAlign: "center", backgroundColor: "#f3f4f6", borderRadius: "8px", padding: "10px" }}>
                                <img 
                                    src={c.imagen} 
                                    alt={`Viaje a ${c.destino}`} 
                                    style={{ maxWidth: "100%", borderRadius: "4px", maxHeight: "400px", objectFit: "contain" }}
                                />
                            </div>
                        )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}