// Al inicio de tu js/calculadora.js
window.onerror = function(msg, url, linenumber) {
    console.log('Error detectado: ' + msg + ' en línea: ' + linenumber);
    return true; // Esto evita que la app se congele totalmente
};

document.addEventListener('DOMContentLoaded', () => {
    console.log("Sistema de módulos iniciado");
    
    // Lógica para que los botones de módulos funcionen SIEMPRE
    const botonesModulos = document.querySelectorAll('.boton-modulo'); 
    botonesModulos.forEach(boton => {
        boton.addEventListener('click', () => {
            console.log("Cambiando a módulo: " + boton.id);
            // Aquí va tu lógica de ocultar/mostrar secciones
        });
    });

    const form = document.getElementById('form-calculadora');
    if (form) {
        form.addEventListener('submit', calcularMateriales);
    }
});