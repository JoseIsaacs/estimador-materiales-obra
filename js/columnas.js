// columnas.js
const Columnas = (function(){
  const DESPERDICIO = 1.07;
  function leerInputs(){
    const seccionA = parseFloat(document.getElementById("c_seca")?.value) || 0;
    const altura = parseFloat(document.getElementById("c_alt")?.value) || 0;
    return { seccionA, altura };
  }
  function calcCol(){
    const { seccionA, altura } = leerInputs();
    if(seccionA <= 0 || altura <= 0){ mostrarError("Ingresa sección y altura válidas para columna"); return; }
    const volumen = +(seccionA * (altura/100));
    document.getElementById("col_vol").textContent = volumen.toFixed(2);
  }
  function init(){ window.calcCol = calcCol; document.querySelector("#col_btn")?.addEventListener("click", calcCol); }
  return { init };
})();
document.addEventListener("DOMContentLoaded", Columnas.init); 