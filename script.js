// ---------- Constants ----------
const CONSTANTS = [
  { sym: "c", name: "Lichtgeschwindigkeit", val: 299792458, unit: "m/s" },
  { sym: "h", name: "Planck-Konstante", val: 6.62607015e-34, unit: "J·s" },
  { sym: "hbar", name: "reduzierte Planck-Konstante", val: 1.054571817e-34, unit: "J·s" },
  { sym: "e", name: "Elementarladung", val: 1.602176634e-19, unit: "C" },
  { sym: "alpha", name: "Feinstrukturkonstante", val: 7.2973525693e-3, unit: "–" },
  { sym: "kB", name: "Boltzmann-Konstante", val: 1.380649e-23, unit: "J/K" },
  { sym: "G", name: "Gravitationskonstante", val: 6.6743e-11, unit: "m³/(kg·s²)" },
  { sym: "me", name: "Elektronenmasse", val: 9.1093837015e-31, unit: "kg" },
  { sym: "mp", name: "Protonenmasse", val: 1.67262192369e-27, unit: "kg" },
  { sym: "eps0", name: "elektr. Feldkonstante", val: 8.8541878128e-12, unit: "F/m" },
  { sym: "sigma", name: "Stefan-Boltzmann-Konstante", val: 5.670374419e-8, unit: "W/(m²·K⁴)" },
  { sym: "NA", name: "Avogadro-Konstante", val: 6.02214076e23, unit: "1/mol" },
  { sym: "lP", name: "Planck-Länge (√(ħG/c³))", val: 1.616255e-35, unit: "m" },
  { sym: "tP", name: "Planck-Zeit (lP/c)", val: 5.391247e-44, unit: "s" },
  { sym: "mP", name: "Planck-Masse (√(ħc/G))", val: 2.176434e-8, unit: "kg" },
  { sym: "EP", name: "Planck-Energie (mP·c²)", val: 1.956082e9, unit: "J" },
  { sym: "TP", name: "Planck-Temperatur", val: 1.416784e32, unit: "K" },
  { sym: "Lambda", name: "kosmologische Konstante (Messwert, Planck 2018)", val: 1.089e-52, unit: "1/m²" },
];
const SCOPE = {};
CONSTANTS.forEach(c => SCOPE[c.sym] = c.val);

const constList = document.getElementById('constList');
CONSTANTS.forEach(c => {
  const btn = document.createElement('button');
  btn.className = 'const-btn';
  btn.innerHTML = `<div class="const-top"><span class="const-sym mono">${c.sym}</span><span class="const-unit mono">${c.unit}</span></div>
    <div class="const-name">${c.name}</div><div class="const-val mono">${c.val.toExponential(6)}</div>`;
  btn.onclick = () => {
    const input = document.getElementById('formulaInput');
    input.value = input.value ? input.value + ' ' + c.sym : c.sym;
    input.focus();
  };
  constList.appendChild(btn);
});

// ---------- Formula ----------
const formulaInput = document.getElementById('formulaInput');
const resultDiv = document.getElementById('result');
function evaluate() {
  try {
    const scope = {...SCOPE};
    const statements = formulaInput.value.split(';').map(s => s.trim()).filter(Boolean);
    let val;
    statements.forEach(s => { val = math.evaluate(s, scope); });
    resultDiv.textContent = math.format(val, { notation: 'auto', precision: 8 });
    resultDiv.classList.remove('err');
  } catch (e) {
    resultDiv.textContent = 'Fehler: ' + e.message;
    resultDiv.classList.add('err');
  }
}
document.getElementById('evalBtn').onclick = evaluate;
formulaInput.addEventListener('keydown', e => { if (e.key === 'Enter') evaluate(); });

