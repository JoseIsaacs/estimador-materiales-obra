// vigas_amarre.js
const VigasAmarre = (function(){
  function leerInputs(){
    const largo = parseFloat(document.getElementById("va_largo")?.value) || 0;
    const ancho = parseFloat(document.getElementById("va_ancho")?.value) || 0;
    const esp = parseFloat(document.getElementById("va_esp")?.value) || 0;
    return { largo, ancho, esp };
  }
  function calcVA(){
    const { largo, ancho, esp } = leerInputs();
    if(largo <= 0 || ancho <= 0 || esp <= 0){ mostrarError("Ingresa dimensiones válidas para viga de amarre"); return; }
    const volumen = +(largo * ancho * (esp/100));
    document.getElementById("va_vol").textContent = volumen.toFixed(2);
  }
  function init(){ window.calcVA = calcVA; document.querySelector("#va_btn")?.addEventListener("click", calcVA); }
  return { init };
})();
document.addEventListener("DOMContentLoaded", VigasAmarre.init);