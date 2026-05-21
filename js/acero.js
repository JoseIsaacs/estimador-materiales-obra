// js/acero.js

// Constantes de barras (compartidas con otros módulos)
const BAR_DATA = {
  '3': { diam: 0.953, kgm: 0.560 },
  '4': { diam: 1.27,  kgm: 0.994 },
  '5': { diam: 1.59,  kgm: 1.552 },
  '6': { diam: 1.91,  kgm: 2.235 },
  '7': { diam: 2.22,  kgm: 3.042 },
  '8': { diam: 2.54,  kgm: 3.973 }
};
window.BAR_DATA = BAR_DATA; // disponible para otros scripts

// ========== ESTRIBOS ==========
function calcEst() {
  const ancho = parseFloat(document.getElementById('e_a').value) || 0;
  const alto  = parseFloat(document.getElementById('e_h').value) || 0;
  const rec   = parseFloat(document.getElementById('e_r').value);
  const diamEst = document.getElementById('e_d').value; // #3 o #4
  const gancho = parseInt(document.getElementById('e_g').value); // 4, 6, 8

  if (!ancho || !alto) { toast('Ingrese ancho y alto del estribo'); return; }
  const bar = BAR_DATA[diamEst];
  if (!bar) { toast('Diámetro de estribo no válido'); return; }

  // Dimensiones útiles
  const wu = ancho - 2*rec;
  const hu = alto - 2*rec;
  if (wu <= 0 || hu <= 0) { toast('Recubrimiento demasiado grande'); return; }

  // Longitud de una pieza (m): perímetro útil + 2 colas de gancho
  const colaCm = gancho * bar.diam; // cm
  const Lp = (2*(wu + hu)/100) + 2*(colaCm/100); // m

  // Leer zonas (cantidad de estribos por zona)
  const zonas = document.querySelectorAll('#zl .zr');
  let Ntotal = 0;
  zonas.forEach(z => {
    const cant = parseInt(z.querySelector('.zc')?.value) || 0;
    Ntotal += cant;
  });
  if (Ntotal <= 0) { toast('Agregue al menos una zona con cantidad de estribos'); return; }

  const metros = Ntotal * Lp;
  const kg = metros * bar.kgm;
  const kgTotal = kg * 1.07;   // +7% desperdicio
  const qq = kgTotal / 45.36;

  // Mostrar resultados
  document.getElementById('e_lp').textContent = Lp.toFixed(3);
  document.getElementById('e_nt').textContent = Ntotal;
  document.getElementById('e_mt').textContent = metros.toFixed(2);
  document.getElementById('e_kg').textContent = kgTotal.toFixed(2);
  document.getElementById('e_qq').textContent = qq.toFixed(2);

  const res = document.getElementById('res-e');
  if (res) res.classList.add('show');
  toast('Estribos calculados');
}

// ========== BARRAS ==========
function calcBar() {
  const L = parseFloat(document.getElementById('b_l').value) || 0; // m
  const n = parseInt(document.getElementById('b_n').value) || 0;
  const diamBar = document.getElementById('b_d').value;
  const tipoTraslape = document.getElementById('b_tt').value; // 'a' o 'm'
  const traslapeManual = parseFloat(document.getElementById('b_tcm').value) || 0; // cm
  const ganchoTipo = document.getElementById('b_g').value; // '12','12b','0','6'

  if (!L || !n) { toast('Ingrese longitud y número de barras'); return; }
  const bar = BAR_DATA[diamBar];
  if (!bar) { toast('Diámetro de barra no válido'); return; }

  // Longitud de gancho (m)
  let ganchoM = 0;
  if (ganchoTipo !== '0') {
    const veces = parseInt(ganchoTipo); // 12, 12 (b), 6
    ganchoM = (veces * bar.diam) / 100; // cm a m
  }

  // Longitud de la barra base (con gancho)
  const Lbarra = L + ganchoM; // m

  // Traslape
  let traslapeM = 0;
  const largoComercial = 9.15; // m
  if (Lbarra > largoComercial) {
    const nTraslapes = Math.ceil(Lbarra / largoComercial) - 1;
    if (tipoTraslape === 'a') {
      traslapeM = nTraslapes * (40 * bar.diam / 100); // 40ϕ en m
    } else {
      traslapeM = nTraslapes * (traslapeManual / 100);
    }
  }

  const Ltotal = Lbarra + traslapeM;
  const metros = Ltotal * n;
  const kg = metros * bar.kgm;
  const kgTotal = kg * 1.07;
  const qq = kgTotal / 45.36;

  // Mostrar
  document.getElementById('b_lb').textContent = Lbarra.toFixed(2);
  document.getElementById('b_tr').textContent = traslapeM.toFixed(2);
  document.getElementById('b_lt').textContent = Ltotal.toFixed(2);
  document.getElementById('b_kg').textContent = kgTotal.toFixed(2);
  document.getElementById('b_qq').textContent = qq.toFixed(2);

  const res = document.getElementById('res-b');
  if (res) res.classList.add('show');
  
  const bWn = document.getElementById('b_wn');
  if (bWn) {
    bWn.style.display = 'block';
    bWn.innerHTML = `✅ Barras #${diamBar}: ${n} und de ${Ltotal.toFixed(2)}m c/u.`;
  }
  toast('Barras calculadas');
}