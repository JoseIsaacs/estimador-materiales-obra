// vigas_sismicas.js
const VigasSismicas = (function(){
  function leerInputs(){
    const largo = parseFloat(document.getElementById("vs_largo")?.value) || 0;
    const ancho = parseFloat(document.getElementById("vs_ancho")?.value) || 0;
    const esp = parseFloat(document.getElementById("vs_esp")?.value) || 0;
    return { largo, ancho, esp };
  }
  function calcVS(){
    const { largo, ancho, esp } = leerInputs();
    if(largo <= 0 || ancho <= 0 || esp <= 0){ mostrarError("Ingresa dimensiones válidas para viga sísmica"); return; }
    const volumen = +(largo * ancho * (esp/100));
    document.getElementById("vs_vol").textContent = volumen.toFixed(2);
  }
  function init(){ window.calcVS = calcVS; document.querySelector("#vs_btn")?.addEventListener("click", calcVS); }
  return { init };
})();
document.addEventListener("DOMContentLoaded", VigasSismicas.init);