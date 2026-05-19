// vigas.js
const Vigas = (function(){
  const DESPERDICIO = 1.07;
  function leerInputs(){
    const largo = parseFloat(document.getElementById("v_largo")?.value) || 0;
    const ancho = parseFloat(document.getElementById("v_ancho")?.value) || 0;
    const esp = parseFloat(document.getElementById("v_esp")?.value) || 0;
    return { largo, ancho, esp };
  }
  function calcV(){
    const { largo, ancho, esp } = leerInputs();
    if(largo <= 0 || ancho <= 0 || esp <= 0){ mostrarError("Ingresa dimensiones válidas para viga"); return; }
    const volumen = +(largo * ancho * (esp/100));
    const cemento = Math.ceil(7 * volumen * DESPERDICIO);
    document.getElementById("v_vol").textContent = volumen.toFixed(2);
    document.getElementById("v_cem").textContent = cemento;
  }
  function init(){ window.calcV = calcV; document.querySelector("#v_btn")?.addEventListener("click", calcV); }
  return { init };
})();
document.addEventListener("DOMContentLoaded", Vigas.init);