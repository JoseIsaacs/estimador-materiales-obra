// js/pisos.js
function calcP() {
  const area = parseFloat(document.getElementById('p_area').value);
  const ladoSel = document.getElementById('p_lado').value;

  if (isNaN(area) || area <= 0) {
    toast('Ingrese un área válida para pisos');
    return;
  }

  // Determinar lado de la baldosa en cm
  let ladoCm;
  if (ladoSel === 'c') {
    ladoCm = parseFloat(document.getElementById('p_custom').value);
    if (isNaN(ladoCm) || ladoCm <= 0) {
      toast('Ingrese un tamaño de baldosa personalizado válido');
      return;
    }
  } else {
    ladoCm = parseFloat(ladoSel);
  }

  const areaBaldosaM2 = (ladoCm / 100) * (ladoCm / 100); // m² por baldosa
  const baldosas = Math.ceil((area / areaBaldosaM2) * 1.10); // +10% desperdicio
  const cajas = Math.ceil(baldosas / 10); // estimación cajas de 10 unidades
  const pega = (area * 4.5).toFixed(1);   // kg de pega
  const fragua = (area * 0.3).toFixed(1); // kg de fragua (aprox.)

  // Mostrar resultados
  document.getElementById('pb').textContent = baldosas;
  document.getElementById('pcaj').textContent = cajas;
  document.getElementById('ppega').textContent = pega;
  document.getElementById('pfrag').textContent = fragua;

  // Mostrar bloque de resultados
  const res = document.getElementById('res-p');
  if (res) res.classList.add('show');

  toast('Pisos calculados');
}