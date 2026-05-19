 // zapatas.js
const Zapatas = (function(){
  function leerInputs(){
    const lado = parseFloat(document.getElementById("z_lado").value) || 0;
    const esp = parseFloat(document.getElementById("z_esp").value) || 0;
    return { lado, esp };
  }

  function calcZ(){
    const { lado, esp } = leerInputs();
    if(lado <= 0 || esp <= 0){
      mostrarError("Ingresa valores válidos para zapata");
      return;
    }
    const volumen = (lado*lado*esp/100).toFixed(2);
    document.getElementById("z_vol").textContent = volumen;
    // Añadir fórmulas ACI específicas aquí
  }

  function init(){
    window.calcZ = calcZ;
    document.querySelector("#z_btn")?.addEventListener("click", calcZ);
  }
  return { init };
})();

document.addEventListener("DOMContentLoaded", Zapatas.init);