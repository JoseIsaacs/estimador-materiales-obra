// js/escaleras.js
function liveEsc() {
  const H = parseFloat(document.getElementById('E_H').value) || 0;
  const N = parseInt(document.getElementById('E_N').value) || 1;
  const huella = parseFloat(document.getElementById('E_hu').value) || 0;
  const co = H / N;
  document.getElementById('E_co').value = co.toFixed(1);
  
  const Lh = N * huella / 100;
  const Lincl = Math.sqrt(Math.pow(H/100, 2) + Math.pow(Lh, 2));
  const alpha = Math.atan2(H/100, Lh) * 180 / Math.PI;
  const tlosa = Math.max(Math.ceil(Lincl * 100 / 20), 10);
  
  document.getElementById('e_incl').textContent = Lincl.toFixed(2);
  document.getElementById('e_alpha').textContent = alpha.toFixed(1);
  document.getElementById('e_tlosa').textContent = tlosa;
}

function calcEsc() {
  const H = parseFloat(document.getElementById('E_H').value) || 0;
  const N = parseInt(document.getElementById('E_N').value) || 1;
  const huella = parseFloat(document.getElementById('E_hu').value) || 0;
  const ancho = parseFloat(document.getElementById('E_an').value) || 0;
  const fc = parseFloat(document.getElementById('E_fc').value);
  const barLong = document.getElementById('E_bl').value;
  const barTransv = document.getElementById('E_bt').value;
  const barGancho = document.getElementById('E_bg').value;

  if (!H || !N || !huella || !ancho) { toast('Complete todos los parámetros'); return; }

  const BAR_DATA = {
    '3': { diam: 0.953, kgm: 0.560 },
    '4': { diam: 1.27,  kgm: 0.994 },
    '5': { diam: 1.59,  kgm: 1.552 }
  };
  const bl = BAR_DATA[barLong] || BAR_DATA['4'];
  const bt = BAR_DATA[barTransv] || BAR_DATA['4'];
  const bg = BAR_DATA[barGancho] || BAR_DATA['3'];

  const co = H / N;
  const Lh = N * huella / 100;
  const Lincl = Math.sqrt(Math.pow(H/100, 2) + Math.pow(Lh, 2));
  const alpha = Math.atan2(H/100, Lh) * 180 / Math.PI;
  const t = Math.max(Math.ceil(Lincl * 100 / 20), 10);

  // Refuerzo longitudinal inferior
  const sepLong = 15;
  const nbLong = Math.floor((ancho - 5) / sepLong) + 1;
  const LbarraLong = Lincl + 2 * 12 * bl.diam / 100;
  const kgLong = nbLong * LbarraLong * bl.kgm * 1.07;

  // Refuerzo transversal
  const sepTransv = 20;
  const nbTransv = Math.ceil(Lincl * 100 / sepTransv) + 1;
  const LbarraTransv = (ancho / 100) + 2 * 6 * bt.diam / 100;
  const kgTransv = nbTransv * LbarraTransv * bt.kgm * 1.07;

  // Barras superiores (ES09 simplificado)
  const kgSuperior = (nbLong * Lincl * bl.kgm) * 0.15;
  // ES09 ganchos especiales
  const kgES09 = (kgLong + kgTransv) * 0.05;
  const kgTotal = kgLong + kgTransv + kgSuperior + kgES09;
  const qqTotal = kgTotal / 45.36;

  // Concreto
  const vol = t/100 * ancho/100 * Lincl;
  const cemento = (vol * 7).toFixed(1);
  const arena = (vol * 0.53).toFixed(2);
  const grava = (vol * 0.72).toFixed(2);
  const agua = Math.round(vol * 185);

  // Resultados
  document.getElementById('e_incl').textContent = Lincl.toFixed(2);
  document.getElementById('e_alpha').textContent = alpha.toFixed(1);
  document.getElementById('e_tlosa').textContent = t;

  const res = document.getElementById('res-esc');
  if (res) res.style.display = 'block';

  const tbl = document.getElementById('esc_tbl');
  if (tbl) {
    tbl.innerHTML = `
      <tr><td class="tl">Long. inf.</td><td>#${barLong}</td><td>${(nbLong*LbarraLong).toFixed(2)} m</td><td>${nbLong} barras @${sepLong}cm</td></tr>
      <tr><td class="tl">Transversal</td><td>#${barTransv}</td><td>${(nbTransv*LbarraTransv).toFixed(2)} m</td><td>${nbTransv} piezas @${sepTransv}cm</td></tr>
      <tr><td class="tl">Superior</td><td>#${barLong}</td><td>—</td><td>15% extra</td></tr>
      <tr><td class="tl">ES09</td><td>#${barGancho}</td><td>—</td><td>5% ganchos</td></tr>
    `;
  }
  const totRow = document.getElementById('esc_tot');
  if (totRow) {
    totRow.style.display = '';
    document.getElementById('et_m').textContent = (nbLong*LbarraLong + nbTransv*LbarraTransv).toFixed(2);
  }

  const escSum = document.getElementById('esc_sum');
  if (escSum) {
    escSum.innerHTML = `
      <div class="ri"><div class="v">${vol.toFixed(2)}</div><div class="l">CONCRETO</div><div class="u">m³</div></div>
      <div class="ri"><div class="v">${cemento}</div><div class="l">CEMENTO</div><div class="u">sacos</div></div>
      <div class="ri"><div class="v">${arena}</div><div class="l">ARENA</div><div class="u">m³</div></div>
      <div class="ri"><div class="v">${grava}</div><div class="l">GRAVA</div><div class="u">m³</div></div>
      <div class="ri"><div class="v">${agua}</div><div class="l">AGUA</div><div class="u">litros</div></div>
      <div class="ri full"><div class="v" style="font-size:20px">${kgTotal.toFixed(2)}</div><div class="l">ACERO TOTAL +7%</div><div class="u">kg</div></div>
      <div class="ri full"><div class="v" style="font-size:20px">${qqTotal.toFixed(2)}</div><div class="l">QUINTALES</div><div class="u">qq</div></div>
    `;
  }

  // Diagrama
  const canvas = document.getElementById('diagCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width = canvas.clientWidth || 350;
    const h = canvas.height = 200;
    ctx.clearRect(0, 0, w, h);
    
    const escala = Math.min(w / Lincl, h / (H/100)) * 0.7;
    const offsetX = w/2 - Lincl*escala/2;
    const offsetY = h - 30;
    
    ctx.fillStyle = 'rgba(167,139,250,0.2)';
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    ctx.lineTo(offsetX + Lincl*escala, offsetY - (H/100)*escala);
    ctx.lineTo(offsetX + Lincl*escala, offsetY - (H/100)*escala - t/100*escala);
    ctx.lineTo(offsetX, offsetY - t/100*escala);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#a78bfa';
    ctx.stroke();
    
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(offsetX + 5, offsetY - t/200*escala);
    ctx.lineTo(offsetX + Lincl*escala - 5, offsetY - (H/100)*escala - t/200*escala);
    ctx.stroke();
    
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1;
    for (let i=0; i<=N; i++) {
      const x = offsetX + i * (Lincl*escala / N);
      const y = offsetY - i * ((H/100)*escala / N);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y - t/100*escala);
      ctx.stroke();
    }
  }

  const escWn = document.getElementById('esc_wn');
  if (escWn) {
    escWn.style.display = 'block';
    escWn.innerHTML = `✅ Escalera: ${N} escalones de huella=${huella}cm, contrahuella=${co.toFixed(1)}cm. t losa=${t}cm.`;
  }
  toast('Escalera calculada');
}