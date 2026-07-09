/* LucideIcon — React icon component that renders Lucide glyphs imperatively.
   Safe across React re-renders (no createIcons() DOM replacement). */
(function () {
  var React = window.React;

  function toPascal(name) {
    return String(name || "")
      .split("-")
      .map(function (s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; })
      .join("");
  }

  function buildSvg(name) {
    var L = window.lucide;
    if (!L) return null;
    var node = (L.icons && L.icons[toPascal(name)]) || null;
    if (!node) return null;
    // Try the library's own factory first
    if (typeof L.createElement === "function") {
      try {
        var el = L.createElement(node);
        if (el && el.tagName && el.tagName.toLowerCase() === "svg") return el;
      } catch (e) { /* fall through */ }
    }
    // Manual build: IconNode = [[tag, attrs], ...]
    var NS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(NS, "svg");
    var base = {
      xmlns: NS, width: "24", height: "24", viewBox: "0 0 24 24",
      fill: "none", stroke: "currentColor", "stroke-width": "2",
      "stroke-linecap": "round", "stroke-linejoin": "round"
    };
    for (var k in base) svg.setAttribute(k, base[k]);
    var list = Array.isArray(node) ? node : [];
    for (var i = 0; i < list.length; i++) {
      var child = list[i];
      if (!Array.isArray(child)) continue;
      var tag = child[0], attrs = child[1] || {};
      var c = document.createElementNS(NS, tag);
      for (var a in attrs) c.setAttribute(a, attrs[a]);
      svg.appendChild(c);
    }
    return svg.childNodes.length ? svg : null;
  }

  window.LucideIcon = function (props) {
    var ref = React.useRef(null);
    React.useEffect(function () {
      var cancelled = false;
      var tries = 0;
      function attempt() {
        if (cancelled || !ref.current) return;
        var svg = buildSvg(props.name || "circle");
        if (svg) {
          var s = props.size || 18;
          svg.setAttribute("width", String(s));
          svg.setAttribute("height", String(s));
          ref.current.innerHTML = "";
          ref.current.appendChild(svg);
        } else if (++tries < 30) {
          setTimeout(attempt, 250);
        }
      }
      attempt();
      return function () { cancelled = true; };
    }, [props.name, props.size]);
    var style = Object.assign({ display: "inline-flex", flex: "none", lineHeight: 0 }, props.style || {});
    return React.createElement("span", { ref: ref, "aria-hidden": "true", style: style });
  };
})();
