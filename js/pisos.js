// pisos.js
const Pisos = (function(){
  function leerInputs(){
    const area = parseFloat(document.getElementById("p_area").value) || 0;
    const esp = parseFloat(document.getElementById("p_esp").value) || 0;
    return { area, esp };
  }

  function calcP(){
    const { area, esp } = leerInputs();
    if(area <= 0 || esp <= 0){
      mostrarError("Ingresa valores válidos para pisos");
      return;
    }
    const volumen = (area * (esp/100)).toFixed(2);
    document.getElementById("p_vol").textContent = volumen;
    // Añadir fórmulas específicas de pisos aquí
  }

  function init(){
    window.calcP = calcP;
    document.querySelector("#p_btn")?.addEventListener("click", calcP);
  }
  return { init };
})();

document.addEventListener("DOMContentLoaded", Pisos.init);