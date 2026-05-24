// js/columnas.js
// Constantes de barras
const BAR_DATA = {
  '3': { diam: 0.953, kgm: 0.560 },
  '4': { diam: 1.27,  kgm: 0.994 },
  '5': { diam: 1.59,  kgm: 1.552 },
  '6': { diam: 1.91,  kgm: 2.235 },
  '8': { diam: 2.54,  kgm: 3.973 }
};

function calcColR() {
  const b = parseFloat(document.getElementById('cr_b').value) || 0;
  const h = parseFloat(document.getElementById('cr_h').value) || 0;
  const L = parseFloat(document.getElementById('cr_L').value) || 0;
  const n = parseInt(document.getElementById('cr_n').value) || 0;
  const rec = parseFloat(document.getElementById('cr_rec').value);
  const fc = parseFloat(document.getElementById('cr_fc').value);
  const nb = parseInt(document.getElementById('cr_nb').value) || 0;
  const barra = document.getElementById('cr_bl').value;
  const estribo = document.getElementById('cr_be').value;
  const gancho = parseInt(document.getElementById('cr_g').value);

  if (!b || !h || !L || !n) { toast('Complete geometría y número de columnas'); return; }
  const barL = BAR_DATA[barra];
  const barE = BAR_DATA[estribo];
  if (!barL || !barE) { toast('Diámetro no válido'); return; }

  const colaLon = (parseInt(barra) <= 5) ? 6 * barL.diam : 12 * barL.diam; // cm
  const colaEst = gancho * barE.diam; // cm
  const bu = b - 2 * rec;
  const hu = h - 2 * rec;
  if (bu <= 0 || hu <= 0) { toast('Recubrimiento excede sección'); return; }

  const Lbarra = L + colaLon / 100; // m
  const Lest = (2 * (bu + hu) / 100) + 2 * (colaEst / 100); // m
  const dimMayor = Math.max(b, h);
  const lo = Math.max(L / 6, dimMayor, 45) / 100; // zona confinamiento en m
  const sConf = Math.min((Math.min(bu, hu) / 4), 6 * barL.diam, 15); // cm
  const sCen = Math.min(Math.min(bu, hu) / 2, 30); // cm
  const Nest = Math.ceil(lo * 100 / sConf) * 2 + Math.ceil((L - 2 * lo) * 100 / sCen);

  const mLong = nb * Lbarra * n;
  const mEst = Nest * Lest * n;
  const kgLong = mLong * barL.kgm;
  const kgEst = mEst * barE.kgm;
  const kgTotal = (kgLong + kgEst) * 1.07;
  const qqTotal = kgTotal / 45.36;

  const vol = (b/100) * (h/100) * L * n;
  const cemento = (vol * 7).toFixed(1);
  const arena = (vol * 0.53).toFixed(2);
  const grava = (vol * 0.72).toFixed(2);
  const agua = Math.round(vol * 185);

  document.getElementById('cr_vol').textContent = vol.toFixed(2);
  document.getElementById('cr_cem').textContent = cemento;
  document.getElementById('cr_wu').textContent = bu.toFixed(1) + '×' + hu.toFixed(1);
  document.getElementById('cr_le').textContent = Lest.toFixed(2);
  document.getElementById('cr_sc').textContent = sConf.toFixed(1);
  document.getElementById('cr_xt').textContent = Math.max(0, nb - 4);
  document.getElementById('cr_ke').textContent = kgEst.toFixed(2);
  document.getElementById('cr_kl').textContent = kgLong.toFixed(2);
  document.getElementById('cr_qq').textContent = qqTotal.toFixed(2);

  const res = document.getElementById('res-cr');
  if (res) res.classList.add('show');
  toast('Columna cuadrada/rectangular calculada');
}

