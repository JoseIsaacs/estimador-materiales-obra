// js/zapatas.js
function calcZap() {
  // Lectura de inputs
  const b = parseFloat(document.getElementById('z_b').value) || 0; // ancho cm
  const l = parseFloat(document.getElementById('z_l').value) || 0; // largo cm
  const h = parseFloat(document.getElementById('z_h').value) || 0; // altura cm
  const n = parseInt(document.getElementById('z_n').value) || 0;   // número zapatas
  const rec = parseFloat(document.getElementById('z_rec').value); // recubrimiento cm
  const fc = parseFloat(document.getElementById('z_fc').value);   // f'c
  const barra = document.getElementById('z_bd').value; // #3, #4, #5...
  const sep = parseFloat(document.getElementById('z_sep').value); // separación cm

  if (b <= 0 || l <= 0 || h <= 0 || n <= 0) {
    toast('Complete todos los datos de geometría');
    return;
  }

  // Diámetros y pesos según barra
  const barData = {
    '3': { diam: 0.953, kgm: 0.560 },
    '4': { diam: 1.27,  kgm: 0.994 },
    '5': { diam: 1.59,  kgm: 1.552 },
    '6': { diam: 1.91,  kgm: 2.235 },
    '7': { diam: 2.22,  kgm: 3.042 },
    '8': { diam: 2.54,  kgm: 3.973 }
  };
  const bar = barData[barra];
  if (!bar) { toast('Diámetro de barra no válido'); return; }

  // Dimensiones útiles (cm)
  const bu = b - 2 * rec;
  const lu = l - 2 * rec;
  if (bu <= 0 || lu <= 0) {
    toast('Recubrimiento mayor que la dimensión de la zapata');
    return;
  }

  // Número de barras en cada dirección
  const nbX = Math.floor(bu / sep) + 1;
  const nbY = Math.floor(lu / sep) + 1;

  // Longitudes (m)
  const lBarraX = lu / 100; // largo útil Y en metros
  const lBarraY = bu / 100; // largo útil X en metros

  // Metros lineales por zapata
  const mX = nbX * lBarraX;
  const mY = nbY * lBarraY;
  const mTotalZapata = mX + mY;

  // Peso por zapata (kg)
  const kgZapata = mTotalZapata * bar.kgm;
  // Total proyecto con 7% de desperdicio
  const kgTotal = kgZapata * n * 1.07;
  const qqTotal = kgTotal / 45.36;

  // Concreto
  const volZapata = (b / 100) * (l / 100) * (h / 100); // m³ por zapata
  const volTotal = volZapata * n;
  // Dosificación (sacos, arena, grava, agua) según fc (valores promedio)
  let sacosPorM3, arenaPorM3, gravaPorM3, aguaPorM3;
  if (fc === 175) {
    sacosPorM3 = 6.5; arenaPorM3 = 0.55; gravaPorM3 = 0.75; aguaPorM3 = 180;
  } else if (fc === 245) {
    sacosPorM3 = 8.0; arenaPorM3 = 0.50; gravaPorM3 = 0.70; aguaPorM3 = 190;
  } else { // fc 210 (default)
    sacosPorM3 = 7.0; arenaPorM3 = 0.53; gravaPorM3 = 0.72; aguaPorM3 = 185;
  }

  const cemento = (volTotal * sacosPorM3).toFixed(1);
  const arena = (volTotal * arenaPorM3).toFixed(2);
  const grava = (volTotal * gravaPorM3).toFixed(2);
  const agua = Math.round(volTotal * aguaPorM3);

  // Mostrar resultados en el panel
  const res = document.getElementById('res-z');
  if (res) res.classList.add('show');

  // Tabla de desarrollo
  const tblWrap = document.getElementById('z_tbl_wrap');
  if (tblWrap) {
    tblWrap.innerHTML = `<table>
      <thead><tr><th>Concepto</th><th>Valor</th><th>Unidad</th></tr></thead>
      <tbody>
        <tr><td>Ancho útil</td><td>${bu.toFixed(1)}</td><td>cm</td></tr>
        <tr><td>Largo útil</td><td>${lu.toFixed(1)}</td><td>cm</td></tr>
        <tr><td>Barras dir. X</td><td>${nbX}</td><td>#${barra} c/${sep} cm</td></tr>
        <tr><td>Barras dir. Y</td><td>${nbY}</td><td>#${barra} c/${sep} cm</td></tr>
        <tr><td>Long. barra X</td><td>${lBarraX.toFixed(2)}</td><td>m</td></tr>
        <tr><td>Long. barra Y</td><td>${lBarraY.toFixed(2)}</td><td>m</td></tr>
        <tr><td>Metros totales/zapata</td><td>${mTotalZapata.toFixed(2)}</td><td>m</td></tr>
        <tr class="trow-tot"><td>Peso acero/zapata</td><td>${kgZapata.toFixed(2)}</td><td>kg</td></tr>
        <tr class="trow-tot"><td>Peso acero total (${n} zapatas +7%)</td><td>${kgTotal.toFixed(2)}</td><td>kg</td></tr>
        <tr class="trow-tot"><td>Quintales totales</td><td>${qqTotal.toFixed(2)}</td><td>qq</td></tr>
      </tbody></table>`;
  }

  // Resumen de concreto
  const zSum = document.getElementById('z_sum');
  if (zSum) {
    zSum.innerHTML = `
      <div class="ri"><div class="v">${volTotal.toFixed(2)}</div><div class="l">CONCRETO</div><div class="u">m³</div></div>
      <div class="ri"><div class="v">${cemento}</div><div class="l">CEMENTO</div><div class="u">sacos 50kg</div></div>
      <div class="ri"><div class="v">${arena}</div><div class="l">ARENA</div><div class="u">m³</div></div>
      <div class="ri"><div class="v">${grava}</div><div class="l">GRAVA</div><div class="u">m³</div></div>
      <div class="ri"><div class="v">${agua}</div><div class="l">AGUA</div><div class="u">litros</div></div>`;
  }

  // Canvas (dibujo simple de parrilla)
  const canvas = document.getElementById('zapCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width = canvas.clientWidth || 300;
    const h = canvas.height = 190;
    ctx.clearRect(0, 0, w, h);
    // Fondo concreto
    ctx.fillStyle = 'rgba(167,139,250,0.15)';
    ctx.fillRect(20, 20, w-40, h-40);
    // Dibujar líneas de barras
    ctx.strokeStyle = '#fbbf24'; // amarillo para X
    ctx.lineWidth = 2;
    const sepXpx = (w-40) / (nbX+1);
    for (let i=1; i<=nbX; i++) {
      const x = 20 + i * sepXpx;
      ctx.beginPath();
      ctx.moveTo(x, 20);
      ctx.lineTo(x, h-20);
      ctx.stroke();
    }
    ctx.strokeStyle = '#00c9ff'; // azul para Y
    const sepYpx = (h-40) / (nbY+1);
    for (let i=1; i<=nbY; i++) {
      const y = 20 + i * sepYpx;
      ctx.beginPath();
      ctx.moveTo(20, y);
      ctx.lineTo(w-20, y);
      ctx.stroke();
    }
  }

  toast('Zapata calculada');
}