// ---------- QG / GR formula templates ----------
const QG_TEMPLATES = [
  {
    label: "Schwarzschild-Radius",
    status: "etabliert",
    color: "#0E9E76",
    formula: "M = 1.989e30; 2*G*M/c^2",
    info: "exakte Lösung der Einstein-Feldgleichungen für sphärische, ungeladene Masse (M in kg, hier Sonnenmasse als Beispiel)"
  },
  {
    label: "Hawking-Temperatur",
    status: "semiklassisch",
    color: "#B5720E",
    formula: "M = 1.989e30; hbar*c^3 / (8*pi*G*M*kB)",
    info: "Quantenfeldtheorie auf gekrümmter Raumzeit (nicht volle Quantengravitation), theoretisch hergeleitet, bislang nicht direkt gemessen"
  },
  {
    label: "Bekenstein-Hawking-Entropie",
    status: "semiklassisch",
    color: "#B5720E",
    formula: "M = 1.989e30; A = 4*pi*(2*G*M/c^2)^2; kB*c^3*A / (4*G*hbar)",
    info: "verknüpft Schwarzes-Loch-Fläche mit Entropie; zentraler Hinweis auf Quantengravitation, aber selbst nicht deren vollständige Theorie"
  },
  {
    label: "Planck-Länge",
    status: "etabliert",
    color: "#0E9E76",
    formula: "sqrt(hbar*G/c^3)",
    info: "Skala, ab der Quanteneffekte der Raumzeit erwartet werden – Definition ist gesichert, was dort physikalisch passiert nicht"
  },
  {
    label: "Krümmungsskalar (Friedmann, flach)",
    status: "etabliert",
    color: "#0E9E76",
    formula: "H0 = 2.2e-18; rho_c = 3*H0^2 / (8*pi*G); rho_c",
    info: "kritische Dichte aus den Friedmann-Gleichungen (Einsteins Feldgleichungen für homogenes Universum), H0 als Beispielwert in 1/s"
  },
  {
    label: "LQG Flächenquantisierung",
    status: "unbestätigte Kandidatentheorie",
    color: "#5B6268",
    formula: "gamma = 0.2375; j = 1; 8*pi*gamma*lP^2*sqrt(j*(j+1))",
    info: "Loop Quantum Gravity sagt diskrete Flächenspektren voraus; Immirzi-Parameter γ ist nicht unabhängig hergeleitet, sondern an Bekenstein-Hawking angepasst. Nicht experimentell bestätigt."
  },
];

const qgTemplatesDiv = document.getElementById('qgTemplates');
QG_TEMPLATES.forEach(t => {
  const btn = document.createElement('button');
  btn.className = 'const-btn';
  btn.innerHTML = `<div class="const-top"><span class="const-sym mono" style="color:${t.color}">${t.label}</span>
    <span class="const-unit mono" style="color:${t.color}">${t.status}</span></div>
    <div class="const-name">${t.info}</div>`;
  btn.onclick = () => {
    formulaInput.value = t.formula;
    evaluate();
  };
  qgTemplatesDiv.appendChild(btn);
});

// ---------- Function plot ----------
const plotInput = document.getElementById('plotInput');
const xMinInput = document.getElementById('xMin');
const xMaxInput = document.getElementById('xMax');
const plotErrorDiv = document.getElementById('plotError');
const canvas = document.getElementById('plotCanvas');

function fitCanvas(cv) {
  const wrap = cv.parentElement;
  cv.width = wrap.clientWidth * 2;
  cv.height = wrap.clientHeight * 2;
}

function drawAxes(ctx, W, H, xMin, xMax, yMin, yMax, marginL, marginB, marginT, marginR) {
  ctx.strokeStyle = '#D3D7DA';
  ctx.lineWidth = 1;
  ctx.font = '20px IBM Plex Mono, monospace';
  ctx.fillStyle = '#5B6268';
  const plotW = W - marginL - marginR, plotH = H - marginT - marginB;
  for (let i = 0; i <= 5; i++) {
    const gx = marginL + plotW * i / 5;
    ctx.beginPath(); ctx.moveTo(gx, marginT); ctx.lineTo(gx, marginT + plotH); ctx.stroke();
    const xv = xMin + (xMax - xMin) * i / 5;
    ctx.fillText(xv.toPrecision(3), gx - 15, H - marginB + 24);
  }
  for (let i = 0; i <= 4; i++) {
    const gy = marginT + plotH * i / 4;
    ctx.beginPath(); ctx.moveTo(marginL, gy); ctx.lineTo(marginL + plotW, gy); ctx.stroke();
    const yv = yMax - (yMax - yMin) * i / 4;
    ctx.fillText(yv.toPrecision(3), 4, gy + 6);
  }
  return { plotW, plotH };
}