function calcColTL() {
  const wa = parseFloat(document.getElementById('tl_wa').value) || 0;
  const ha = parseFloat(document.getElementById('tl_ha').value) || 0;
  const wf = parseFloat(document.getElementById('tl_wf').value) || 0;
  const hf = parseFloat(document.getElementById('tl_hf').value) || 0;
  const L = parseFloat(document.getElementById('tl_L').value) || 0;
  const n = parseInt(document.getElementById('tl_n').value) || 0;
  const rec = parseFloat(document.getElementById('tl_rec').value);
  const na = parseInt(document.getElementById('tl_na').value) || 0;
  const nf = parseInt(document.getElementById('tl_nf').value) || 0;
  const barra = document.getElementById('tl_bl').value;
  const estribo = document.getElementById('tl_be').value;

  if (!wa || !ha || !wf || !hf || !L || !n) { toast('Complete todos los campos'); return; }
  const barL = BAR_DATA[barra];
  const barE = BAR_DATA[estribo];
  if (!barL || !barE) { toast('Diámetro no válido'); return; }

  const colaEst = 6 * barE.diam; // asumimos gancho 6ϕ sísmico
  const wua = wa - 2*rec, hua = ha - 2*rec;
  const wuf = wf - 2*rec, huf = hf - 2*rec;
  const LestAlma = (2*(wua+hua)/100) + 2*(colaEst/100);
  const LestAla = (2*(wuf+huf)/100) + 2*(colaEst/100);
  const Nest = Math.ceil(L*100 / 15) + 1; // separación fija 15 cm simplificada

  const mLong = ((na + nf) * L) * n; // sin cola por simplicidad
  const mEst = Nest * (LestAlma + LestAla) * n;
  const kgLong = mLong * barL.kgm;
  const kgEst = mEst * barE.kgm;
  const kgTotal = (kgLong + kgEst) * 1.07;
  const qqTotal = kgTotal / 45.36;

  const vol = ((wa*ha + wf*hf)/10000) * L * n;
  document.getElementById('tl_vol').textContent = vol.toFixed(2);
  document.getElementById('tl_cem').textContent = (vol*7).toFixed(1);
  document.getElementById('tl_la').textContent = LestAlma.toFixed(2);
  document.getElementById('tl_lf').textContent = LestAla.toFixed(2);
  document.getElementById('tl_ke').textContent = kgEst.toFixed(2);
  document.getElementById('tl_kl').textContent = kgLong.toFixed(2);
  document.getElementById('tl_qq').textContent = qqTotal.toFixed(2);

  const res = document.getElementById('res-tl');
  if (res) res.classList.add('show');
  toast('Columna T/L calculada');
}

function calcColCi() {
  const D = parseFloat(document.getElementById('ci_d').value) || 0;
  const L = parseFloat(document.getElementById('ci_L').value) || 0;
  const n = parseInt(document.getElementById('ci_n').value) || 0;
  const rec = parseFloat(document.getElementById('ci_rec').value);
  const paso = parseFloat(document.getElementById('ci_paso').value) || 0;
  const nb = parseInt(document.getElementById('ci_nb').value) || 0;
  const barra = document.getElementById('ci_bl').value;
  const espiral = document.getElementById('ci_be').value;

  if (!D || !L || !n) { toast('Complete dimensiones'); return; }
  const barL = BAR_DATA[barra];
  const barE = BAR_DATA[espiral];
  if (!barL || !barE) { toast('Diámetro no válido'); return; }

  const Du = D - 2*rec;
  const perimVuelta = Math.PI * Du / 100; // m
  const Nv = Math.ceil((L*100 - rec) / paso);
  const Lesp = Nv * perimVuelta;
  const kgEsp = Lesp * barE.kgm * n;
  const mLong = nb * L * n;
  const kgLong = mLong * barL.kgm;
  const kgTotal = (kgLong + kgEsp) * 1.07;
  const qqTotal = kgTotal / 45.36;

  const vol = (Math.PI * (D/200)**2) * L * n;
  document.getElementById('ci_vol').textContent = vol.toFixed(2);
  document.getElementById('ci_cem').textContent = (vol*7).toFixed(1);
  document.getElementById('ci_nv').textContent = Nv;
  document.getElementById('ci_lt').textContent = Lesp.toFixed(2);
  document.getElementById('ci_ke').textContent = kgEsp.toFixed(2);
  document.getElementById('ci_kl').textContent = kgLong.toFixed(2);
  document.getElementById('ci_qq').textContent = qqTotal.toFixed(2);

  const res = document.getElementById('res-ci');
  if (res) res.classList.add('show');
  toast('Columna cilíndrica calculada');
}