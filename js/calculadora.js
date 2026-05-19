// js/calculadora.js
console.log("StructuraPro v3.4 - Cargando módulos...");

document.addEventListener('DOMContentLoaded', () => {
    // 1. NAVEGACIÓN (CONCR, MUROS, PISOS...)
    // Esta función busca cualquier clic en los botones de arriba
    const navButtons = document.querySelectorAll('nav a, .nav-item, [role="tab"]');
    
    navButtons.forEach(btn => {
        btn.onclick = (e) => {
            // e.preventDefault(); // Descomenta si no quieres que la URL cambie
            const modulo = btn.innerText.trim().split(' ')[0]; // Ejemplo: de "🏗 CONCR." saca "CONCR"
            console.log("Cambiando a módulo: " + modulo);
            
            // Ocultar todas las secciones
            document.querySelectorAll('section, .modulo-seccion').forEach(s => s.style.display = 'none');
            
            // Mostrar la sección que coincida (Asegúrate de que tus IDs en el HTML sean iguales)
            const target = document.getElementById(modulo.toLowerCase());
            if (target) target.style.display = 'block';
        };
    });

    // 2. CÁLCULO DE CONCRETO
    const calcularBtn = document.getElementById('btn-calcular');
    if (calcularBtn) {
        calcularBtn.onclick = () => {
            alert("Calculando materiales...");
            // Aquí va tu lógica de materiales
        };
    }
});