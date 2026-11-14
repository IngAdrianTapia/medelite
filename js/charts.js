/* Gráficas autocontenidas (Canvas 2D), etiquetas en es/en/fr. Sin librerías ni CDN. */
(function () {
  const ink = "#0B2236";
  const soft = "#3D5A70";
  const teal = "#005EB8";
  const copper = "#007FAE";
  const gold = "#3D5A70";
  const sand = "#C6D1DA";
  const palette = [teal, copper, gold, "#002B49", "#7A4A5A", "#3E6B3A"];

  function dprSetup(canvas) {
    const box = canvas.getBoundingClientRect();
    const w = Math.max(280, box.width || canvas.clientWidth || 600);
    const h = Number(canvas.getAttribute("height")) || 280;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w, h };
  }

  function text(ctx, s, x, y, opt) {
    opt = opt || {};
    ctx.fillStyle = opt.color || ink;
    ctx.font = (opt.font || "12px Outfit ME, sans-serif");
    ctx.textAlign = opt.align || "left";
    ctx.textBaseline = opt.base || "alphabetic";
    ctx.fillText(s, x, y);
  }

  function wrapText(ctx, str, max) {
    const words = String(str).split(" ");
    const lines = [];
    let line = "";
    for (const w of words) {
      const t = line ? line + " " + w : w;
      if (ctx.measureText(t).width > max && line) {
        lines.push(line);
        line = w;
      } else line = t;
    }
    if (line) lines.push(line);
    return lines;
  }

  function barChart(canvas, labels, values, opts) {
    const { ctx, w, h } = dprSetup(canvas);
    const padL = 24, padR = 16, padT = 20, padB = 66;
    const max = Math.max.apply(null, values) * 1.12 || 1;
    const n = values.length;
    const gw = w - padL - padR;
    const gh = h - padT - padB;
    const gap = 10;
    const bw = Math.max(8, (gw - gap * n) / n);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, w, h);
    // grid
    ctx.strokeStyle = "#C6D1DA";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padT + gh * (i / 4);
      ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(w - padR, y); ctx.stroke();
    }
    values.forEach((v, i) => {
      const x = padL + i * (bw + gap) + gap / 2;
      const bh = (v / max) * gh;
      const y = padT + gh - bh;
      ctx.fillStyle = palette[i % palette.length];
      ctx.fillRect(x, y, bw, bh);
      text(ctx, opts.format ? opts.format(v) : String(v), x + bw / 2, y - 6, { align: "center", font: "11px Outfit ME, sans-serif", color: soft });
      ctx.font = "11px Outfit ME, sans-serif";
      wrapText(ctx, labels[i], bw + gap - 2).slice(0, 2).forEach(function (ln, j) {
        text(ctx, ln, x + bw / 2, padT + gh + 15 + j * 13, { align: "center", font: "11px Outfit ME, sans-serif", color: ink });
      });
    });
    if (opts.source) {
      ctx.font = "10px Outfit ME, sans-serif";
      const lines = wrapText(ctx, opts.source, w - 16).slice(0, 2);
      lines.forEach(function (ln, j) {
        text(ctx, ln, 8, h - 6 - (lines.length - 1 - j) * 12, { font: "10px Outfit ME, sans-serif", color: soft });
      });
    }
  }

  function hbar(canvas, labels, values, opts) {
    const { ctx, w, h } = dprSetup(canvas);
    const padL = 150, padR = 72, padT = 12, padB = 28;
    const max = Math.max.apply(null, values) * 1.08 || 1;
    const n = values.length;
    const gh = h - padT - padB;
    const row = gh / n;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, w, h);
    values.forEach((v, i) => {
      const y = padT + i * row + 8;
      const bw = ((w - padL - padR) * v) / max;
      ctx.fillStyle = palette[i % palette.length];
      ctx.fillRect(padL, y, Math.max(2, bw), row - 16);
      text(ctx, labels[i], padL - 8, y + (row - 16) / 2 + 4, { align: "right", font: "12px Outfit ME, sans-serif" });
      text(ctx, opts.format ? opts.format(v) : String(v), padL + bw + 8, y + (row - 16) / 2 + 4, { font: "12px Outfit ME, sans-serif", color: soft });
    });
    if (opts.source) text(ctx, opts.source, 8, h - 6, { font: "10px Outfit ME, sans-serif", color: soft });
  }

  function groupedBars(canvas, groups, series, opts) {
    const { ctx, w, h } = dprSetup(canvas);
    const padL = 44, padR = 16, padT = 28, padB = 48;
    const all = series.flatMap((s) => s.values);
    const max = Math.max.apply(null, all) * 1.15 || 1;
    const gw = w - padL - padR;
    const gh = h - padT - padB;
    const n = groups.length;
    const cluster = gw / n;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i <= 4; i++) {
      const y = padT + gh * (i / 4);
      ctx.strokeStyle = "#C6D1DA";
      ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(w - padR, y); ctx.stroke();
    }
    series.forEach((s, si) => {
      const bw = (cluster * 0.62) / series.length;
      s.values.forEach((v, i) => {
        const x = padL + i * cluster + cluster * 0.2 + si * bw;
        const bh = (v / max) * gh;
        const y = padT + gh - bh;
        ctx.fillStyle = s.color || palette[si];
        ctx.fillRect(x, y, bw - 3, bh);
      });
      text(ctx, s.name, padL + si * 110, 16, { font: "12px Outfit ME, sans-serif", color: s.color || palette[si] });
    });
    groups.forEach((g, i) => {
      text(ctx, g, padL + i * cluster + cluster / 2, h - 16, { align: "center", font: "11px Outfit ME, sans-serif" });
    });
    if (opts && opts.source) text(ctx, opts.source, padL, h - 4, { font: "10px Outfit ME, sans-serif", color: soft });
  }

  function funnel(canvas, stages) {
    const { ctx, w, h } = dprSetup(canvas);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, w, h);
    const n = stages.length;
    const row = (h - 24) / n;
    const max = stages[0].value || 1;
    stages.forEach((s, i) => {
      const frac = s.value / max;
      const ww = Math.max(40, (w - 180) * frac);
      const x = 20 + ((w - 180) - ww) / 2;
      const y = 10 + i * row;
      ctx.fillStyle = palette[i % palette.length];
      ctx.beginPath();
      const r = 10;
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + ww, y, x + ww, y + row - 8, r);
      ctx.arcTo(x + ww, y + row - 8, x, y + row - 8, r);
      ctx.arcTo(x, y + row - 8, x, y, r);
      ctx.arcTo(x, y, x + ww, y, r);
      ctx.closePath();
      ctx.fill();
      text(ctx, s.label + "  ·  " + s.display, w - 12, y + (row - 8) / 2 + 4, { align: "right", font: "12px Outfit ME, sans-serif" });
      text(ctx, s.display, x + ww / 2, y + (row - 8) / 2 + 4, { align: "center", color: "#FFFFFF", font: "12px Outfit ME, sans-serif" });
    });
  }

  function nfmt(n) {
    return n.toLocaleString("es-MX");
  }

  const L = {
    es: {
      prov: ["Ontario", "Columbia Británica"],
      outSrc: "Fuente: Fraser Institute 2025 (estimación). Solo se muestran las dos provincias con más pacientes.",
      waitL: ["Nacional", "Ontario", "C. Británica", "Ortopedia (nac.)", "Resonancia (nac.)"],
      waitS: "Espera mediana (semanas)", waitSrc: "Fuente: Fraser Institute, Waiting Your Turn 2025.",
      spec: ["Urología", "Cirugía general", "Medicina interna", "Oftalmología"],
      specSrc: "Fuente: Fraser Institute 2025, canadienses atendidos fuera del país.",
      diag: ["Ultrasonido", "Tomografía", "Resonancia"], wk: " sem",
      diagSrc: "Fuente: Fraser Institute 2025, espera de imagen diagnóstica en Canadá.",
      sav: ["Rodilla", "Cadera", "All-on-4", "Manga", "Cataratas"],
      savSrc: "Ahorro típico según fuentes de mercado (Travel4Treatment, IPF 2025, Placidway). No es una cotización. Cataratas: bajo o nulo."
    },
    en: {
      prov: ["Ontario", "British Columbia"],
      outSrc: "Source: Fraser Institute 2025 (estimate). Only the two provinces with the most patients are shown.",
      waitL: ["National", "Ontario", "B.C.", "Orthopaedics (nat.)", "MRI (nat.)"],
      waitS: "Median wait (weeks)", waitSrc: "Source: Fraser Institute, Waiting Your Turn 2025.",
      spec: ["Urology", "General surgery", "Internal medicine", "Ophthalmology"],
      specSrc: "Source: Fraser Institute 2025, Canadians treated abroad.",
      diag: ["Ultrasound", "CT scan", "MRI"], wk: " wk",
      diagSrc: "Source: Fraser Institute 2025, diagnostic imaging waits in Canada.",
      sav: ["Knee", "Hip", "All-on-4", "Sleeve", "Cataracts"],
      savSrc: "Typical saving from market sources (Travel4Treatment, IPF 2025, Placidway). Not a quote. Cataracts: low or none."
    },
    fr: {
      prov: ["Ontario", "Colombie-Britannique"],
      outSrc: "Source : Institut Fraser 2025 (estimation). Seules les deux provinces comptant le plus de patients sont présentées.",
      waitL: ["National", "Ontario", "C.-B.", "Orthopédie (nat.)", "IRM (nat.)"],
      waitS: "Attente médiane (semaines)", waitSrc: "Source : Institut Fraser, Waiting Your Turn 2025.",
      spec: ["Urologie", "Chirurgie générale", "Médecine interne", "Ophtalmologie"],
      specSrc: "Source : Institut Fraser 2025, Canadiens soignés à l’étranger.",
      diag: ["Échographie", "Tomodensitométrie", "IRM"], wk: " sem.",
      diagSrc: "Source : Institut Fraser 2025, attente en imagerie diagnostique au Canada.",
      sav: ["Genou", "Hanche", "All-on-4", "Gastrectomie", "Cataractes"],
      savSrc: "Économie typique selon des sources de marché (Travel4Treatment, IPF 2025, Placidway). Ce n’est pas une soumission. Cataractes : faible ou nulle."
    }
  };

  window.MedEliteCharts = {
    render: function () {
      const lang = document.documentElement.getAttribute("data-lang") || "es";
      const t = L[lang] || L.es;
      const c1 = document.getElementById("chart-salida");
      if (c1) hbar(c1, t.prov, [51538, 25698], { format: nfmt, source: t.outSrc });
      const c2 = document.getElementById("chart-esperas");
      if (c2) groupedBars(c2, t.waitL,
        [{ name: t.waitS, values: [28.6, 19.2, 32.2, 48.6, 18.1], color: teal }],
        { source: t.waitSrc });
      const c3 = document.getElementById("chart-especialidades");
      if (c3) hbar(c3, t.spec, [12697, 10320, 8304, 6482], { format: nfmt, source: t.specSrc });
      const c4 = document.getElementById("chart-diagnostico");
      if (c4) barChart(c4, t.diag, [5.4, 8.8, 18.1],
        { format: function (v) { return v + t.wk; }, source: t.diagSrc });
      const c5 = document.getElementById("chart-ahorro");
      if (c5) barChart(c5, t.sav, [65, 65, 55, 70, 0],
        { format: function (v) { return v + "%"; }, source: t.savSrc });
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    window.MedEliteCharts.render();
    window.addEventListener("resize", function () {
      clearTimeout(window.__meChartT);
      window.__meChartT = setTimeout(window.MedEliteCharts.render, 180);
    });
  });
})();
