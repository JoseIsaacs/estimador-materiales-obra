// js/calculadora.js
// StructuraPro v3.4 - Funciones globales de navegación y utilidades
const BAR_DATA = {
  '3': { diam: 0.953, kgm: 0.560 },
  '4': { diam: 1.27,  kgm: 0.994 },
  '5': { diam: 1.59,  kgm: 1.552 },
  '6': { diam: 1.91,  kgm: 2.235 },
  '7': { diam: 2.22,  kgm: 3.042 },
  '8': { diam: 2.54,  kgm: 3.973 }
};
window.BAR_DATA = BAR_DATA;

function T(modo, btn) {
  // Ocultar todas las páginas
  document.querySelectorAll('.pg').forEach(p => p.classList.remove('on'));
  // Mostrar la página correspondiente
  const pagina = document.getElementById(modo);
  if (pagina) pagina.classList.add('on');
  // Actualizar pestañas activas
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('on'));
  if (btn) btn.classList.add('on');
}

function actualizarInfoFc(valor) {
  const info = {
    '175': '175 kg/cm² — Rellenos, solados. Dosif. 1:3.0:3.8',
    '210': '210 kg/cm² — Estructural estándar ACI. Dosif. 1:2.5:3.4',
    '245': '245 kg/cm² — Columnas, vigas. Dosif. 1:2.2:3.0',
    '280': '280 kg/cm² — Alta resistencia. Dosif. 1:2.0:2.8'
  };
  const el = document.getElementById('fc-info');
  if (el) el.textContent = info[valor] || '';
}

// Helpers para mostrar/ocultar elementos
function $(id) { return document.getElementById(id); }

// Toast de notificación
function toast(msg) {
  const t = $('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

// Navegación de subpestañas (usada en Columnas y Acero)
function S2(submodo, btn) {
  const parent = btn.closest('.pg');
  if (!parent) return;
  parent.querySelectorAll('.sp').forEach(sp => sp.classList.remove('on'));
  const target = document.getElementById('sp-' + submodo);
  if (target) target.classList.add('on');
  parent.querySelectorAll('.stab').forEach(s => s.classList.remove('on'));
  btn.classList.add('on');
}

function SA(submodo, btn) {
  S2(submodo, btn);
}

// Agregar zona en estribos (módulo Acero)
function addZ() {
  const zl = document.getElementById('zl');
  if (!zl) return;
  const count = zl.querySelectorAll('.zr').length;
  const div = document.createElement('div');
  div.className = 'zr';
  div.innerHTML = `
    <span class="zl">Z${count+1}</span>
    <input type="number" class="zc" min="1" placeholder="n°" style="max-width:58px">
    <span class="zl">@</span>
    <input type="number" class="zs" min="1" placeholder="cm" style="max-width:62px">
    <span class="zl">cm</span>
    <button class="bdel" onclick="this.parentElement.remove()">×</button>
  `;
  zl.appendChild(div);
}
window.calcEst = function() {
  const ancho = parseFloat(document.getElementById('e_a').value) || 0;
  const alto  = parseFloat(document.getElementById('e_h').value) || 0;
  const rec   = parseFloat(document.getElementById('e_r').value);
  const diamEst = document.getElementById('e_d').value;
  const gancho = parseInt(document.getElementById('e_g').value);

  if (!ancho || !alto) { toast('Ingrese ancho y alto del estribo'); return; }
  const bar = BAR_DATA[diamEst];
  if (!bar) { toast('Diámetro de estribo no válido'); return; }

  const wu = ancho - 2*rec;
  const hu = alto - 2*rec;
  if (wu <= 0 || hu <= 0) { toast('Recubrimiento demasiado grande'); return; }

  const colaCm = gancho * bar.diam;
  const Lp = (2*(wu + hu)/100) + 2*(colaCm/100);

  let Ntotal = 0;
  document.querySelectorAll('#zl .zr').forEach(z => {
    const cant = parseInt(z.querySelector('.zc')?.value) || 0;
    Ntotal += cant;
  });
  if (Ntotal <= 0) { toast('Agregue al menos una zona con cantidad de estribos'); return; }

  const metros = Ntotal * Lp;
  const kg = metros * bar.kgm * 1.07;
  const qq = kg / 45.36;

  document.getElementById('e_lp').textContent = Lp.toFixed(3);
  document.getElementById('e_nt').textContent = Ntotal;
  document.getElementById('e_mt').textContent = metros.toFixed(2);
  document.getElementById('e_kg').textContent = kg.toFixed(2);
  document.getElementById('e_qq').textContent = qq.toFixed(2);

  const res = document.getElementById('res-e');
  if (res) res.classList.add('show');
  toast('Estribos calculados');
};
// Aquí se cargarán los demás módulos (concreto.js, muros.js, etc.) que definen sus funciones de cálculo.