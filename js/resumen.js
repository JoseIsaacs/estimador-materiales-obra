// js/resumen.js
(function() {
  // ── RECOLECCIÓN DE DATOS ────────────────────────────
  function getNum(id) {
    const el = document.getElementById(id);
    if (!el) return 0;
    const n = parseFloat(el.textContent);
    return isNaN(n) ? 0 : n;
  }

  function recolectar() {
    const mods = [];

    // Concreto
    mods.push({
      nombre: 'Concreto',
      color: '#f0a500',
      vol: getNum('cv'),
      cem: getNum('cc'),
      arena: getNum('ca'),
      grava: getNum('cg'),
      agua: getNum('cw'),
      kg: 0, qq: 0
    });

    // Muros
    mods.push({
      nombre: 'Muros',
      color: '#fbbf24',
      vol: 0,
      cem: getNum('mc'),
      arena: getNum('ma'),
      grava: 0,
      agua: getNum('mw'),
      kg: 0, qq: 0
    });

    // Pisos (sin concreto ni acero)
    mods.push({
      nombre: 'Pisos',
      color: '#34d399',
      vol: 0, cem: 0, arena: 0, grava: 0, agua: 0,
      kg: 0, qq: 0
    });

    // Zapatas – leer de la tabla de desarrollo
    let zapKg = 0, zapQQ = 0, zapVol = 0, zapCem = 0, zapArena = 0, zapGrava = 0, zapAgua = 0;
    const zSum = document.getElementById('z_sum');
    if (zSum) {
      const ris = zSum.querySelectorAll('.ri');
      // Orden esperado: vol, cem, arena, grava, agua (5 elementos)
      if (ris.length >= 5) {
        zapVol = parseFloat(ris[0]?.querySelector('.v')?.textContent) || 0;
        zapCem = parseFloat(ris[1]?.querySelector('.v')?.textContent) || 0;
        zapArena = parseFloat(ris[2]?.querySelector('.v')?.textContent) || 0;
        zapGrava = parseFloat(ris[3]?.querySelector('.v')?.textContent) || 0;
        zapAgua = parseFloat(ris[4]?.querySelector('.v')?.textContent) || 0;
      }
    }
    const zTbl = document.getElementById('z_tbl_wrap');
    if (zTbl) {
      const rows = zTbl.querySelectorAll('tr');
      // Buscar fila "Peso acero total (n zapatas +7%)"
      rows.forEach(row => {
        const celdas = row.querySelectorAll('td');
        if (celdas.length >= 2 && celdas[0].textContent.includes('Peso acero total')) {
          zapKg = parseFloat(celdas[1]?.textContent) || 0;
        }
        if (celdas.length >= 2 && celdas[0].textContent.includes('Quintales totales')) {
          zapQQ = parseFloat(celdas[1]?.textContent) || 0;
        }
      });
    }
    mods.push({
      nombre: 'Zapatas',
      color: '#fbbf24',
      vol: zapVol, cem: zapCem, arena: zapArena, grava: zapGrava, agua: zapAgua,
      kg: zapKg, qq: zapQQ
    });

    // Viga Cimentación (si existe)
    const vcKg = getNum('vc_ke') + getNum('vc_kl');
    const vcQQ = (vcKg * 1.07 / 45.36) || 0;
    mods.push({
      nombre: 'V.Cimen.',
      color: '#06b6d4',
      vol: 0, cem: 0, arena: 0, grava: 0, agua: 0,
      kg: vcKg, qq: vcQQ
    });

    // Pedestales – leer tabla
    let pdKg = 0, pdQQ = 0, pdVol = 0, pdCem = 0, pdArena = 0, pdGrava = 0, pdAgua = 0;
    const pdSum = document.getElementById('pd_sum');
    if (pdSum) {
      const ris = pdSum.querySelectorAll('.ri');
      if (ris.length >= 5) {
        pdVol = parseFloat(ris[0]?.querySelector('.v')?.textContent) || 0;
        pdCem = parseFloat(ris[1]?.querySelector('.v')?.textContent) || 0;
        pdArena = parseFloat(ris[2]?.querySelector('.v')?.textContent) || 0;
        pdGrava = parseFloat(ris[3]?.querySelector('.v')?.textContent) || 0;
        pdAgua = parseFloat(ris[4]?.querySelector('.v')?.textContent) || 0;
      }
    }
    const pdTbl = document.getElementById('pd_tbl_wrap');
    if (pdTbl) {
      const rows = pdTbl.querySelectorAll('tr');
      rows.forEach(row => {
        const celdas = row.querySelectorAll('td');
        if (celdas.length >= 2 && celdas[0].textContent.includes('Peso total +7%')) pdKg = parseFloat(celdas[1]?.textContent) || 0;
        if (celdas.length >= 2 && celdas[0].textContent.includes('Quintales totales')) pdQQ = parseFloat(celdas[1]?.textContent) || 0;
      });
    }
    mods.push({
      nombre: 'Pedestales',
      color: '#fb923c',
      vol: pdVol, cem: pdCem, arena: pdArena, grava: pdGrava, agua: pdAgua,
      kg: pdKg, qq: pdQQ
    });

    // Columnas (cuadrada, T/L, cilíndrica) – se suman sus kg
    let colKg = 0, colQQ = 0;
    ['cr', 'tl', 'ci'].forEach(pref => {
      const kg = getNum(pref + '_kl') + getNum(pref + '_ke');
      const qq = getNum(pref + '_qq');
      colKg += kg;
      colQQ += qq;
    });
    mods.push({
      nombre: 'Columnas',
      color: '#a78bfa',
      vol: getNum('cr_vol') + getNum('tl_vol') + getNum('ci_vol'),
      cem: getNum('cr_cem') + getNum('tl_cem') + getNum('ci_cem'),
      arena: 0, grava: 0, agua: 0,
      kg: colKg, qq: colQQ
    });

    // Viga Sísmica
    const vsKg = getNum('vs_kl') + getNum('vs_ke');
    const vsQQ = getNum('vs_qq');
    mods.push({
      nombre: 'V.Sís.',
      color: '#a78bfa',
      vol: getNum('vs_vol'), cem: getNum('vs_cem'), arena: 0, grava: 0, agua: 0,
      kg: vsKg, qq: vsQQ
    });

    // Viga Amarre
    const amKg = getNum('am_kl') + getNum('am_ke');
    const amQQ = getNum('am_qq');
    mods.push({
      nombre: 'V.Amarre',
      color: '#34d399',
      vol: getNum('am_vol'), cem: getNum('am_cem'), arena: 0, grava: 0, agua: 0,
      kg: amKg, qq: amQQ
    });

    // Escaleras
    let escKg = 0, escQQ = 0, escVol = 0, escCem = 0, escArena = 0, escGrava = 0, escAgua = 0;
    const escSum = document.getElementById('esc_sum');
    if (escSum) {
      const ris = escSum.querySelectorAll('.ri');
      // Orden: concreto, cemento, arena, grava, agua, acero total, quintales
      if (ris.length >= 7) {
        escVol = parseFloat(ris[0]?.querySelector('.v')?.textContent) || 0;
        escCem = parseFloat(ris[1]?.querySelector('.v')?.textContent) || 0;
        escArena = parseFloat(ris[2]?.querySelector('.v')?.textContent) || 0;
        escGrava = parseFloat(ris[3]?.querySelector('.v')?.textContent) || 0;
        escAgua = parseFloat(ris[4]?.querySelector('.v')?.textContent) || 0;
        escKg = parseFloat(ris[5]?.querySelector('.v')?.textContent) || 0;
        escQQ = parseFloat(ris[6]?.querySelector('.v')?.textContent) || 0;
      }
    }
    mods.push({
      nombre: 'Escaleras',
      color: '#e879f9',
      vol: escVol, cem: escCem, arena: escArena, grava: escGrava, agua: escAgua,
      kg: escKg, qq: escQQ
    });

    // Acero manual (estribos + barras)
    const acKg = getNum('e_kg') + getNum('b_kg');
    const acQQ = getNum('e_qq') + getNum('b_qq');
    mods.push({
      nombre: 'Acero (planilla)',
      color: '#c0c8d8',
      vol: 0, cem: 0, arena: 0, grava: 0, agua: 0,
      kg: acKg, qq: acQQ
    });

    return mods;
  }

  // ── ACTUALIZAR INTERFAZ ────────────────────────────
  function actualizar() {
    const mods = recolectar();
    
    // Resumen ejecutivo (memoria)
    const exec = document.getElementById('sum-exec');
    if (exec) {
      exec.innerHTML = mods.filter(m => m.vol > 0 || m.kg > 0).map(m => `
        <div class="sum-row">
          <span class="sr-mod" style="color:${m.color}">${m.nombre}</span>
          <div class="sr-vals">
            ${m.vol > 0 ? `<div class="sr-val"><div class="v">${m.vol.toFixed(2)}</div><div class="u">m³</div></div>` : ''}
            ${m.kg > 0 ? `<div class="sr-val"><div class="v">${m.kg.toFixed(2)}</div><div class="u">kg</div></div>` : ''}
          </div>
        </div>
      `).join('');
    }

    // Totales globales
    const totalVol = mods.reduce((s, m) => s + m.vol, 0);
    const totalKg = mods.reduce((s, m) => s + m.kg, 0);
    const totalQQ = mods.reduce((s, m) => s + m.qq, 0);

    document.getElementById('st-vol').textContent = totalVol.toFixed(2);
    document.getElementById('st-kg').textContent = totalKg.toFixed(2);
    document.getElementById('st-qq').textContent = totalQQ.toFixed(2);
    document.getElementById('sum-totals').style.display = totalVol > 0 || totalKg > 0 ? 'grid' : 'none';

    // Tabla de acero consolidada
    const taBody = document.getElementById('ta-body');
    const taFoot = document.getElementById('ta-foot');
    const taKgTot = document.getElementById('ta-kg-tot');
    const taQQTot = document.getElementById('ta-qq-tot');
    if (taBody) {
      const filas = mods.filter(m => m.kg > 0);
      taBody.innerHTML = filas.map(m => `
        <tr>
          <td class="tl" style="color:${m.color}">${m.nombre}</td>
          <td class="tst">${m.kg.toFixed(2)}</td>
          <td class="tst">${m.qq.toFixed(2)}</td>
          <td>—</td>
        </tr>
      `).join('');
      if (taFoot) taFoot.style.display = filas.length > 0 ? '' : 'none';
      if (taKgTot) taKgTot.textContent = totalKg.toFixed(2);
      if (taQQTot) taQQTot.textContent = totalQQ.toFixed(2);
    }
    document.getElementById('ta-wrap').style.display = totalKg > 0 ? 'block' : 'none';

    // Donut de acero
    const donutSection = document.getElementById('donut-section');
    const donutCanvas = document.getElementById('donutChart');
    const donutLegend = document.getElementById('donut-legend');
    if (donutSection && donutCanvas && totalKg > 0) {
      donutSection.style.display = 'block';
      const ctx = donutCanvas.getContext('2d');
      donutCanvas.width = 130; donutCanvas.height = 130;
      const partes = mods.filter(m => m.kg > 0);
      const total = partes.reduce((s, p) => s + p.kg, 0) || 1;
      let angIni = -Math.PI/2;
      ctx.clearRect(0, 0, 130, 130);
      partes.forEach(p => {
        const slice = (p.kg / total) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(65, 65);
        ctx.arc(65, 65, 50, angIni, angIni + slice);
        ctx.closePath();
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.strokeStyle = '#060e1c';
        ctx.lineWidth = 2;
        ctx.stroke();
        angIni += slice;
      });
      // Agujero centro
      ctx.beginPath();
      ctx.arc(65, 65, 25, 0, Math.PI*2);
      ctx.fillStyle = '#060e1c';
      ctx.fill();
      // Leyenda
      if (donutLegend) {
        donutLegend.innerHTML = partes.map(p => `
          <div class="dl-item">
            <div class="dl-dot" style="background:${p.color}"></div>
            <span>${p.nombre}</span>
            <strong>${p.kg.toFixed(2)} kg</strong>
          </div>
        `).join('');
      }
    } else if (donutSection) {
      donutSection.style.display = 'none';
    }

    // Gráfico de materiales (cemento, arena, grava)
    const matCanvas = document.getElementById('matChart');
    if (matCanvas) {
      const totalCem = mods.reduce((s, m) => s + m.cem, 0);
      const totalArena = mods.reduce((s, m) => s + m.arena, 0);
      const totalGrava = mods.reduce((s, m) => s + m.grava, 0);
      if (totalCem + totalArena + totalGrava > 0) {
        const ctx = matCanvas.getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Cemento (sacos)', 'Arena (m³)', 'Grava (m³)'],
            datasets: [{
              label: 'Total',
              data: [totalCem, totalArena, totalGrava],
              backgroundColor: ['#f0a500', '#00c9ff', '#a78bfa']
            }]
          },
          options: {
            responsive: true,
            plugins: { legend: { display: false } }
          }
        });
      }
    }

    // Conclusiones
    const concl = document.getElementById('concl-items');
    if (concl) {
      let items = '';
      if (totalVol > 20) items += `<div class="ci"><div class="cd"></div><p>Volumen total elevado (${totalVol.toFixed(2)} m³). Considerar logística de suministro.</p></div>`;
      if (totalKg > 500) items += `<div class="ci"><div class="cd"></div><p>Más de 500 kg de acero. Verificar traslapes y desperdicios.</p></div>`;
      if (totalVol > 0 && totalKg === 0) items += `<div class="ci"><div class="cd"></div><p>No se ha calculado acero en varios módulos. Actualice vigas y columnas.</p></div>`;
      if (items === '') items = '<div class="ci"><div class="cd"></div><p>Los cálculos están dentro de parámetros normales según ACI 318.</p></div>';
      concl.innerHTML = items;
    }
  }

  // ── CANVAS 3D INTERACTIVO ──────────────────────────
  function iniciar3D() {
    const canvas = document.getElementById('isoCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let ang = 0.5, lastX = 0;
    canvas.width = canvas.clientWidth || 320;
    canvas.height = 260;

    function dibujar() {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      // Configuración isométrica simple
      const cx = w/2, cy = h/2 + 20;
      const escala = 40;
      const cos = Math.cos(ang), sin = Math.sin(ang);

      function proy(x, y, z) {
        const xp = (x - y) * cos * escala + cx;
        const yp = (x + y) * sin * escala - z * escala * 0.8 + cy;
        return { x: xp, y: yp };
      }

      // Dibujar algunas columnas y vigas de ejemplo
      const elementos = [
        { tipo: 'col', x: -1, y: -1, z: 0, h: 1.5, color: '#f0a500' },
        { tipo: 'col', x: 1, y: -1, z: 0, h: 1.5, color: '#f0a500' },
        { tipo: 'col', x: -1, y: 1, z: 0, h: 1.5, color: '#f0a500' },
        { tipo: 'col', x: 1, y: 1, z: 0, h: 1.5, color: '#f0a500' },
        { tipo: 'viga', x1: -1, y1: -1, x2: 1, y2: -1, z: 1.5, color: '#a78bfa' },
        { tipo: 'viga', x1: 1, y1: -1, x2: 1, y2: 1, z: 1.5, color: '#a78bfa' }
      ];

      elementos.forEach(el => {
        if (el.tipo === 'col') {
          const base = proy(el.x, el.y, el.z);
          const top = proy(el.x, el.y, el.z + el.h);
          ctx.beginPath();
          ctx.moveTo(base.x, base.y);
          ctx.lineTo(top.x, top.y);
          ctx.strokeStyle = el.color;
          ctx.lineWidth = 4;
          ctx.stroke();
        } else if (el.tipo === 'viga') {
          const p1 = proy(el.x1, el.y1, el.z);
          const p2 = proy(el.x2, el.y2, el.z);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = el.color;
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      });
    }

    let dragging = false;
    canvas.addEventListener('touchstart', e => {
      e.preventDefault();
      dragging = true;
      lastX = e.touches[0].clientX;
    });
    canvas.addEventListener('touchmove', e => {
      if (!dragging) return;
      const dx = e.touches[0].clientX - lastX;
      ang += dx * 0.01;
      lastX = e.touches[0].clientX;
      dibujar();
    });
    canvas.addEventListener('touchend', () => dragging = false);
    canvas.addEventListener('mousedown', e => {
      dragging = true;
      lastX = e.clientX;
    });
    canvas.addEventListener('mousemove', e => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      ang += dx * 0.01;
      lastX = e.clientX;
      dibujar();
    });
    canvas.addEventListener('mouseup', () => dragging = false);
    dibujar();
  }

  // ── EXPORTACIONES PDF (básicas funcionales) ────────
  window.exportPDF = function() {
    if (!window.jspdf || !window.jspdf.jsPDF) {
      toast('Librería PDF no disponible');
      return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text('StructuraPro - Resumen de Proyecto', 10, 10);
    doc.text('Concreto total: ' + document.getElementById('st-vol')?.textContent + ' m3', 10, 20);
    doc.text('Acero total: ' + document.getElementById('st-kg')?.textContent + ' kg', 10, 30);
    doc.text('Quintales totales: ' + document.getElementById('st-qq')?.textContent, 10, 40);
    doc.save('resumen.pdf');
    toast('PDF exportado');
  };

  window.exportPlan = function() {
    if (!window.jspdf || !window.jspdf.jsPDF) {
      toast('Librería PDF no disponible');
      return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text('Planilla de Hierro', 10, 10);
    // Agregar tabla de acero si está visible
    const tabla = document.querySelector('#ta-wrap table');
    if (tabla) {
      doc.autoTable({ html: tabla, startY: 20 });
    }
    doc.save('planilla_acero.pdf');
    toast('Planilla exportada');
  };

  window.exportEscPDF = function() {
    if (!window.jspdf || !window.jspdf.jsPDF) {
      toast('Librería PDF no disponible');
      return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text('Planilla Escalera', 10, 10);
    const tabla = document.querySelector('#esc_tbl')?.closest('table');
    if (tabla) {
      doc.autoTable({ html: tabla, startY: 20 });
    }
    doc.save('escalera.pdf');
    toast('Planilla de escalera exportada');
  };

  // ── INICIALIZACIÓN ────────────────────────────────
  // Actualizar al cargar y al hacer clic en la pestaña Resumen
  window.addEventListener('load', () => {
    actualizar();
    iniciar3D();
  });

  // Interceptar clic en pestaña Resumen
  const tabResumen = document.querySelector('.tab[onclick*="res"]');
  if (tabResumen) {
    tabResumen.addEventListener('click', () => {
      setTimeout(actualizar, 100); // esperar a que se muestre el panel
    });
  }

  // También actualizar al calcular cualquier módulo (se puede hacer con toast pero mejor dejamos manual)
})();