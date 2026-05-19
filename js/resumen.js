// resumen.js
const Resumen = (function(){
  function generarResumen(){
    // Ejemplo simple: sumar volúmenes visibles
    const ids = ['cv','m_vol','p_vol','z_vol','v_vol','col_vol','pd_vol','vs_vol','va_vol','es_vol'];
    let total = 0;
    ids.forEach(id=>{
      const el = document.getElementById(id);
      if(el){
        const n = parseFloat(el.textContent) || 0;
        total += n;
      }
    });
    document.getElementById("res_total_vol").textContent = total.toFixed(2);
  }
  function init(){ document.querySelector("#res_btn")?.addEventListener("click", generarResumen); }
  return { init };
})();
document.addEventListener("DOMContentLoaded", Resumen.init); 