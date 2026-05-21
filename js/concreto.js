// js/concreto.js
function calcConcreto() {
  // Leer entradas
  const area = parseFloat(document.getElementById('c_area').value);
  const esp = parseFloat(document.getElementById('c_esp').value);
  const fc = parseInt(document.getElementById('c_fc').value);

  // Validar
  if (isNaN(area) || area <= 0 || isNaN(esp) || esp <= 0) {
    toast('Ingrese área y espesor válidos');
    return;
  }

  // Volumen (m³)
  const volumen = area * esp / 100;

  // Dosificación según f'c
  let sacosPorM3, arenaPorM3, gravaPorM3, aguaPorM3, dosif;
  if (fc === 175) {
    sacosPorM3 = 6.5;
    arenaPorM3 = 0.55;
    gravaPorM3 = 0.75;
    aguaPorM3 = 180;
    dosif = '1 : 3.0 : 3.8';
  } else if (fc === 245) {
    sacosPorM3 = 8.0;
    arenaPorM3 = 0.50;
    gravaPorM3 = 0.70;
    aguaPorM3 = 190;
    dosif = '1 : 2.2 : 3.0';
  } else if (fc === 280) {
    sacosPorM3 = 8.5;
    arenaPorM3 = 0.47;
    gravaPorM3 = 0.67;
    aguaPorM3 = 195;
    dosif = '1 : 2.0 : 2.8';
  } else { // fc = 210 (por defecto)
    sacosPorM3 = 7.0;
    arenaPorM3 = 0.53;
    gravaPorM3 = 0.72;
    aguaPorM3 = 185;
    dosif = '1 : 2.5 : 3.4';
  }

  const cemento = volumen * sacosPorM3;
  const arena = volumen * arenaPorM3;
  const grava = volumen * gravaPorM3;
  const agua = volumen * aguaPorM3;

  // Mostrar resultados
  document.getElementById('cv').textContent = volumen.toFixed(2);
  document.getElementById('cc').textContent = cemento.toFixed(1);
  document.getElementById('ca').textContent = arena.toFixed(2);
  document.getElementById('cg').textContent = grava.toFixed(2);
  document.getElementById('cw').textContent = Math.round(agua);
  document.getElementById('cdos').textContent = dosif;

  // Mostrar panel de resultados
  const res = document.getElementById('res-c');
  if (res) res.classList.add('show');

  toast('Concreto calculado');
}