// js/pedestales.js
function calcPed() {
  // Lectura de inputs
  const b = parseFloat(document.getElementById('pd_b').value) || 0;
  const h = parseFloat(document.getElementById('pd_h').value) || 0;
  const H = parseFloat(document.getElementById('pd_H').value) || 0; // altura en m
  const n = parseInt(document.getElementById('pd_n').value) || 0;
  const rec = parseFloat(document.getElementById('pd_rec').value);
  const fc = parseFloat(document.getElementById('pd_fc').value);
  const nb = parseInt(document.getElementById('pd_nb').value) || 0;
  const barra = document.getElementById('pd_bl').value; // #4, #5, #6, #7, #8
  const estribo = document.getElementById('pd_be').value; // #3, #4
  const sep = parseFloat(document.getElementById('pd_sep').value); // cm
  const gancho = parseInt(document.getElementById('pd_g').value); // 4, 6

  if (b <= 0 || h <= 0 || H <= 0 || n <= 0) {
    toast('Complete dimensiones y número de pedestales');
    return;
  }

  // Datos de barras
  const barData = {
    '3': { diam: 0.953, kgm: 0.560 },
    '4': { diam: 1.27,  kgm: 0.994 },
    '5': { diam: 1.59,  kgm: 1.552 },
    '6': { diam: 1.91,  kgm: 2.235 },
    '7': { diam: 2.22,  kgm: 3.042 },
    '8': { diam: 2.54,  kgm: 3.973 }
  };
  const barLon = barData[barra];
  const barEst = barData[estribo];
  if (!barLon || !barEst) { toast('Diámetro no válido'); return; }

  // Cola de gancho para barra longitudinal (90°)
  const colaLon = (parseInt(barra) <= 5) ? 6 * barLon.diam : 12 * barLon.diam; // cm
  // Cola de estribo
  const colaEst = gancho * barEst.diam; // cm (gancho: 4 o 6 veces ϕ)

  // Dimensiones útiles (cm)
  const bu = b - 2 * rec;
  const hu = h - 2 * rec;
  if (bu <= 0 || hu <= 0) {
    toast('Recubrimiento mayor que la sección del pedestal');
    return;
  }

  // Longitud de una barra longitudinal (m) = altura + gancho (en m)
  const Lbarra = H + colaLon / 100; // m

  // Longitud de un estribo (m) = perímetro útil + 2 colas
  const Lest = (2 * (bu + hu) / 100) + 2 * (colaEst / 100); // m

  // Número de estribos = (H*100 / sep) + 1 (redondeo arriba)
  const Nest = Math.ceil((H * 100) / sep) + 1;

  // Metros totales
  const mLong = nb * Lbarra * n;
  const mEst = Nest * Lest * n;

  // Pesos (kg)
  const kgLong = mLong * barLon.kgm;
  const kgEst = mEst * barEst.kgm;
  const kgTotal = (kgLong + kgEst) * 1.07; // +7% desperdicio
  const qqTotal = kgTotal / 45.36;

  // Concreto
  const volPedestal = (b / 100) * (h / 100) * H; // m³
  const volTotal = volPedestal * n;
  // Dosificación simplificada (fc 210)
  const cemento = (volTotal * 7).toFixed(1); // sacos
  const arena = (volTotal * 0.53).toFixed(2);
  const grava = (volTotal * 0.72).toFixed(2);
  const agua = Math.round(volTotal * 185);

  // Mostrar resultados
  const res = document.getElementById('res-pd');
  if (res) res.classList.add('show');

  // Tabla de desarrollo
  const tblWrap = document.getElementById('pd_tbl_wrap');
  if (tblWrap) {
    tblWrap.innerHTML = `<table>
      <thead><tr><th>Concepto</th><th>Valor</th><th>Unidad</th></tr></thead>
      <tbody>
        <tr><td>Sección útil (b×h)</td><td>${bu.toFixed(1)} × ${hu.toFixed(1)}</td><td>cm</td></tr>
        <tr><td>Long. barra long. (c/g)</td><td>${Lbarra.toFixed(2)}</td><td>m</td></tr>
        <tr><td>N° barras long.</td><td>${nb}</td><td>#${barra}</td></tr>
        <tr><td>Long. estribo</td><td>${Lest.toFixed(2)}</td><td>m</td></tr>
        <tr><td>N° estribos/pedestal</td><td>${Nest}</td><td>#${estribo} @${sep}cm</td></tr>
        <tr class="trow-tot"><td>Peso acero long. total</td><td>${kgLong.toFixed(2)}</td><td>kg</td></tr>
        <tr class="trow-tot"><td>Peso acero est. total</td><td>${kgEst.toFixed(2)}</td><td>kg</td></tr>
        <tr class="trow-tot"><td>Peso total +7%</td><td>${kgTotal.toFixed(2)}</td><td>kg</td></tr>
        <tr class="trow-tot"><td>Quintales totales</td><td>${qqTotal.toFixed(2)}</td><td>qq</td></tr>
      </tbody></table>`;
  }

  // Resumen concreto
  const pdSum = document.getElementById('pd_sum');
  if (pdSum) {
    pdSum.innerHTML = `
      <div class="ri"><div class="v">${volTotal.toFixed(2)}</div><div class="l">CONCRETO</div><div class="u">m³</div></div>
      <div class="ri"><div class="v">${cemento}</div><div class="l">CEMENTO</div><div class="u">sacos 50kg</div></div>
      <div class="ri"><div class="v">${arena}</div><div class="l">ARENA</div><div class="u">m³</div></div>
      <div class="ri"><div class="v">${grava}</div><div class="l">GRAVA</div><div class="u">m³</div></div>
      <div class="ri"><div class="v">${agua}</div><div class="l">AGUA</div><div class="u">litros</div></div>`;
  }

  // Advertencias
  const pdWn = document.getElementById('pd_wn');
  if (pdWn) {
    pdWn.style.display = 'block';
    pdWn.innerHTML = '✅ Pedestal calculado según ACI 318. Recubrimiento ' + rec + ' cm. Gancho ' + gancho + 'ϕ.';
  }

  toast('Pedestales calculados');
}