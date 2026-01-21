document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    const registerMsg = document.getElementById("register-msg");

    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Obtener valores del formulario
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Validaciones
        if (!nombre || !email || !password) {
            registerMsg.innerText = "❌ Todos los campos son obligatorios.";
            return;
        }

        // Enviar datos al backend
        try {
            const response = await fetch("http://localhost:3000/usuarios/registro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                registerMsg.innerText = "✅ Registro exitoso. Redirigiendo...";
                setTimeout(() => {
                    window.location.href = "iniciar-sesion.html";
                }, 2000);
            } else {
                registerMsg.innerText = `❌ ${data.error || "Error en el registro"}`;
            }
        } catch (error) {
            registerMsg.innerText = "❌ Error de conexión con el servidor.";
        }
    });
});
