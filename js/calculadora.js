/**
 * StructuraPro v3.4 - Calculadora Profesional de Materiales de Obra
 * Basado en: ACI 318-19, REP/SPIA, COPANIT 153-78
 * Autor: JoseIsaacs | Panamá
 */

// ═══════════════════════════════════════════════════════════════
// UTILIDADES
// ═══════════════════════════════════════════════════════════════

const $ = (id) => document.getElementById(id);
const show = (id) => { if($(id)) $(id).style.display = 'block'; };
const hide = (id) => { if($(id)) $(id).style.display = 'none'; };

// ═══════════════════════════════════════════════════════════════
// TAB NAVIGATION
// ═══════════════════════════════════════════════════════════════

function T(tab, btn) {
  document.querySelectorAll('.pg').forEach(p => p.classList.remove('on'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('on'));
  
  const el = $('tab-' + tab);
  if(el) el.classList.add('on');
  if(btn) btn.classList.add('on');
}

// ═══════════════════════════════════════════════════════════════
// 1. CONCRETO ESTRUCTURAL
// ═══════════════════════════════════════════════════════════════

function calcC() {
  const area = parseFloat($('c_area').value);
  const esp = parseFloat($('c_esp').value);
  const fc = parseInt($('c_fc').value);
  
  if(!area || !esp) { alert('⚠️ Completa ÁREA y ESPESOR'); return; }
  
  const vol = (area * esp) / 100;
  const dosif = {175: 7.0, 210: 7.5, 245: 8.0, 280: 8.5};
  const cem = Math.ceil(vol * dosif[fc]);
  const are = (vol * 0.55).toFixed(2);
  const gra = (vol * 0.75).toFixed(2);
  const agua = Math.round(vol * 180);
  
  $('cv').textContent = vol.toFixed(3);
  $('cc').textContent = cem;
  $('ca').textContent = are;
  $('cg').textContent = gra;
  $('cw').textContent = agua;
  $('cdos').textContent = `1:${(1/dosif[fc]).toFixed(2)}`;
  
  $('res-c').classList.add('show');
  toast('✅ Concreto calculado');
}

// ═══════════════════════════════════════════════════════════════
// 2. MUROS
// ═══════════════════════════════════════════════════════════════

function calcM() {
  const area = parseFloat($('m_area').value);
  const bloque = $('m_bloque').value;
  
  if(!area) { alert('⚠️ Ingresa ÁREA'); return; }
  
  const dens = {8: 16.5, 12: 12.5, 15: 12.5, 20: 12.5};
  const bloq = Math.ceil(area * dens[bloque] * 1.05);
  const cem = Math.ceil(area * 0.15);
  const are = (area * 0.035).toFixed(2);
  const agua = Math.round(area * 50);
  
  $('mb').textContent = bloq;
  $('mc').textContent = cem;
  $('ma').textContent = are;
  $('mw').textContent = agua;
  
  $('res-m').classList.add('show');
  toast('✅ Muros calculados');
}

// ═══════════════════════════════════════════════════════════════
// 3. PISOS
// ═══════════════════════════════════════════════════════════════

function calcP() {
  const area = parseFloat($('p_area').value);
  let lado = $('p_lado').value;
  
  if(!area) { alert('⚠️ Ingresa ÁREA'); return; }
  
  if(lado === 'c') {
    lado = parseFloat($('p_custom').value);
    if(!lado) { alert('⚠️ Ingresa lado personalizado'); return; }
  }
  
  const areaBald = (lado/100) * (lado/100);
  const bald = Math.ceil((area / areaBald) * 1.10);
  const cajas = Math.ceil(bald / 6);
  const pega = Math.ceil(area * 4.5);
  const fragua = Math.ceil(area * 2.0);
  
  $('pb').textContent = bald;
  $('pcaj').textContent = cajas + ' aprox.';
  $('ppega').textContent = pega;
  $('pfrag').textContent = fragua;
  
  $('res-p').classList.add('show');
  toast('✅ Pisos calculados');
}

// ═══════════════════════════════════════════════════════════════
// 4. ZAPATAS
// ═══════════════════════════════════════════════════════════════

function calcZap() {
  const b = parseFloat($('z_b').value);
  const l = parseFloat($('z_l').value);
  const h = parseFloat($('z_h').value);
  const n = parseInt($('z_n').value);
  const rec = parseFloat($('z_rec').value);
  const bd = parseInt($('z_bd').value);
  const sep = parseFloat($('z_sep').value);
  
  if(!b || !l || !h || !n) { alert('⚠️ Completa GEOMETRÍA'); return; }
  
  const vol = ((b * l * h) / 100000) * n;
  const cem = Math.ceil(vol * 7.5);
  
  const lBarra = ((l - 2*rec) / 100);
  const nBarras = Math.floor(((l - 2*rec)/100) / (sep/100)) + 1;
  const lTotal = lBarra * nBarras * 2 * n;
  
  const pesos = {3: 0.560, 4: 0.994, 5: 1.552, 6: 2.235, 7: 3.042, 8: 3.973};
  const acero = (lTotal * pesos[bd]).toFixed(2);
  const qq = ((parseFloat(acero) * 1.07) / 45.36).toFixed(2);
  
  let tabla = `<table><tr><td>Ancho (B)</td><td>${b} cm</td></tr><tr><td>Largo (L)</td><td>${l} cm</td></tr><tr><td>Altura (H)</td><td>${h} cm</td></tr><tr><td>N° Zapatas</td><td>${n}</td></tr><tr><td>Barras A/D</td><td>#${bd} @ ${sep} cm</td></tr></table>`;
  $('z_tbl_wrap').innerHTML = tabla;
  
  let html = `<div class="ri"><div class="v">${vol.toFixed(3)}</div><div class="l">VOLUMEN</div><div class="u">m³</div></div><div class="ri"><div class="v">${cem}</div><div class="l">CEMENTO</div><div class="u">sacos</div></div><div class="ri"><div class="v">${lTotal.toFixed(1)}</div><div class="l">ACERO</div><div class="u">m</div></div><div class="ri"><div class="v">${acero}</div><div class="l">PESO</div><div class="u">kg</div></div><div class="ri full" style="background:rgba(251,191,36,.1);border-color:var(--zap)"><div class="v" style="color:var(--zap)">${qq}</div><div class="l">QUINTALES (c/7%)</div></div>`;
  
  $('z_sum').innerHTML = html;
  $('res-z').classList.add('show');
  drawZapata(b, l, bd, sep, rec);
  toast('✅ Zapata calculada');
}

// ═══════════════════════════════════════════════════════════════
// 5. VIGA DE CIMENTACIÓN
// ═══════════════════════════════════════════════════════════════

function calcVCim() {
  const b = parseFloat($('vc_b').value);
  const h = parseFloat($('vc_h').value);
  const L = parseFloat($('vc_L').value);
  const nv = parseInt($('vc_nv').value);
  const ns = parseInt($('vc_ns').value);
  const ni = parseInt($('vc_ni').value);
  const bl = parseInt($('vc_bl').value);
  const be = parseInt($('vc_be').value);
  const sep = parseFloat($('vc_sep').value);
  
  if(!b || !h || !L || !nv) { alert('⚠️ Completa GEOMETRÍA'); return; }
  
  const vol = (b * h * L * nv) / 10000;
  const cem = Math.ceil(vol * 7.5);
  const lLong = ((L * 1.2) * (ns + ni) * nv).toFixed(1);
  const lEst = ((2 * (b + h))/100);
  const nEst = Math.ceil((L / (sep/100)) + 1) * nv;
  const lEstTotal = (lEst * nEst).toFixed(1);
  
  const pesos = {3: 0.560, 4: 0.994, 5: 1.552, 6: 2.235, 8: 3.973};
  const aceroLong = (parseFloat(lLong) * pesos[bl]).toFixed(2);
  const aceroEst = (parseFloat(lEstTotal) * pesos[be]).toFixed(2);
  const aceroTotal = (parseFloat(aceroLong) + parseFloat(aceroEst)).toFixed(2);
  const qq = ((parseFloat(aceroTotal) * 1.07) / 45.36).toFixed(2);
  
  let html = `<div class="ri"><div class="v">${vol.toFixed(3)}</div><div class="l">CONCRETO</div><div class="u">m³</div></div><div class="ri"><div class="v">${cem}</div><div class="l">CEMENTO</div><div class="u">sacos</div></div><div class="ri"><div class="v">${lLong}</div><div class="l">ACERO LONG.</div><div class="u">m</div></div><div class="ri"><div class="v">${lEstTotal}</div><div class="l">ESTRIBOS</div><div class="u">m</div></div><div class="ri full" style="background:rgba(6,182,212,.1);border-color:var(--vc)"><div class="v" style="color:var(--vc)">${qq}</div><div class="l">QUINTALES (c/7%)</div></div>`;
  
  $('vc_sum').innerHTML = html;
  $('res-vc').classList.add('show');
  toast('✅ Viga cimentación calculada');
}

// ═══════════════════════════════════════════════════════════════
// 6. PEDESTALES
// ═══════════════════════════════════════════════════════════════

function calcPed() {
  const b = parseFloat($('pd_b').value);
  const h = parseFloat($('pd_h').value);
  const H = parseFloat($('pd_H').value);
  const n = parseInt($('pd_n').value);
  const nb = parseInt($('pd_nb').value);
  const bl = parseInt($('pd_bl').value);
  const be = parseInt($('pd_be').value);
  const sep = parseFloat($('pd_sep').value);
  
  if(!b || !h || !H || !n || !nb) { alert('⚠️ Completa PARÁMETROS'); return; }
  
  const vol = (b * h * H * n) / 10000;
  const cem = Math.ceil(vol * 7.5);
  const lLong = ((H + 0.05) * nb * n).toFixed(2);
  const lEst = ((2 * (b + h - 8))/100);
  const nEst = Math.ceil((H / (sep/100)) + 1) * n;
  const lEstTotal = (lEst * nEst).toFixed(1);
  
  const pesos = {3: 0.560, 4: 0.994, 5: 1.552, 6: 2.235, 7: 3.042, 8: 3.973};
  const aceroLong = (parseFloat(lLong) * pesos[bl]).toFixed(2);
  const aceroEst = (parseFloat(lEstTotal) * pesos[be]).toFixed(2);
  const aceroTotal = (parseFloat(aceroLong) + parseFloat(aceroEst)).toFixed(2);
  const qq = ((parseFloat(aceroTotal) * 1.07) / 45.36).toFixed(2);
  
  let html = `<div class="ri"><div class="v">${vol.toFixed(3)}</div><div class="l">CONCRETO</div><div class="u">m³</div></div><div class="ri"><div class="v">${cem}</div><div class="l">CEMENTO</div><div class="u">sacos</div></div><div class="ri"><div class="v">${lLong}</div><div class="l">ACERO LONG.</div><div class="u">m</div></div><div class="ri"><div class="v">${aceroLong}</div><div class="l">PESO LONG.</div><div class="u">kg</div></div><div class="ri"><div class="v">${aceroEst}</div><div class="l">PESO EST.</div><div class="u">kg</div></div><div class="ri full" style="background:rgba(251,146,60,.1);border-color:var(--ped)"><div class="v" style="color:var(--ped)">${qq}</div><div class="l">QUINTALES (c/7%)</div></div>`;
  
  $('pd_sum').innerHTML = html;
  $('res-pd').classList.add('show');
  toast('✅ Pedestal calculado');
}

// ═══════════════════════════════════════════════════════════════
// MÓDULOS FUTUROS (PLACEHOLDERS)
// ═══════════════════════════════════════════════════════════════

function calcColR() { alert('🔧 Columna Rect. - En desarrollo'); }
function calcColTL() { alert('🔧 Columna T/L - En desarrollo'); }
function calcColCi() { alert('🔧 Columna Cilíndrica - En desarrollo'); }
function calcVS() { alert('🔧 Viga Sísmica - En desarrollo'); }
function calcAM() { alert('🔧 Viga Amarre - En desarrollo'); }
function calcEst() { alert('🔧 Estribos - En desarrollo'); }
function calcBar() { alert('🔧 Barras - En desarrollo'); }
function calcEsc() { alert('🔧 Escalera - En desarrollo'); }

// ═══════════════════════════════════════════════════════════════
// CANVAS - ZAPATA
// ═══════════════════════════════════════════════════════════════

function drawZapata(b, l, bd, sep, rec) {
  const canvas = $('zapCanvas');
  if(!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  
  ctx.fillStyle = '#06111e';
  ctx.fillRect(0, 0, w, h);
  
  const scale = Math.min((w - 40) / (l/10), (h - 40) / (b/10));
  const x0 = 20 + ((w - 40) - (l/10)*scale) / 2;
  const y0 = 20 + ((h - 40) - (b/10)*scale) / 2;
  
  // Concreto
  ctx.fillStyle = 'rgba(167,139,250,.3)';
  ctx.fillRect(x0, y0, (l/10)*scale, (b/10)*scale);
  ctx.strokeStyle = 'rgba(167,139,250,.6)';
  ctx.lineWidth = 1;
  ctx.strokeRect(x0, y0, (l/10)*scale, (b/10)*scale);
  
  // Barras X
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 2;
  const nBarrasX = Math.floor(((l - 2*rec)/100) / (sep/100)) + 1;
  const spacingX = ((l/10)*scale) / nBarrasX;
  for(let i = 0; i < nBarrasX; i++) {
    const px = x0 + spacingX * (i + 0.5);
    ctx.beginPath();
    ctx.moveTo(px, y0);
    ctx.lineTo(px, y0 + (b/10)*scale);
    ctx.stroke();
  }
  
  // Barras Y
  ctx.strokeStyle = '#00c9ff';
  const nBarrasY = Math.floor(((b - 2*rec)/100) / (sep/100)) + 1;
  const spacingY = ((b/10)*scale) / nBarrasY;
  for(let i = 0; i < nBarrasY; i++) {
    const py = y0 + spacingY * (i + 0.5);
    ctx.beginPath();
    ctx.moveTo(x0, py);
    ctx.lineTo(x0 + (l/10)*scale, py);
    ctx.stroke();
  }
}

// ═══════════════════════════════════════════════════════════════
// FUNCIONES AUXILIARES
// ═══════════════════════════════════════════════════════════════

function S2(sp, btn) {
  document.querySelectorAll('.sp').forEach(s => s.classList.remove('on'));
  document.querySelectorAll('.stab').forEach(t => t.classList.remove('on'));
  
  const el = $('sp-' + sp);
  if(el) el.classList.add('on');
  if(btn) btn.classList.add('on');
}

function SA(sp, btn) {
  document.querySelectorAll('.sp').forEach(s => s.classList.remove('on'));
  document.querySelectorAll('.stab').forEach(t => t.classList.remove('on'));
  
  const el = $(sp);
  if(el) el.classList.add('on');
  if(btn) btn.classList.add('on');
}

function addZ() {
  const zl = $('zl');
  if(!zl) return;
  const html = `<div class="zr"><span class="zl">Z${zl.children.length + 1}</span><input type="number" class="zc" min="1" placeholder="n°" style="max-width:58px"><span class="zl">@</span><input type="number" class="zs" min="1" placeholder="cm" style="max-width:62px"><span class="zl">cm</span></div>`;
  zl.insertAdjacentHTML('beforeend', html);
}

function liveEsc() { }

function exportPDF() { alert('📄 Exportar PDF - Próximamente'); }
function exportPlan() { alert('📄 Exportar Planilla - Próximamente'); }
function exportEscPDF() { alert('📄 Exportar Escalera PDF - Próximamente'); }

function toast(msg) {
  const t = $('toast');
  if(!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

// ═══════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════

console.log('✅ StructuraPro v3.4 - Calculadora cargada');
