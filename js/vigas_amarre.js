// js/vigas_amarre.js
function calcAM() {
  // Geometría
  const b = parseFloat(document.getElementById('am_b').value) || 0;
  const h = parseFloat(document.getElementById('am_h').value) || 0;
  const L = parseFloat(document.getElementById('am_L').value) || 0;
  const fc = parseFloat(document.getElementById('am_fc').value);
  
  // Refuerzo
  const nb = parseInt(document.getElementById('am_nb').value) || 4;
  const barra = document.getElementById('am_bl').value;
  const sep = parseFloat(document.getElementById('am_sep').value);
  const rec = parseFloat(document.getElementById('am_rec').value);

  if (!b || !h || !L) { toast('Complete dimensiones de la viga'); return; }
  
  const BAR_DATA = window.BAR_DATA || {
    '3': { diam: 0.953, kgm: 0.560 },
    '4': { diam: 1.27,  kgm: 0.994 },
    '5': { diam: 1.59,  kgm: 1.552 }
  };
  const barL = BAR_DATA[barra] || { diam: 1.27, kgm: 0.994 };
  const barE = BAR_DATA['3'] || { diam: 0.953, kgm: 0.560 };

  // Traslape
  const longComercial = 9.15;
  const nTraslapes = L > longComercial ? Math.ceil(L / longComercial) - 1 : 0;
  const traslape = 40 * barL.diam / 100;
  const Lbarra = L + nTraslapes * traslape;

  // Estribos
  const bu = b - 2*rec, hu = h - 2*rec;
  const Lest = (2*(bu + hu)/100) + 2*(6 * barE.diam / 100);
  const Nest = Math.ceil(L * 100 / sep) + 1;

  // Pesos
  const mLong = nb * Lbarra, mEst = Nest * Lest;
  const kgLong = mLong * barL.kgm, kgEst = mEst * barE.kgm;
  const kgTotal = (kgLong + kgEst) * 1.07, qqTotal = kgTotal / 45.36;

  // Concreto
  const vol = (b/100) * (h/100) * L;
  const cemento = (vol * 7).toFixed(1), arena = (vol * 0.53).toFixed(2);
  const grava = (vol * 0.72).toFixed(2), agua = Math.round(vol * 185);

  // Mostrar
  document.getElementById('am_vol').textContent = vol.toFixed(2);
  document.getElementById('am_cem').textContent = cemento;
  document.getElementById('am_lb').textContent = Lbarra.toFixed(2);
  document.getElementById('am_ne').textContent = Nest;
  document.getElementById('am_kl').textContent = kgLong.toFixed(2);
  document.getElementById('am_ke').textContent = kgEst.toFixed(2);
  document.getElementById('am_qq').textContent = qqTotal.toFixed(2);

  const res = document.getElementById('res-am');
  if (res) res.classList.add('show');
  
  const amWn = document.getElementById('am_wn');
  if (amWn) {
    amWn.style.display = 'block';
    amWn.innerHTML = `✅ Viga de amarre REP/SPIA. ${nb} barras #${barra}, estribos #3@${sep}cm.`;
  }
  
  toast('Viga de amarre calculada');
}