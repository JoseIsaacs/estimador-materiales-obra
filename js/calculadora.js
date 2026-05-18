/**
 * Calculadora de Materiales de Construcción Pro
 * Basado en ACI 318-19, REP/SPIA, COPANIT
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-calculadora');
  if (form) {
    form.addEventListener('submit', calcularMateriales);
  }
});

function calcularMateriales(event) {
  event.preventDefault();

  // Parámetros técnicos (Nivel Pro)
  const FACTOR_DESPERDICIO = 1.07; // 7% de margen de error en obra
  const RENDIMIENTO_CEMENTO_CONCRETO = 7; // Sacos por m³ (mezcla estándar 3000 psi)
  const RENDIMIENTO_CEMENTO_PEGADO = 0.55; // Sacos por m² de pared (bloque estándar)

  // Obtener valores
  const largo = parseFloat(document.getElementById('largo').value);
  const ancho = parseFloat(document.getElementById('ancho').value);
  const alto = parseFloat(document.getElementById('alto').value);
  const tipoBloque = document.getElementById('tipo-bloque').value;
  // Si añades un input para espesor, úsalo aquí. Si no, 0.10m por defecto.
  const espesorLosa = document.getElementById('espesor') ? parseFloat(document.getElementById('espesor').value) : 0.10;

  if (!validarEntradas(largo, ancho, alto)) return;

  // Cálculos base
  const areaPiso = largo * ancho;
  const perimetro = 2 * (largo + ancho);
  const areaParedes = perimetro * alto;
  
  // Volumen con desperdicio aplicado
  const volumenConcreto = (areaPiso * espesorLosa) * FACTOR_DESPERDICIO;

  // Bloques con desperdicio
  const bloquesBase = calcularBloques(areaParedes, tipoBloque);
  const bloquesFinal = Math.ceil(bloquesBase * FACTOR_DESPERDICIO);

  // Cemento: (Concreto + Pegado de bloques)
  const cementoConcreto = volumenConcreto * RENDIMIENTO_CEMENTO_CONCRETO;
  const cementoPegado = areaParedes * RENDIMIENTO_CEMENTO_PEGADO;
  const cementoTotal = Math.ceil(cementoConcreto + cementoPegado);

  const arena = (volumenConcreto * 0.50).toFixed(2);
  const grava = (volumenConcreto * 0.75).toFixed(2);

  mostrarResultados({
    areaPiso,
    areaParedes,
    volumenConcreto,
    bloques: bloquesFinal,
    cemento: cementoTotal,
    arena,
    grava,
    tipoBloque
  });
}

// ... Mantener funciones validarEntradas, calcularBloques y mostrarResultados ...