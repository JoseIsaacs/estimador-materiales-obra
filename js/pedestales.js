// pedestales.js
const Pedestales = (function(){
  const DESPERDICIO = 1.07;
  function leerInputs(){
    const base = parseFloat(document.getElementById("pd_base")?.value) || 0;
    const altura = parseFloat(document.getElementById("pd_alt")?.value) || 0;
    return { base, altura };
  }
  function calcPD(){
    const { base, altura } = leerInputs();
    if(base <= 0 || altura <= 0){ mostrarError("Ingresa base y altura válidas para pedestal"); return; }
    const volumen = +(base * base * (altura/100));
    document.getElementById("pd_vol").textContent = volumen.toFixed(2);
  }
  function init(){ window.calcPD = calcPD; document.querySelector("#pd_btn")?.addEventListener("click", calcPD); }
  return { init };
})();
document.addEventListener("DOMContentLoaded", Pedestales.init);