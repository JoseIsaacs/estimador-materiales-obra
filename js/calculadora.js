console.log("Iniciando sistema...");

// Función para cambiar de módulos (Asegúrate de que tus botones tengan estas clases)
function cambiarModulo(idModulo) {
    console.log("Cambiando a: " + idModulo);
    // Ocultar todas las secciones
    document.querySelectorAll('.modulo-seccion').forEach(sec => {
        sec.style.display = 'none';
    });
    // Mostrar la elegida
    const target = document.getElementById(idModulo);
    if (target) target.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Cargado");

    // Configurar botones de módulos manualmente por ID
    // Ajusta estos IDs a los que tengas en tu HTML
    const btnLosa = document.getElementById('btn-losa');
    if(btnLosa) btnLosa.onclick = () => cambiarModulo('seccion-losa');

    const btnZapata = document.getElementById('btn-zapata');
    if(btnZapata) btnZapata.onclick = () => cambiarModulo('seccion-zapata');

    // Lógica de cálculo ultra-simple para probar
    const form = document.getElementById('form-calculadora');
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            alert("Calculando...");
        };
    }
});