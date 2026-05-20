// js/vigas_cimentacion.js
function calcVCim() {
  // ── GEOMETRÍA ────────────────────────────
  const b = parseFloat(document.getElementById('vc_b').value) || 0;    // cm
  const h = parseFloat(document.getElementById('vc_h').value) || 0;    // cm
  const L = parseFloat(document.getElementById('vc_L').value) || 0;    // m
  const nVigas = parseInt(document.getElementById('vc_nv').value) || 1;
  const rec = parseFloat(document.getElementById('vc_rec').value);     // cm
  const fc = parseFloat(document.getElementById('vc_fc').value);       // kg/cm²

  // ── REFUERZO LONGITUDINAL ───────────────
  const ns = parseInt(document.getElementById('vc_ns').value) || 0;    // # barras superiores
  const ni = parseInt(document.getElementById('vc_ni').value) || 0;    // # barras inferiores
  const barraLong = document.getElementById('vc_bl').value;            // #4, #5, #6, #8
  // ── ESTRIBOS ────────────────────────────
  const estribo = document.getElementById('vc_be').value;              // #3 o #4
  const sep = parseFloat(document.getElementById('vc_sep').value);     // cm
  const gancho = parseInt(document.getElementById('vc_g').value);      // 4 o 6

  if (!b || !h || !L) {
    toast('Complete las dimensiones de la viga');
    return;
  }

  // Datos de barras (heredados del global BAR_DATA o definidos aquí)
  const BAR_DATA = window.BAR_DATA || {
    '3': { diam: 0.953, kgm: 0.560 },
    '4': { diam: 1.27,  kgm: 0.994 },
    '5': { diam: 1.59,  kgm: 1.552 },
    '6': { diam: 1.91,  kgm: 2.235 },
    '8': { diam: 2.54,  kgm: 3.973 }
  };
  const barL = BAR_DATA[barraLong];
  const barE = BAR_DATA[estribo];
  if (!barL || !barE) {
    toast('Diámetro de barra no válido');
    return;
  }

  // ── TRASLAPES (longitud comercial 9.15 m) ─
  const largoComercial = 9.15;
  const nTraslapes = L > largoComercial ? Math.ceil(L / largoComercial) - 1 : 0;
  const traslape = 40 * barL.diam / 100;   // 40ϕ en m
  const Lbarra = L + nTraslapes * traslape; // m (sin gancho adicional porque es recta)

  // ── ESTRIBOS ─────────────────────────────
  const bu = b - 2 * rec;
  const hu = h - 2 * rec;
  if (bu <= 0 || hu <= 0) {
    toast('Recubrimiento demasiado grande');
    return;
  }
  const colaEst = gancho * barE.diam;               // cm
  const Lest = (2 * (bu + hu) / 100) + 2 * (colaEst / 100); // m
  const Nest = Math.ceil(L * 100 / sep) + 1;

  // ── CÁLCULO DE PESOS ────────────────────
  const mLong = (ns + ni) * Lbarra * nVigas;
  const mEst = Nest * Lest * nVigas;
  const kgLong = mLong * barL.kgm;
  const kgEst = mEst * barE.kgm;
  const kgTotal = (kgLong + kgEst) * 1.07;           // +7% desperdicio
  const qqTotal = kgTotal / 45.36;

  // ── CONCRETO ────────────────────────────
  const volViga = (b / 100) * (h / 100) * L;        // m³ por viga
  const volTotal = volViga * nVigas;
  // Dosificación según f'c
  let sacosPorM3, arenaPorM3, gravaPorM3, aguaPorM3;
  if (fc === 175) {
    sacosPorM3 = 6.5; arenaPorM3 = 0.55; gravaPorM3 = 0.75; aguaPorM3 = 180;
  } else if (fc === 245) {
    sacosPorM3 = 8.0; arenaPorM3 = 0.50; gravaPorM3 = 0.70; aguaPorM3 = 190;
  } else { // fc = 210 (default)
    sacosPorM3 = 7.0; arenaPorM3 = 0.53; gravaPorM3 = 0.72; aguaPorM3 = 185;
  }
  const cemento = (volTotal * sacosPorM3).toFixed(1);
  const arena = (volTotal * arenaPorM3).toFixed(2);
  const grava = (volTotal * gravaPorM3).toFixed(2);
  const agua = Math.round(volTotal * aguaPorM3);

  // ── MOSTRAR RESULTADOS ──────────────────
  const res = document.getElementById('res-vc');
  if (res) res.classList.add('show');

  // Tabla de desarrollo
  const tblWrap = document.getElementById('vc_tbl_wrap');
  if (tblWrap) {
    tblWrap.innerHTML = `<table>
      <thead><tr><th>Concepto</th><th>Valor</th><th>Unidad</th></tr></thead>
      <tbody>
        <tr><td>Sección útil (b×h)</td><td>${bu.toFixed(1)} × ${hu.toFixed(1)}</td><td>cm</td></tr>
        <tr><td>Longitud barra long. (c/traslape)</td><td>${Lbarra.toFixed(2)}</td><td>m</td></tr>
        <tr><td>Barras superiores</td><td>${ns} #${barraLong}</td><td></td></tr>
        <tr><td>Barras inferiores</td><td>${ni} #${barraLong}</td><td></td></tr>
        <tr><td>Longitud estribo</td><td>${Lest.toFixed(2)}</td><td>m</td></tr>
        <tr><td>Número de estribos / viga</td><td>${Nest} #${estribo} @${sep}cm</td><td></td></tr>
        <tr class="trow-tot"><td>Peso acero long. total</td><td>${kgLong.toFixed(2)}</td><td>kg</td></tr>
        <tr class="trow-tot"><td>Peso acero est. total</td><td>${kgEst.toFixed(2)}</td><td>kg</td></tr>
        <tr class="trow-tot"><td>Peso total +7%</td><td>${kgTotal.toFixed(2)}</td><td>kg</td></tr>
        <tr class="trow-tot"><td>Quintales totales</td><td>${qqTotal.toFixed(2)}</td><td>qq</td></tr>
      </tbody></table>`;
  }

  // Resumen concreto
  const vcSum = document.getElementById('vc_sum');
  if (vcSum) {
    vcSum.innerHTML = `
      <div class="ri"><div class="v">${volTotal.toFixed(2)}</div><div class="l">CONCRETO</div><div class="u">m³</div></div>
      <div class="ri"><div class="v">${cemento}</div><div class="l">CEMENTO</div><div class="u">sacos 50kg</div></div>
      <div class="ri"><div class="v">${arena}</div><div class="l">ARENA</div><div class="u">m³</div></div>
      <div class="ri"><div class="v">${grava}</div><div class="l">GRAVA</div><div class="u">m³</div></div>
      <div class="ri"><div class="v">${agua}</div><div class="l">AGUA</div><div class="u">litros</div></div>`;
  }

  // Advertencias
  const vcWn = document.getElementById('vc_wn');
  if (vcWn) {
    vcWn.style.display = 'block';
    vcWn.innerHTML = `✅ Viga de cimentación ACI 318. Recubrimiento ${rec} cm. ${ns+ni} barras #${barraLong}, estribos #${estribo} @${sep}cm.`;
  }

  toast('Viga de cimentación calculada');
}