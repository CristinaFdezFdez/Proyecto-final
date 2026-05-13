document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".nav-menu");

    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
        menu.classList.toggle("activo");
        toggle.textContent = menu.classList.contains("activo") ? "✕" : "☰";
    });

    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("activo");
            toggle.textContent = "☰";
        });
    });
});