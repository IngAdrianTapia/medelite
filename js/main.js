/* MedElite International Health — interacción, idiomas (es/en/fr) y formulario de contacto por correo (mailto). */
(function () {
  const SUPPORTED = ["es", "en", "fr"];

  function getLang() {
    const q = new URLSearchParams(location.search).get("lang");
    if (q && SUPPORTED.indexOf(q) !== -1) return q;
    try {
      const s = sessionStorage.getItem("medelite-lang");
      if (s && SUPPORTED.indexOf(s) !== -1) return s;
    } catch (e) {}
    return "es";
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = "es";
    document.documentElement.lang = lang === "en" ? "en-CA" : lang === "fr" ? "fr-CA" : "es-MX";
    document.documentElement.setAttribute("data-lang", lang);
    try { sessionStorage.setItem("medelite-lang", lang); } catch (e) {}
    const dict = (window.MEDELITE_I18N && window.MEDELITE_I18N[lang]) || {};
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.textContent = dict[key];
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-html");
      if (dict[key] != null) el.innerHTML = dict[key];
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-aria");
      if (dict[key] != null) el.setAttribute("aria-label", dict[key]);
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-alt");
      if (dict[key] != null) el.setAttribute("alt", dict[key]);
    });
    const desc = dict["meta.desc"];
    const md = document.querySelector('meta[name="description"]');
    if (desc && md) md.setAttribute("content", desc);
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict[key] != null) el.setAttribute("placeholder", dict[key]);
    });
    const title = dict["meta.title"];
    if (title) document.title = title;
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
    });
    document.querySelectorAll("audio[data-audio-es]").forEach(function (a) {
      const src = a.getAttribute("data-audio-" + lang) || a.getAttribute("data-audio-en") || a.getAttribute("data-audio-es");
      if (src && !a.src.endsWith(src.replace("./", "").split("/").pop()) && a.getAttribute("src") !== src) {
        const paused = a.paused;
        const t = a.currentTime;
        a.setAttribute("src", src);
        a.load();
        if (!paused && t) { a.currentTime = 0; }
      }
    });
    if (window.MedEliteCharts) window.MedEliteCharts.render();
    const url = new URL(location.href);
    url.searchParams.set("lang", lang);
    history.replaceState({}, "", url);
  }

  function bindNav() {
    const btn = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".site-nav");
    if (!btn || !nav) return;
    btn.addEventListener("click", function () {
      const open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  }

  function bindLang() {
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
    });
  }

  function bindForm() {
    const form = document.getElementById("contacto-form");
    const ok = document.getElementById("form-ok");
    if (!form) return;
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      const lang = document.documentElement.getAttribute("data-lang") || "es";
      const dict = (window.MEDELITE_I18N && window.MEDELITE_I18N[lang]) || {};
      const val = function (n) { return ((form[n] && form[n].value) || "").trim(); };
      const nombre = val("nombre");
      const apellido = val("apellido");
      const email = val("email");
      const tel = val("telefono");
      const ciudad = val("ciudad");
      const trat = val("tratamiento");
      const fechas = val("fechas");
      const msg = val("mensaje");
      if (!form.checkValidity() || !nombre || !apellido || !email || !tel || !ciudad || !trat) {
        form.reportValidity();
        return;
      }
      if (/(\d[ -]*){13,}/.test(msg)) {
        alert(dict["ct.warn"] || "Please do not include card numbers or clinical details in this message.");
        return;
      }
      const to = form.getAttribute("data-to") || "info@medeliteofficial.com";
      const body = [
        (dict["ct.b.nom"] || "Nombre") + ": " + nombre,
        (dict["ct.b.ape"] || "Apellido") + ": " + apellido,
        (dict["ct.b.em"] || "Correo") + ": " + email,
        (dict["ct.b.tel"] || "Teléfono") + ": " + tel,
        (dict["ct.b.city"] || "Ciudad/Provincia") + ": " + ciudad,
        (dict["ct.b.trat"] || "Tratamiento") + ": " + trat,
        (dict["ct.b.fechas"] || "Fechas") + ": " + (fechas || "-"),
        "",
        (dict["ct.b.msg"] || "Mensaje") + ":",
        msg
      ].join("\r\n");
      const href = "mailto:" + to +
        "?subject=" + encodeURIComponent(dict["ct.subj"] || "MedElite") +
        "&body=" + encodeURIComponent(body);
      if (ok) ok.classList.add("show");
      window.location.href = href;
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    bindNav();
    bindLang();
    bindForm();
    setLang(getLang());
  });

  window.MedEliteI18n = { setLang: setLang, getLang: getLang };
})();
