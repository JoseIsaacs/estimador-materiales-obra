/**
 * Calculadora de Materiales de Construcción
 * Basado en ACI 318-19, REP/SPIA, COPANIT
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-calculadora');
  if (form) {
    form.addEventListener('submit', calcularMateriales);
  }
});

/**
 * Función principal de cálculo
 * @param {Event} event - Evento de envío del formulario
 */
function calcularMateriales(event) {
  event.preventDefault();

  // Obtener valores del formulario
  const largo = parseFloat(document.getElementById('largo').value);
  const ancho = parseFloat(document.getElementById('ancho').value);
  const alto = parseFloat(document.getElementById('alto').value);
  const tipoBloque = document.getElementById('tipo-bloque').value;

  // Validación de entradas
  if (!validarEntradas(largo, ancho, alto)) {
    return;
  }

  // Cálculo de área y volumen
  const areaPiso = largo * ancho;
  const perimetro = 2 * (largo + ancho);
  const areaParedes = perimetro * alto;
  const volumenConcreto = areaPiso * 0.1; // Ejemplo: losa de 10 cm

  // Cálculo de bloques según tipo
  const bloques = calcularBloques(areaParedes, tipoBloque);

  // Cálculo de otros materiales (ejemplo)
  const cemento = Math.ceil(volumenConcreto * 7); // ~7 sacos/m³
  const arena = (volumenConcreto * 0.5).toFixed(2); // m³
  const grava = (volumenConcreto * 0.75).toFixed(2); // m³

  // Mostrar resultados
  mostrarResultados({
    areaPiso,
    areaParedes,
    volumenConcreto,
    bloques,
    cemento,
    arena,
    grava,
    tipoBloque
  });
}

/**
 * Valida que las entradas sean números positivos
 */
function validarEntradas(largo, ancho, alto) {
  if (isNaN(largo) || isNaN(ancho) || isNaN(alto)) {
    alert('Por favor, ingrese valores numéricos válidos.');
    return false;
  }
  if (largo <= 0 || ancho <= 0 || alto <= 0) {
    alert('Las dimensiones deben ser mayores a cero.');
    return false;
  }
  return true;
}

/**
 * Calcula cantidad de bloques según área y tipo
 * @param {number} areaParedes - Área total de paredes en m²
 * @param {string} tipoBloque - Tipo de bloque seleccionado
 * @returns {number} Cantidad de bloques
 */
function calcularBloques(areaParedes, tipoBloque) {
  const bloquesPorMetro = {
    'estandar': 12.5,     // Bloque estándar de cemento
    'termico': 10,        // Bloque térmico (más grande)
    'estructural': 11.5   // Bloque estructural
  };
  const factor = bloquesPorMetro[tipoBloque] || 12.5;
  return Math.ceil(areaParedes * factor);
}

/**
 * Muestra los resultados en el DOM
 * @param {Object} datos - Objeto con los resultados calculados
 */
function mostrarResultados(datos) {
  const resultadosDiv = document.getElementById('resultados');
  if (!resultadosDiv) {
    console.error('No se encontró el contenedor de resultados');
    return;
  }

  resultadosDiv.innerHTML = `
    <h2>Resultados del Cálculo</h2>
    <ul>
      <li>Área del piso: <strong>${datos.areaPiso.toFixed(2)} m²</strong></li>
      <li>Área de paredes: <strong>${datos.areaParedes.toFixed(2)} m²</strong></li>
      <li>Volumen de concreto (losa 10cm): <strong>${datos.volumenConcreto.toFixed(2)} m³</strong></li>
      <li>Bloques necesarios (${datos.tipoBloque}): <strong>${datos.bloques} unidades</strong></li>
      <li>Cemento: <strong>${datos.cemento} sacos</strong></li>
      <li>Arena: <strong>${datos.arena} m³</strong></li>
      <li>Grava: <strong>${datos.grava} m³</strong></li>
    </ul>
    <p><em>Cálculo basado en ACI 318-19, REP/SPIA, COPANIT</em></p>
  `;
}