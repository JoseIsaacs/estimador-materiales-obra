// js/vigas_sismicas.js
function calcVS() {
  // Geometría
  const b = parseFloat(document.getElementById('vs_b').value) || 0; // cm
  const h = parseFloat(document.getElementById('vs_h').value) || 0; // cm
  const L = parseFloat(document.getElementById('vs_L').value) || 0; // m
  const n = parseInt(document.getElementById('vs_n').value) || 0;
  const rec = parseFloat(document.getElementById('vs_rec').value); // cm
  const fc = parseFloat(document.getElementById('vs_fc').value);
  
  // Refuerzo
  const barra = document.getElementById('vs_bl').value;
  const estribo = document.getElementById('vs_be').value;
  const ns = parseInt(document.getElementById('vs_ns').value) || 0;
  const ni = parseInt(document.getElementById('vs_ni').value) || 0;
  const gancho = parseInt(document.getElementById('vs_g').value); // 6 o 8

  if (!b || !h || !L || !n) { toast('Complete geometría y número de vigas'); return; }
  const barL = BAR_DATA[barra];
  const barE = BAR_DATA[estribo];
  if (!barL || !barE) { toast('Diámetro no válido'); return; }

  // Diámetros y pesos (heredamos BAR_DATA del archivo columnas.js, debe estar global)
  // Si no existe, lo definimos aquí también para seguridad
  const BAR_DATA = window.BAR_DATA || {
    '3': { diam: 0.953, kgm: 0.560 },
    '4': { diam: 1.27,  kgm: 0.994 },
    '5': { diam: 1.59,  kgm: 1.552 },
    '6': { diam: 1.91,  kgm: 2.235 },
    '8': { diam: 2.54,  kgm: 3.973 }
  };

  // Colas de gancho
  const colaLon = (parseInt(barra) <= 5) ? 6 * barL.diam : 12 * barL.diam; // cm
  const colaEst = gancho * barE.diam; // cm

  // Peralte efectivo d = h - rec - diam_est/2 - diam_lon/2 (todo en cm)
  const d = h - rec - barE.diam/2 - barL.diam/2;
  if (d <= 0) { toast('Peralte efectivo no válido'); return; }

  // Zona de confinamiento lo = 2h (en m)
  const lo = 2 * h / 100; // m
  // Separación zona confinada sConf = min(d/4, 6ϕ_lon, 15cm)
  const sConf = Math.min(d/4, 6 * barL.diam, 15);
  // Separación zona central sCen = min(d/2, 30cm)
  const sCen = Math.min(d/2, 30);

  // Longitud de una barra longitudinal = L + cola (si aplica, aquí simplificamos con traslape si L>9.15)
  const longComercial = 9.15; // m
  const nTraslapes = L > longComercial ? Math.ceil(L / longComercial) - 1 : 0;
  const traslape = 40 * barL.diam / 100; // 40ϕ en m
  const Lbarra = L + nTraslapes * traslape + colaLon / 100; // m

  // Longitud de estribo
  const bu = b - 2*rec;
  const hu = h - 2*rec;
  const Lest = (2*(bu + hu)/100) + 2*(colaEst/100); // m

  // Número de estribos: confinamiento en extremos (lo) + zona central
  const NestExtremo = Math.ceil(lo * 100 / sConf) * 2; // ambos extremos
  const NestCentro = Math.ceil((L - 2*lo) * 100 / sCen);
  const Nest = NestExtremo + NestCentro;

  // Metros totales
  const mLong = (ns + ni) * Lbarra * n;
  const mEst = Nest * Lest * n;
  const kgLong = mLong * barL.kgm;
  const kgEst = mEst * barE.kgm;
  const kgTotal = (kgLong + kgEst) * 1.07;
  const qqTotal = kgTotal / 45.36;

  // Concreto
  const vol = (b/100) * (h/100) * L * n;
  const cemento = (vol * 7).toFixed(1);
  const arena = (vol * 0.53).toFixed(2);
  const grava = (vol * 0.72).toFixed(2);
  const agua = Math.round(vol * 185);

  // Mostrar resultados
  document.getElementById('vs_d').textContent = (d/100).toFixed(3); // d en m
  document.getElementById('vs_lo').textContent = lo.toFixed(2);
  document.getElementById('vs_sc').textContent = sConf.toFixed(1);
  document.getElementById('vs_ne').textContent = Nest;
  document.getElementById('vs_vol').textContent = vol.toFixed(2);
  document.getElementById('vs_cem').textContent = cemento;
  document.getElementById('vs_ke').textContent = kgEst.toFixed(2);
  document.getElementById('vs_kl').textContent = kgLong.toFixed(2);
  document.getElementById('vs_qq').textContent = qqTotal.toFixed(2);

  const res = document.getElementById('res-vs');
  if (res) res.classList.add('show');
  
  // Advertencias
  const vsWn = document.getElementById('vs_wn');
  if (vsWn) {
    vsWn.style.display = 'block';
    vsWn.innerHTML = `✅ Viga sísmica ACI 318-19 §18.6. d=${(d/100).toFixed(3)}m, lo=${lo.toFixed(2)}m, sConf=${sConf.toFixed(1)}cm, sCen=${sCen.toFixed(1)}cm.`;
  }
  
  toast('Viga sísmica calculada');
}