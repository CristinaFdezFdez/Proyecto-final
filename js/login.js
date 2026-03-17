document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("token")) {
        window.location.href = "../index.html"; // Redirigir al usuario si ya está logueado
        return;
    }

    const loginForm = document.getElementById("loginForm");
    const loginMsg = document.getElementById("loginMsg");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!email || !password) {
            loginMsg.innerText = "❌ Por favor, completa todos los campos.";
            loginMsg.style.color = "red";
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/usuarios/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("usuario", JSON.stringify({ nombre: data.usuario.nombre, email: data.usuario.email }));
                loginMsg.innerText = "Iniciando ...";
                loginMsg.style.color = "green";

                setTimeout(() => {
                    window.location.href = "../index.html"; // Redirigir al index
                }, 1500);
            } else {
                loginMsg.innerText = `❌ ${data.error || "Error al iniciar sesión."}`;
                loginMsg.style.color = "red";
            }
        } catch (error) {
            loginMsg.innerText = "❌ Error de conexión con el servidor.";
            loginMsg.style.color = "red";
        }
    });
});
