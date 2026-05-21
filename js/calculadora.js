// js/calculadora.js
// StructuraPro v3.4 - Funciones globales de navegación y utilidades

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

// Navegación secundaria de Acero
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

// Aquí se cargarán los demás módulos (concreto.js, muros.js, etc.) que definen sus funciones de cálculo.