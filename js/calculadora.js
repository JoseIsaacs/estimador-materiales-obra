document.addEventListener('DOMContentLoaded', () => {
    console.log("Motor StructuraPro Activo");

    // Seleccionamos todos los enlaces de la barra de navegación superior
    const enlacesNav = document.querySelectorAll('nav a, .nav-item, [role="tab"]');
    
    enlacesNav.forEach(enlace => {
        enlace.addEventListener('click', (e) => {
            // Si no quieres que la página recargue, descomenta la siguiente línea:
            // e.preventDefault(); 
            
            const texto = enlace.innerText.trim().toUpperCase();
            console.log("Navegando a: " + texto);
            
            // Lógica simple para mostrar/ocultar secciones
            document.querySelectorAll('section, .modulo-contenido').forEach(sec => {
                sec.style.display = 'none';
            });
            
            // Aquí intentamos buscar una sección que se llame igual que el botón
            const seccionDestino = document.getElementById(texto.toLowerCase());
            if (seccionDestino) seccionDestino.style.display = 'block';
        });
    });
});