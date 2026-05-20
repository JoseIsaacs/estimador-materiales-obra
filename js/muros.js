// js/muros.js
function calcM() {
  const area = parseFloat(document.getElementById('m_area').value);
  const bloqueTipo = document.getElementById('m_bloque').value;
  
  if (isNaN(area) || area <= 0) {
    toast('Ingrese un área válida para muros');
    return;
  }
  
  // Densidad de bloques según espesor (bloques/m²)
  let rho;
  if (bloqueTipo === '8') {
    rho = 16.5;   // 8 cm - tabique
  } else {
    rho = 12.5;   // 12, 15, 20 cm - interior/exterior/estructural
  }
  
  const bloques = Math.ceil(area * rho * 1.05); // 5% desperdicio
  const cemento = area * 0.15;  // sacos de 50 kg
  const arena = area * 0.02;    // m³ de arena
  const agua = area * 10;       // litros de agua
  
  // Actualizar resultados en pantalla
  document.getElementById('mb').textContent = bloques;
  document.getElementById('mc').textContent = cemento.toFixed(1);
  document.getElementById('ma').textContent = arena.toFixed(2);
  document.getElementById('mw').textContent = Math.round(agua);
  
  // Mostrar el bloque de resultados
  const res = document.getElementById('res-m');
  if (res) res.classList.add('show');
  
  toast('Muros calculados');
}