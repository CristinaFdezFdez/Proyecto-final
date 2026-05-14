export const CATEGORIAS = [
    { value: "ciudad", label: "🏙️ Ciudad", color: "#0a6aa6" },
    { value: "naturaleza", label: "🌿 Naturaleza", color: "#7D8C57" },
    { value: "playa", label: "🏖️ Playa", color: "#00b4d8" },
    { value: "cultura", label: "🏛️ Cultura", color: "#9b5de5" },
    { value: "gastronomia", label: "🍷 Gastronomía", color: "#e63946" },
];

export const getCategoria = (value) =>
    CATEGORIAS.find(c => c.value === value) || { label: "🌍 Viaje", color: "#888" };