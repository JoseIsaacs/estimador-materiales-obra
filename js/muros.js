// muros.js
const Muros = (function(){
  function leerInputs(){
    const area = parseFloat(document.getElementById("m_area").value) || 0;
    const esp = parseFloat(document.getElementById("m_esp").value) || 0;
    return { area, esp };
  }

  function calcM(){
    const { area, esp } = leerInputs();
    if(area <= 0 || esp <= 0){
      mostrarError("Ingresa valores válidos para muros");
      return;
    }
    const volumen = (area * (esp/100)).toFixed(2);
    document.getElementById("m_vol").textContent = volumen;
    // Añadir fórmulas específicas de bloques aquí
  }

  function init(){
    window.calcM = calcM;
    document.querySelector("#m_btn")?.addEventListener("click", calcM);
  }
  return { init };
})();

document.addEventListener("DOMContentLoaded", Muros.init);