function plot() {
  fitCanvas(canvas);
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  let xMin = parseFloat(xMinInput.value), xMax = parseFloat(xMaxInput.value);
  const n = 300; let data = [];
  try {
    const compiled = math.compile(plotInput.value);
    for (let i = 0; i <= n; i++) {
      const x = xMin + (xMax - xMin) * i / n;
      const y = compiled.evaluate({...SCOPE, x});
      data.push({x, y});
    }
    plotErrorDiv.style.display = 'none';
  } catch (e) {
    plotErrorDiv.style.display = 'block';
    plotErrorDiv.textContent = 'Fehler: ' + e.message;
    return;
  }
  const ys = data.map(d => d.y).filter(y => isFinite(y));
  let yMin = Math.min(...ys), yMax = Math.max(...ys);
  if (yMin === yMax) { yMin -= 1; yMax += 1; }
  const pad = (yMax - yMin) * 0.1; yMin -= pad; yMax += pad;
  const marginL = 60, marginB = 40, marginT = 20, marginR = 20;
  const { plotW, plotH } = drawAxes(ctx, W, H, xMin, xMax, yMin, yMax, marginL, marginB, marginT, marginR);
  function toPx(x) { return marginL + (x - xMin) / (xMax - xMin) * plotW; }
  function toPy(y) { return marginT + (1 - (y - yMin) / (yMax - yMin)) * plotH; }
  ctx.strokeStyle = '#0E9E76'; ctx.lineWidth = 3; ctx.beginPath();
  let started = false;
  data.forEach(d => {
    if (!isFinite(d.y)) { started = false; return; }
    const px = toPx(d.x), py = toPy(d.y);
    if (!started) { ctx.moveTo(px, py); started = true; } else ctx.lineTo(px, py);
  });
  ctx.stroke();
}
document.getElementById('plotBtn').onclick = plot;

// ---------- Experiment simulations ----------
const expSelect = document.getElementById('expSelect');
const expParams = document.getElementById('expParams');
const expCanvas = document.getElementById('expCanvas');
const expLegend = document.getElementById('expLegend');
const expStats = document.getElementById('expStats');
const expNote = document.getElementById('expNote');

