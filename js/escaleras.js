<!-- ═══ ESCALERA ═══ -->
<div id="esc" class="pg">
  <div class="sh"><div class="si si-e">🪜</div><div><h2 class="ce">ESCALERA — LOSA INCLINADA</h2><p>SECCIÓN LONGITUDINAL · ACERO · DIAGRAMA</p></div></div>
  <div class="chip chip-e">🪜 ACI 318 · COPANIT · ES09 Ganchos 90°/135°</div>
  <div class="fb fb-e"><lbl>📐 GEOMETRÍA Y REFUERZO — ACI 318 / REP</lbl>
    <div class="f">L<sub>incl</sub>=√(H²+L<sub>h</sub>²) | α=arctan(H/L<sub>h</sub>)<br>
    t<sub>losa</sub>=max(⌈L<sub>i</sub>/20⌉,10) <span class="e">[cm]</span><br>
    Long.inf: N barras @15cm | ES09: 90°inf/135°sup<br>
    qq=(kg×<span class="g">1.07</span>)/<span class="g">45.36</span></div></div>
  <div class="card"><h4 class="he">PARÁMETROS</h4>
    <div class="r2">
      <div class="fi"><label>ALTURA TOTAL (cm)</label><input id="E_H" type="number" min="80" step="1" placeholder="280" oninput="liveEsc()"></div>
      <div class="fi"><label>N° ESCALONES</label><input id="E_N" type="number" min="3" step="1" placeholder="16" oninput="liveEsc()"></div>
    </div>
    <div class="r2">
      <div class="fi"><label>HUELLA (cm)</label><input id="E_hu" type="number" min="20" step="0.5" placeholder="27" oninput="liveEsc()"></div>
      <div class="fi"><label>CONTRAHUELLA (cm)</label><input id="E_co" type="number" min="14" step="0.5" placeholder="17.5" oninput="liveEsc()"></div>
    </div>
    <div class="r2">
      <div class="fi"><label>ANCHO (cm)</label><input id="E_an" type="number" min="80" step="5" placeholder="120" oninput="liveEsc()"></div>
      <div class="fi"><label>f'c</label><select id="E_fc">
        <option value="175">175 kg/cm²</option>
        <option value="210" selected>210 kg/cm²</option></select></div>
    </div>
    <div class="r3">
      <div class="fi"><label>BARRA LONG.</label><select id="E_bl">
        <option value="4" selected>#4</option><option value="5">#5</option></select></div>
      <div class="fi"><label>TRANSV.</label><select id="E_bt">
        <option value="4" selected>#4</option><option value="3">#3</option></select></div>
      <div class="fi"><label>GANCHO</label><select id="E_bg">
        <option value="3" selected>#3</option><option value="4">#4</option></select></div>
    </div></div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px;margin-bottom:12px">
    <div class="ri"><div class="v" style="color:var(--esc);font-size:14px" id="e_incl">—</div><div class="l">L INCLINADA</div><div class="u">m</div></div>
    <div class="ri"><div class="v" style="color:var(--esc);font-size:14px" id="e_alpha">—</div><div class="l">ÁNGULO α</div><div class="u">°</div></div>
    <div class="ri"><div class="v" style="color:var(--esc);font-size:14px" id="e_tlosa">—</div><div class="l">t LOSA</div><div class="u">cm</div></div>
  </div>
  <div class="iso-outer" style="border-color:rgba(232,121,249,.3)">
    <h4 style="color:var(--esc)">🔥 DIAGRAMA DE REFUERZO — SECCIÓN LONGITUDINAL</h4>
    <canvas id="diagCanvas" height="200"></canvas>
    <div class="legend">
      <div class="leg"><div class="leg-d" style="background:#f97316"></div>Long. inf.</div>
      <div class="leg"><div class="leg-d" style="background:#38bdf8"></div>Transversal</div>
      <div class="leg"><div class="leg-d" style="background:#fb7185"></div>Superior</div>
      <div class="leg"><div class="leg-d" style="background:#4ade80"></div>ES09</div>
    </div>
  </div>
  <button class="btn be" onclick="calcEsc()">🪜 CALCULAR ESCALERA</button>
  <div id="res-esc" class="rb" style="display:none">
    <h4>✅ ESCALERA — TABLA DE ACERO</h4>
    <div class="rg" id="esc_sum" style="margin-bottom:12px"></div>
    <div class="tw"><table>
      <thead><tr><th>TIPO REFUERZO</th><th>DIÁM.</th><th>LONG.</th><th>NOTAS</th></tr></thead>
      <tbody id="esc_tbl"></tbody>
      <tfoot><tr class="trow-tot" id="esc_tot" style="display:none">
        <td id="et_l">TOTAL</td><td id="et_d">—</td><td id="et_m">—</td><td>Suma total</td>
      </tr></tfoot>
    </table></div>
    <div id="esc_wn" class="wb ok" style="display:none"></div>
    <br><button class="bpdf" onclick="exportEscPDF()">📄 EXPORTAR PLANILLA ESCALERA PDF</button>
  </div>
</div>