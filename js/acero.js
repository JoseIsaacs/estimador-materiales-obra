// acero.js
const Acero = (function(){
  function leerInputs(){
    const barras = parseInt(document.getElementById("ph_barras")?.value) || 0;
    const pesoUnit = parseFloat(document.getElementById("ph_peso")?.value) || 0;
    return { barras, pesoUnit };
  }
  function calcPH(){
    const { barras, pesoUnit } = leerInputs();
    if(barras <= 0 || pesoUnit <= 0){ mostrarError("Ingresa cantidad y peso unitario válidos"); return; }
    const total = +(barras * pesoUnit);
    document.getElementById("ph_total").textContent = total.toFixed(2);
  }
  function init(){ window.calcPH = calcPH; document.querySelector("#ph_btn")?.addEventListener("click", calcPH); }
  return { init };
})();
document.addEventListener("DOMContentLoaded", Acero.init);