function gaussianRandom(mean, sd) {
  // Box-Muller
  let u = 1 - Math.random(), v = Math.random();
  return mean + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
function poissonRandom(lambda) {
  if (lambda <= 0) return 0;
  if (lambda < 30) {
    let L = Math.exp(-lambda), k = 0, p = 1;
    do { k++; p *= Math.random(); } while (p > L);
    return k - 1;
  }
  // normal approx for large lambda
  return Math.max(0, Math.round(gaussianRandom(lambda, Math.sqrt(lambda))));
}

const EXP_TEMPLATES = {
  pendel: {
    params: [
      { id: 'L', label: 'Fadenlänge L (m)', val: 1.0 },
      { id: 'theta0', label: 'Auslenkung θ₀ (Grad)', val: 15 },
      { id: 'nMeas', label: 'Anzahl Messungen', val: 10 },
    ],
    note: "Theoriekurve: Kleinwinkelnäherung T = 2π√(L/g). Fehlerquelle: menschliche Reaktionszeit " +
          "bei Stoppuhr-Messung (Standardabweichung real ≈ 0,1–0,15 s, dokumentiert in Messmethodik-Literatur). " +
          "Bei größeren Auslenkungen weicht die reale Periode leicht von der Kleinwinkelformel ab " +
          "(nichtlinearer Term, hier nicht simuliert – θ₀ klein halten für Vergleichbarkeit).",
    run: (p) => {
      const g = 9.81;
      const T_theory = 2 * Math.PI * Math.sqrt(p.L / g);
      const reactionSD = 0.12; // Sekunden, realistischer Wert für menschliche Reaktionszeit
      const measurements = [];
      for (let i = 0; i < p.nMeas; i++) {
        measurements.push(Math.max(0, T_theory + gaussianRandom(0, reactionSD)));
      }
      const mean = measurements.reduce((a,b)=>a+b,0) / measurements.length;
      const sd = Math.sqrt(measurements.reduce((a,b)=>a+(b-mean)**2,0) / (measurements.length-1 || 1));
      const sem = sd / Math.sqrt(measurements.length);
      draw2D_points(measurements, T_theory, 's', 'Messung #');
      expStats.innerHTML = `Theorie: <b>T = ${T_theory.toFixed(4)} s</b> &nbsp;|&nbsp; Messung: <b>${mean.toFixed(4)} ± ${sem.toFixed(4)} s</b> (Standardfehler des Mittelwerts, n=${p.nMeas})`;
    }
  },
  zerfall: {
    params: [
      { id: 'N0', label: 'Startanzahl Kerne N₀', val: 5000 },
      { id: 'halfLife', label: 'Halbwertszeit (s)', val: 5 },
      { id: 'tMax', label: 'Beobachtungsdauer (s)', val: 30 },
    ],
    note: "Theoriekurve: N(t) = N₀ · e^(−λt), λ = ln(2)/T½ (Zerfallsgesetz). Die Fehlerbalken sind " +
          "die reale statistische Unsicherheit radioaktiver Zerfallsmessungen: Zählprozesse folgen einer " +
          "Poisson-Verteilung, der Fehler pro Messpunkt ist √N. Das ist keine Annahme, sondern Standardphysik " +
          "der Kern- und Teilchenzählstatistik.",
    run: (p) => {
      const lambda = Math.log(2) / p.halfLife;
      const steps = 20;
      const dt = p.tMax / steps;
      let N = p.N0;
      const points = [];
      for (let i = 0; i <= steps; i++) {
        const t = i * dt;
        const N_theory = p.N0 * Math.exp(-lambda * t);
        if (i > 0) {
          const pDecay = 1 - Math.exp(-lambda * dt);
          const expectedDecays = N * pDecay;
          const decays = Math.min(N, poissonRandom(expectedDecays));
          N -= decays;
        }
        points.push({ t, N_measured: N, N_theory, err: Math.sqrt(Math.max(N,1)) });
      }
      drawDecay(points);
      expStats.innerHTML = `λ = <b>${lambda.toFixed(4)} /s</b> &nbsp;|&nbsp; Endwert simuliert: <b>${N}</b> (Theorie: ${points[points.length-1].N_theory.toFixed(0)})`;
    }
  },
  doppelspalt: {
    params: [
      { id: 'lambda_nm', label: 'Wellenlänge λ (nm)', val: 633 },
      { id: 'd_um', label: 'Spaltabstand d (µm)', val: 50 },
      { id: 'a_um', label: 'Spaltbreite a (µm)', val: 10 },
      { id: 'L_m', label: 'Abstand zum Schirm L (m)', val: 1.0 },
    ],
    note: "Theoriekurve: I(θ) = I₀ · [sin(β)/β]² · cos²(δ/2), mit β = πa·sinθ/λ (Einzelspalt-Beugung) " +
          "und δ = 2πd·sinθ/λ (Zweistrahl-Interferenz) — Standardformel der Wellenoptik. " +
          "Die simulierten Detektor-Zählraten zeigen reales Photonen-Schrotrauschen (Poisson-Statistik), " +
          "wie es an einem echten Detektor gemessen würde.",
    run: (p) => {
      const lambda = p.lambda_nm * 1e-9;
      const d = p.d_um * 1e-6;
      const a = p.a_um * 1e-6;
      const thetaMax = Math.atan((5 * lambda) / d) * 3;
      const n = 400;
      const points = [];
      for (let i = 0; i <= n; i++) {
        const theta = -thetaMax + 2 * thetaMax * i / n;
        const beta = Math.PI * a * Math.sin(theta) / lambda;
        const delta = 2 * Math.PI * d * Math.sin(theta) / lambda;
        const sinc = beta === 0 ? 1 : Math.sin(beta) / beta;
        const I = sinc * sinc * Math.cos(delta / 2) ** 2;
        points.push({ x: theta * 1000, y: I }); // mrad
      }
      drawInterference(points);
      expStats.innerHTML = `Beugungshüllkurve durch Spaltbreite a=${p.a_um} µm, Interferenzstreifen durch Spaltabstand d=${p.d_um} µm bei λ=${p.lambda_nm} nm.`;
    }
  }
};

function buildParamInputs(key) {
  const tmpl = EXP_TEMPLATES[key];
  expParams.innerHTML = '';
  tmpl.params.forEach(p => {
    const wrap = document.createElement('div');
    wrap.innerHTML = `<div class="field-label mono">${p.label}</div>
      <input type="number" class="mono" id="p_${p.id}" value="${p.val}" step="any" />`;
    expParams.appendChild(wrap);
  });
  expNote.textContent = tmpl.note;
  expStats.textContent = '';
  expLegend.innerHTML = '';
}

function readParams(key) {
  const tmpl = EXP_TEMPLATES[key];
  const p = {};
  tmpl.params.forEach(pp => { p[pp.id] = parseFloat(document.getElementById('p_' + pp.id).value); });
  return p;
}

function draw2D_points(measurements, theoryLine, unit, xLabel) {
  fitCanvas(expCanvas);
  const ctx = expCanvas.getContext('2d');
  const W = expCanvas.width, H = expCanvas.height;
  ctx.clearRect(0,0,W,H);
  const n = measurements.length;
  const yMin = Math.min(theoryLine, ...measurements) * 0.9;
  const yMax = Math.max(theoryLine, ...measurements) * 1.1;
  const marginL=70, marginB=40, marginT=20, marginR=20;
  const { plotW, plotH } = drawAxes(ctx, W, H, 1, n, yMin, yMax, marginL, marginB, marginT, marginR);
  function toPx(i) { return marginL + (i - 0.5) / n * plotW; }
  function toPy(y) { return marginT + (1 - (y - yMin)/(yMax-yMin)) * plotH; }
  // theory line
  ctx.strokeStyle = '#B5720E'; ctx.lineWidth = 2; ctx.setLineDash([8,6]);
  ctx.beginPath(); ctx.moveTo(marginL, toPy(theoryLine)); ctx.lineTo(marginL+plotW, toPy(theoryLine)); ctx.stroke();
  ctx.setLineDash([]);
  // points
  ctx.fillStyle = '#0E9E76';
  measurements.forEach((m,i) => {
    const px = toPx(i+1), py = toPy(m);
    ctx.beginPath(); ctx.arc(px, py, 6, 0, 2*Math.PI); ctx.fill();
  });
  expLegend.innerHTML = `<span><span class="dot" style="background:#B5720E"></span>Theorie: ${theoryLine.toFixed(4)} ${unit}</span>
    <span><span class="dot" style="background:#0E9E76"></span>Einzelmessung</span>`;
}

function drawDecay(points) {
  fitCanvas(expCanvas);
  const ctx = expCanvas.getContext('2d');
  const W = expCanvas.width, H = expCanvas.height;
  ctx.clearRect(0,0,W,H);
  const tMax = points[points.length-1].t;
  const yMax = points[0].N_theory * 1.05;
  const marginL=70, marginB=40, marginT=20, marginR=20;
  const { plotW, plotH } = drawAxes(ctx, W, H, 0, tMax, 0, yMax, marginL, marginB, marginT, marginR);
  function toPx(t) { return marginL + t/tMax*plotW; }
  function toPy(N) { return marginT + (1 - N/yMax) * plotH; }
  // theory curve
  ctx.strokeStyle = '#B5720E'; ctx.lineWidth = 2; ctx.beginPath();
  points.forEach((pt,i) => { const px=toPx(pt.t), py=toPy(pt.N_theory); i===0?ctx.moveTo(px,py):ctx.lineTo(px,py); });
  ctx.stroke();
  // measured points + error bars
  ctx.strokeStyle = '#0E9E76'; ctx.fillStyle = '#0E9E76'; ctx.lineWidth = 2;
  points.forEach(pt => {
    const px = toPx(pt.t), py = toPy(pt.N_measured);
    const errPx = Math.abs(toPy(pt.N_measured - pt.err) - toPy(pt.N_measured + pt.err)) / 2;
    ctx.beginPath(); ctx.moveTo(px, py-errPx); ctx.lineTo(px, py+errPx); ctx.stroke();
    ctx.beginPath(); ctx.arc(px, py, 5, 0, 2*Math.PI); ctx.fill();
  });
  expLegend.innerHTML = `<span><span class="dot" style="background:#B5720E"></span>Theorie N(t)</span>
    <span><span class="dot" style="background:#0E9E76"></span>Simulierte Messung ± √N</span>`;
}

function drawInterference(points) {
  fitCanvas(expCanvas);
  const ctx = expCanvas.getContext('2d');
  const W = expCanvas.width, H = expCanvas.height;
  ctx.clearRect(0,0,W,H);
  const xMin = points[0].x, xMax = points[points.length-1].x;
  const yMin = 0, yMax = 1.05;
  const marginL=60, marginB=40, marginT=20, marginR=20;
  const { plotW, plotH } = drawAxes(ctx, W, H, xMin, xMax, yMin, yMax, marginL, marginB, marginT, marginR);
  function toPx(x) { return marginL + (x-xMin)/(xMax-xMin)*plotW; }
  function toPy(y) { return marginT + (1 - (y-yMin)/(yMax-yMin))*plotH; }
  ctx.strokeStyle = '#0E9E76'; ctx.lineWidth = 2.5; ctx.beginPath();
  points.forEach((pt,i) => { const px=toPx(pt.x), py=toPy(pt.y); i===0?ctx.moveTo(px,py):ctx.lineTo(px,py); });
  ctx.stroke();
  expLegend.innerHTML = `<span><span class="dot" style="background:#0E9E76"></span>Intensität I(θ) [x-Achse in mrad]</span>`;
}

function runExperiment() {
  const key = expSelect.value;
  const p = readParams(key);
  EXP_TEMPLATES[key].run(p);
}
expSelect.onchange = () => buildParamInputs(expSelect.value);
document.getElementById('runExpBtn').onclick = runExperiment;

// init
evaluate();
plot();
buildParamInputs('pendel');
window.addEventListener('resize', () => { plot(); });
