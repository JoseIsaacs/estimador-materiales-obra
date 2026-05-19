// escaleras.js
const Escaleras = (function(){
  function leerInputs(){
    const ancho = parseFloat(document.getElementById("es_ancho")?.value) || 0;
    const largo = parseFloat(document.getElementById("es_largo")?.value) || 0;
    const esp = parseFloat(document.getElementById("es_esp")?.value) || 0;
    return { ancho, largo, esp };
  }
  function calcES(){
    const { ancho, largo, esp } = leerInputs();
    if(ancho <= 0 || largo <= 0 || esp <= 0){ mostrarError("Ingresa dimensiones válidas para escalera"); return; }
    const volumen = +(ancho * largo * (esp/100));
    document.getElementById("es_vol").textContent = volumen.toFixed(2);
  }
  function init(){ window.calcES = calcES; document.querySelector("#es_btn")?.addEventListener("click", calcES); }
  return { init };
})();
document.addEventListener("DOMContentLoaded", Escaleras.init); 