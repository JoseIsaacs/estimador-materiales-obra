// concreto.js
const Concreto = (function () {
  const DESPERDICIO = 1.07;

  function _toNumber(value) {
    const n = parseFloat(value);
    return Number.isFinite(n) ? n : 0;
  }

  function calcularVolumen(area, espCm) {
    return +(area * (espCm / 100));
  }

  function dosificacionBasica(volumen, fc) {
    // Ejemplo simplificado de dosificación por m3
    // Ajusta coeficientes según tus tablas reales
    const cementoPorM3 = 7; // sacos por m3 (ejemplo)
    const arenaPorM3 = 0.5; // m3
    const gravaPorM3 = 0.8; // m3
    const aguaPorM3 = 180; // litros

    return {
      cemento: Math.ceil(cementoPorM3 * volumen * DESPERDICIO),
      arena: +(arenaPorM3 * volumen * DESPERDICIO).toFixed(2),
      grava: +(gravaPorM3 * volumen * DESPERDICIO).toFixed(2),
      agua: Math.round(aguaPorM3 * volumen * DESPERDICIO),
      dosificacion: `${fc} kg/cm²`
    };
  }

  function leerInputs() {
    const area = _toNumber(document.getElementById("c_area")?.value);
    const esp = _toNumber(document.getElementById("c_esp")?.value);
    const fc = parseInt(document.getElementById("c_fc")?.value) || 210;
    return { area, esp, fc };
  }

  function pintarResultados({ volumen, cemento, arena, grava, agua, dosificacion }) {
    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };
    setText("cv", volumen.toFixed(2));
    setText("cc", cemento);
    setText("ca", arena);
    setText("cg", grava);
    setText("cw", agua);
    setText("cdos", dosificacion);
  }

  function mostrarError(msg) {
    // Elemento de error opcional en el HTML con id="c_error"
    const el = document.getElementById("c_error");
    if (el) {
      el.textContent = msg;
      el.style.display = "block";
      setTimeout(() => { el.style.display = "none"; }, 4000);
    } else {
      console.warn("Concreto error:", msg);
    }
  }

  function calcC() {
    try {
      const { area, esp, fc } = leerInputs();
      if (area <= 0 || esp <= 0) {
        mostrarError("Ingresa Área y Espesor válidos mayores que cero");
        return;
      }
      const volumen = calcularVolumen(area, esp);
      const res = dosificacionBasica(volumen, fc);
      pintarResultados({ volumen, ...res });
    } catch (e) {
      console.error("Error en calcC", e);
      mostrarError("Error interno al calcular. Revisa la consola.");
    }
  }

  function initBindings() {
    const btn = document.querySelector(".btn.by");
    if (btn) {
      btn.addEventListener("click", calcC);
    } else {
      // Fallback: si el botón usa onclick inline, no hacemos nada
      // pero dejamos la función global para compatibilidad
      window.calcC = calcC;
    }
  }

  function init() {
    // Exponer la función globalmente por compatibilidad con index.html antiguo
    window.calcC = calcC;
    initBindings();
  }

  return { init, calcC };
})();

// Auto inicialización segura cuando el DOM esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", Concreto.init);
} else {
  Concreto.init();
}