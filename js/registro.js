document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    const registerMsg = document.getElementById("register-msg");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // ── Helper para mensajes ────────────────────────────────────────────────
    function showMsg(text, type = "error") {
        registerMsg.innerText = text;
        registerMsg.dataset.type = type;
        registerMsg.style.color = type === "warn" ? "#e67e22" : type === "ok" ? "#27ae60" : "#e74c3c";
    }

    // ── Validación en tiempo real del email ─────────────────────────────────
    emailInput.addEventListener("input", () => {
        if (emailInput.value && !emailRegex.test(emailInput.value)) {
            emailInput.style.borderColor = "#e74c3c";
            showMsg("⚠️ El email no tiene un formato válido.", "warn");
        } else {
            emailInput.style.borderColor = "";
            if (registerMsg.dataset.type === "warn") registerMsg.innerText = "";
        }
    });

    // ── Validación en tiempo real de la contraseña ──────────────────────────
    passwordInput.addEventListener("input", () => {
        const val = passwordInput.value;
        if (val.length > 0 && val.length < 6) {
            passwordInput.style.borderColor = "#e74c3c";
            showMsg("⚠️ La contraseña debe tener al menos 6 caracteres.", "warn");
        } else {
            passwordInput.style.borderColor = val.length >= 6 ? "#27ae60" : "";
            if (registerMsg.dataset.type === "warn") registerMsg.innerText = "";
        }
    });

    // ── Submit ──────────────────────────────────────────────────────────────
    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!nombre || !email || !password) {
            showMsg("❌ Todos los campos son obligatorios.");
            return;
        }

        if (!emailRegex.test(email)) {
            showMsg("❌ Introduce un email válido (ejemplo@correo.com).");
            emailInput.focus();
            return;
        }

        if (password.length < 6) {
            showMsg("❌ La contraseña debe tener al menos 6 caracteres.");
            passwordInput.focus();
            return;
        }

        if (nombre.length < 2) {
            showMsg("❌ El nombre debe tener al menos 2 caracteres.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/usuarios/registro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                showMsg("✅ Registro exitoso. Redirigiendo...", "ok");
                setTimeout(() => {
                    window.location.href = "iniciar-sesion.html";
                }, 2000);
            } else {
                if (data.msg?.includes("email")) {
                    showMsg("❌ Este email ya está registrado. ¿Ya tienes cuenta?");
                    emailInput.style.borderColor = "#e74c3c";
                } else {
                    showMsg(`❌ ${data.msg || "Error en el registro"}`);
                }
            }
        } catch (error) {
            showMsg("❌ Error de conexión con el servidor. Inténtalo de nuevo.");
        }
    });
});