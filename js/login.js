document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("token")) {
        window.location.href = "../index.html";
        return;
    }

    const loginForm = document.getElementById("loginForm");
    const loginMsg = document.getElementById("loginMsg");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // ── Helper para mensajes ────────────────────────────────────────────────
    function showMsg(text, type = "error") {
        loginMsg.innerText = text;
        loginMsg.style.color = type === "ok" ? "#27ae60" : type === "warn" ? "#e67e22" : "#e74c3c";
    }

    // ── Validación en tiempo real del email ─────────────────────────────────
    emailInput.addEventListener("input", () => {
        if (emailInput.value && !emailRegex.test(emailInput.value)) {
            emailInput.style.borderColor = "#e74c3c";
        } else {
            emailInput.style.borderColor = "";
        }
    });

    // ── Submit ──────────────────────────────────────────────────────────────
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            showMsg("❌ Por favor, completa todos los campos.");
            return;
        }

        if (!emailRegex.test(email)) {
            showMsg("❌ Introduce un email válido (ejemplo@correo.com).");
            emailInput.focus();
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
                localStorage.setItem("usuario", JSON.stringify({
                    nombre: data.usuario.nombre,
                    email: data.usuario.email
                }));
                showMsg("✅ Iniciando sesión...", "ok");
                setTimeout(() => {
                    window.location.href = "../index.html";
                }, 1500);
            } else {
                if (data.msg?.toLowerCase().includes("encontrado")) {
                    showMsg("❌ No existe ninguna cuenta con ese email.");
                    emailInput.style.borderColor = "#e74c3c";
                } else if (data.msg?.toLowerCase().includes("contraseña")) {
                    showMsg("❌ Contraseña incorrecta. Inténtalo de nuevo.");
                    passwordInput.style.borderColor = "#e74c3c";
                    passwordInput.value = "";
                    passwordInput.focus();
                } else {
                    showMsg(`❌ ${data.msg || "Error al iniciar sesión."}`);
                }
            }
        } catch (error) {
            showMsg("❌ Error de conexión con el servidor.");
        }
    });
});