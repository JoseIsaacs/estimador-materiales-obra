// 1. Verificación inmediata
console.log("Calculador de Obra: Motor en marcha");

// 2. Función de Navegación (Módulos)
function mostrarModulo(id) {
    // Busca todas las secciones y las oculta
    const secciones = document.querySelectorAll('.modulo-seccion, section, .tab-content');
    secciones.forEach(s => s.style.display = 'none');
    
    // Muestra la sección que pediste
    const destino = document.getElementById(id);
    if (destino) {
        destino.style.display = 'block';
        console.log("Cambiado a: " + id);
    } else {
        alert("No se encontró la sección: " + id);
    }
}

// 3. Inicialización segura
document.addEventListener('DOMContentLoaded', () => {
    // Hacer que los botones de navegación funcionen
    // Asumiendo que tus botones tienen IDs o clases específicas
    const btnLosa = document.querySelector('[href="#losa"], #btn-losa');
    if(btnLosa) btnLosa.onclick = () => mostrarModulo('modulo-losa');

    const btnZapata = document.querySelector('[href="#zapata"], #btn-zapata');
    if(btnZapata) btnZapata.onclick = () => mostrarModulo('modulo-zapata');

    // Escuchar el formulario de cálculo
    const form = document.getElementById('form-calculadora');
    if (form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            ejecutarCalculo();
        };
    }
});

function ejecutarCalculo() {
    try {
        const largo = parseFloat(document.getElementById('largo').value) || 0;
        const ancho = parseFloat(document.getElementById('ancho').value) || 0;
        const espesor = 0.10; // Valor por defecto para no fallar

        const area = largo * ancho;
        const volumen = area * espesor * 1.07; // 7% desperdicio

        const resultadoDiv = document.getElementById('resultados');
        if (resultadoDiv) {
            resultadoDiv.innerHTML = `
                <div style="background:#e3f2fd; padding:15px; border-radius:8px;">
                    <p><strong>Área:</strong> ${area.toFixed(2)} m²</p>
                    <p><strong>Volumen (+7%):</strong> ${volumen.toFixed(2)} m³</p>
                    <p><strong>Sacos de Cemento:</strong> ${Math.ceil(volumen * 7)}</p>
                </div>
            `;
        }
    } catch (err) {
        alert("Error en el cálculo: " + err.message);
    }
}