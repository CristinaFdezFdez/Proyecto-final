import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:3000/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
        localStorage.setItem("token", data.token);
        setMsg("Login correcto");
        } else {
        setMsg(data.msg);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <h2>Login ViajaMás</h2>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
        />
        <button>Entrar</button>
        <p>{msg}</p>
        </form>
    );
}
