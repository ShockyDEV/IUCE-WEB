/* @ds-bundle: {"format":4,"namespace":"IUCEReservasDesignSystem_58b4a1","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"CardHeader","sourcePath":"components/core/Card.jsx"},{"name":"CardTitle","sourcePath":"components/core/Card.jsx"},{"name":"CardDescription","sourcePath":"components/core/Card.jsx"},{"name":"CardContent","sourcePath":"components/core/Card.jsx"},{"name":"CardFooter","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Textarea","sourcePath":"components/core/Textarea.jsx"},{"name":"InstitutionalFooter","sourcePath":"components/layout/InstitutionalFooter.jsx"},{"name":"Navbar","sourcePath":"components/layout/Navbar.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"36551f0b159d","components/core/Button.jsx":"d08d55a305d8","components/core/Card.jsx":"6efdef1f74a0","components/core/Icon.jsx":"3e36efa6e918","components/core/Input.jsx":"dc67e84b2737","components/core/Textarea.jsx":"22a82891d976","components/layout/InstitutionalFooter.jsx":"107c3661bed7","components/layout/Navbar.jsx":"dadf2e7e7500","ui_kits/iuce-reservas/Admin.jsx":"0b3028ffac37","ui_kits/iuce-reservas/Dashboard.jsx":"3b9fe86b7630","ui_kits/iuce-reservas/Landing.jsx":"35b8995dc8ec","ui_kits/iuce-reservas/SignIn.jsx":"2a0ef235dd51","ui_kits/iuce-reservas/SpacesCatalog.jsx":"ee8a460e7102","ui_kits/iuce-reservas/data.js":"e61a674abeaa"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.IUCEReservasDesignSystem_58b4a1 = window.IUCEReservasDesignSystem_58b4a1 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const VARIANTS = {
  default: {
    background: "var(--gray-100)",
    color: "var(--gray-700)"
  },
  info: {
    background: "var(--iuce-blue-pale)",
    color: "var(--iuce-blue-dark)"
  },
  success: {
    background: "var(--success-50)",
    color: "var(--success-700)"
  },
  warning: {
    background: "var(--warning-50)",
    color: "var(--warning-700)"
  },
  danger: {
    background: "var(--danger-50)",
    color: "var(--danger-700)"
  },
  outline: {
    background: "transparent",
    color: "var(--gray-700)",
    border: "1px solid var(--gray-200)"
  },
  secondary: {
    background: "var(--gray-200)",
    color: "var(--gray-700)"
  }
};

/**
 * IUCE Badge — small status pill. Used for reservation states, roles and
 * eyebrow labels. Copied from badge.tsx.
 */
function Badge({
  variant = "default",
  children,
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
      borderRadius: "var(--radius-full)",
      padding: "2px 10px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-medium)",
      lineHeight: "1.4",
      ...VARIANTS[variant],
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const VARIANTS = {
  default: {
    background: "var(--iuce-blue-dark)",
    color: "var(--white)",
    border: "1px solid transparent",
    boxShadow: "var(--shadow-sm)"
  },
  primary: {
    background: "var(--usal-red)",
    color: "var(--white)",
    border: "1px solid transparent",
    boxShadow: "var(--shadow-sm)"
  },
  secondary: {
    background: "var(--white)",
    color: "var(--gray-700)",
    border: "1px solid var(--gray-200)",
    boxShadow: "var(--shadow-sm)"
  },
  ghost: {
    background: "transparent",
    color: "var(--gray-700)",
    border: "1px solid transparent"
  },
  link: {
    background: "transparent",
    color: "var(--iuce-blue)",
    border: "1px solid transparent",
    textUnderlineOffset: "4px"
  },
  success: {
    background: "var(--success-500)",
    color: "var(--white)",
    border: "1px solid transparent",
    boxShadow: "var(--shadow-sm)"
  },
  danger: {
    background: "var(--danger-500)",
    color: "var(--white)",
    border: "1px solid transparent",
    boxShadow: "var(--shadow-sm)"
  },
  outline: {
    background: "transparent",
    color: "var(--iuce-blue)",
    border: "1px solid var(--iuce-blue)"
  }
};
const HOVER = {
  default: {
    background: "#22456b"
  },
  primary: {
    background: "var(--usal-red-dark)"
  },
  secondary: {
    background: "var(--gray-50)",
    borderColor: "var(--gray-300)"
  },
  ghost: {
    background: "var(--gray-100)"
  },
  link: {
    textDecoration: "underline"
  },
  success: {
    background: "var(--success-700)"
  },
  danger: {
    background: "var(--danger-700)"
  },
  outline: {
    background: "var(--iuce-blue-pale)"
  }
};
const SIZES = {
  default: {
    height: "40px",
    padding: "8px 16px",
    fontSize: "var(--text-sm)",
    borderRadius: "var(--radius-md)"
  },
  sm: {
    height: "32px",
    padding: "0 12px",
    fontSize: "var(--text-xs)",
    borderRadius: "var(--radius-sm)"
  },
  lg: {
    height: "48px",
    padding: "0 24px",
    fontSize: "var(--text-base)",
    borderRadius: "var(--radius-md)"
  },
  icon: {
    height: "40px",
    width: "40px",
    padding: 0,
    borderRadius: "var(--radius-md)"
  },
  "icon-sm": {
    height: "32px",
    width: "32px",
    padding: 0,
    borderRadius: "var(--radius-md)"
  }
};

/**
 * IUCE Button — CVA-style variants copied 1:1 from the reservations app.
 */
function Button({
  variant = "default",
  size = "default",
  disabled = false,
  type = "button",
  children,
  style,
  ...props
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    whiteSpace: "nowrap",
    fontFamily: "var(--font-sans)",
    fontWeight: "var(--weight-medium)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "all var(--transition-fast) var(--ease-default)",
    transform: active && !disabled ? "scale(0.98)" : "scale(1)",
    outline: "none",
    ...SIZES[size],
    ...VARIANTS[variant],
    ...(hover && !disabled ? HOVER[variant] : null),
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    style: base,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false)
  }, props), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Card — white surface, xl radius, subtle border + shadow. From card.tsx. */
function Card({
  children,
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      borderRadius: "var(--radius-lg)",
      border: "1px solid var(--border-default)",
      background: "var(--surface-card)",
      boxShadow: "var(--shadow-sm)",
      ...style
    }
  }, props), children);
}
function CardHeader({
  children,
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      padding: "var(--space-6)",
      ...style
    }
  }, props), children);
}
function CardTitle({
  children,
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("h3", _extends({
    style: {
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-lg)",
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-heading)",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      ...style
    }
  }, props), children);
}
function CardDescription({
  children,
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("p", _extends({
    style: {
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      color: "var(--text-muted)",
      ...style
    }
  }, props), children);
}
function CardContent({
  children,
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      padding: "var(--space-6)",
      paddingTop: 0,
      ...style
    }
  }, props), children);
}
function CardFooter({
  children,
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      padding: "var(--space-6)",
      paddingTop: 0,
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Icon — thin wrapper around the Lucide glyph set used across IUCE Reservas.
 * 24×24 viewBox, 2px stroke, round caps/joins. Sized via `size` (px), colored
 * via `color` (defaults to currentColor). This is an intentional addition so
 * design-system consumers get the app's exact iconography without a CDN.
 */
const PATHS = {
  "calendar-check": ['M8 2v4', 'M16 2v4', ['rect', {
    width: 18,
    height: 18,
    x: 3,
    y: 4,
    rx: 2
  }], 'M3 10h18', 'm9 16 2 2 4-4'],
  "calendar-days": ['M8 2v4', 'M16 2v4', ['rect', {
    width: 18,
    height: 18,
    x: 3,
    y: 4,
    rx: 2
  }], 'M3 10h18', 'M8 14h.01', 'M12 14h.01', 'M16 14h.01', 'M8 18h.01', 'M12 18h.01', 'M16 18h.01'],
  "calendar-off": ['M4.2 4.2A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18', 'M21 15.5V6a2 2 0 0 0-2-2H9.5', 'M16 2v4', 'M3 10h7', 'M21 10h-5.5', 'm2 2 20 20'],
  "calendar-search": ['M16 2v4', 'M21 11.75V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.25', 'm22 22-1.875-1.875', 'M3 10h18', 'M8 2v4', ['circle', {
    cx: 18,
    cy: 18,
    r: 3
  }]],
  "building-2": ['M10 12h4', 'M10 8h4', 'M14 21v-3a2 2 0 0 0-4 0v3', 'M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2', 'M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16'],
  "book-open": ['M12 7v14', 'M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z'],
  "shield-check": ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z', 'm9 12 2 2 4-4'],
  "bell": ['M10.268 21a2 2 0 0 0 3.464 0', 'M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326'],
  "log-out": ['m16 17 5-5-5-5', 'M21 12H9', 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'],
  "menu": ['M4 5h16', 'M4 12h16', 'M4 19h16'],
  "x": ['M18 6 6 18', 'm6 6 12 12'],
  "phone": ['M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384'],
  "mail": ['m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7', ['rect', {
    x: 2,
    y: 4,
    width: 20,
    height: 16,
    rx: 2
  }]],
  "globe": [['circle', {
    cx: 12,
    cy: 12,
    r: 10
  }], 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20', 'M2 12h20'],
  "users": ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M16 3.128a4 4 0 0 1 0 7.744', 'M22 21v-2a4 4 0 0 0-3-3.87', ['circle', {
    cx: 9,
    cy: 7,
    r: 4
  }]],
  "user": ['M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2', ['circle', {
    cx: 12,
    cy: 7,
    r: 4
  }]],
  "clock": [['circle', {
    cx: 12,
    cy: 12,
    r: 10
  }], 'M12 6v6l4 2'],
  "arrow-right": ['M5 12h14', 'm12 5 7 7-7 7'],
  "map-pin": ['M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0', ['circle', {
    cx: 12,
    cy: 10,
    r: 3
  }]],
  "filter": ['M22 3H2l8 9.46V19l4 2v-8.54z'],
  "sparkles": ['M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z', 'M20 2v4', 'M22 4h-4', ['circle', {
    cx: 4,
    cy: 20,
    r: 2
  }]],
  "accessibility": [['circle', {
    cx: 16,
    cy: 4,
    r: 1
  }], 'm18 19 1-7-6 1', 'm5 8 3-3 5.5 3-2.36 3.5', 'M4.24 14.5a5 5 0 0 0 6.88 6', 'M13.76 17.5a5 5 0 0 0-6.88-6'],
  "send": ['M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z', 'm21.854 2.147-10.94 10.939'],
  "download": ['M12 15V3', 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'm7 10 5 5 5-5'],
  "circle-check-big": ['M21.801 10A10 10 0 1 1 17 3.335', 'm9 11 3 3L22 4'],
  "circle-x": [['circle', {
    cx: 12,
    cy: 12,
    r: 10
  }], 'm15 9-6 6', 'm9 9 6 6'],
  "circle-alert": [['circle', {
    cx: 12,
    cy: 12,
    r: 10
  }], 'M12 8v4', 'M12 16h.01'],
  "check": ['M20 6 9 17l-5-5'],
  "plus": ['M5 12h14', 'M12 5v14'],
  "chevron-down": ['m6 9 6 6 6-6']
};
function Icon({
  name,
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  style,
  ...props
}) {
  const parts = PATHS[name] || [];
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flexShrink: 0,
      display: "inline-block",
      verticalAlign: "middle",
      ...style
    },
    "aria-hidden": "true"
  }, props), parts.map((p, i) => Array.isArray(p) ? React.createElement(p[0], {
    key: i,
    ...p[1]
  }) : /*#__PURE__*/React.createElement("path", {
    key: i,
    d: p
  })));
}
Icon.names = Object.keys(PATHS);
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Input — text field. h-10, rounded-md, gray-300 border, blue focus ring. */
function Input({
  type = "text",
  style,
  disabled,
  ...props
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    disabled: disabled,
    onFocus: e => {
      setFocus(true);
      props.onFocus?.(e);
    },
    onBlur: e => {
      setFocus(false);
      props.onBlur?.(e);
    },
    style: {
      display: "flex",
      height: "40px",
      width: "100%",
      boxSizing: "border-box",
      borderRadius: "var(--radius-sm)",
      border: `1px solid ${focus ? "var(--iuce-blue)" : "var(--border-input)"}`,
      background: "var(--white)",
      padding: "8px 12px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      color: "var(--text-heading)",
      outline: "none",
      boxShadow: focus ? "0 0 0 2px var(--focus-ring)" : "none",
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? "not-allowed" : "text",
      transition: "border-color var(--transition-fast), box-shadow var(--transition-fast)",
      ...style
    }
  }, props));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Textarea — multi-line field. min-h 80px, matches Input styling. */
function Textarea({
  style,
  disabled,
  ...props
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("textarea", _extends({
    disabled: disabled,
    onFocus: e => {
      setFocus(true);
      props.onFocus?.(e);
    },
    onBlur: e => {
      setFocus(false);
      props.onBlur?.(e);
    },
    style: {
      display: "flex",
      minHeight: "80px",
      width: "100%",
      boxSizing: "border-box",
      borderRadius: "var(--radius-sm)",
      border: `1px solid ${focus ? "var(--iuce-blue)" : "var(--border-input)"}`,
      background: "var(--white)",
      padding: "8px 12px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      color: "var(--text-heading)",
      lineHeight: "var(--leading-normal)",
      outline: "none",
      resize: "vertical",
      boxShadow: focus ? "0 0 0 2px var(--focus-ring)" : "none",
      opacity: disabled ? 0.5 : 1,
      transition: "border-color var(--transition-fast), box-shadow var(--transition-fast)",
      ...style
    }
  }, props));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/layout/InstitutionalFooter.jsx
try { (() => {
/**
 * InstitutionalFooter — dark footer with IUCE + USAL logos, contact links
 * and copyright. Copied from institutional-footer.tsx.
 */
function InstitutionalFooter({
  iuceLogoSrc = "assets/iuce-logo-white.webp",
  usalLogoSrc = "assets/usal-logo-white.webp",
  phone = "+34 923 294 634",
  email = "iuce@usal.es"
}) {
  const year = new Date().getFullYear();
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--surface-inverse)",
      color: "var(--white)",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "0 auto",
      display: "grid",
      maxWidth: "var(--container-max)",
      alignItems: "center",
      gap: "32px",
      gridTemplateColumns: "1fr 1fr 1fr",
      padding: "40px 24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: iuceLogoSrc,
    alt: "IUCE",
    style: {
      height: "48px",
      width: "auto"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px",
      fontSize: "var(--text-sm)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: `tel:${phone.replace(/\s/g, "")}`,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      color: "rgba(255,255,255,0.9)",
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--usal-red)",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "phone",
    size: 16
  })), phone), /*#__PURE__*/React.createElement("a", {
    href: `mailto:${email}`,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      color: "rgba(255,255,255,0.9)",
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--usal-red)",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "mail",
    size: 16
  })), email)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: usalLogoSrc,
    alt: "Universidad de Salamanca",
    style: {
      height: "48px",
      width: "auto"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid rgba(255,255,255,0.1)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "0 auto",
      display: "flex",
      maxWidth: "var(--container-max)",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "8px",
      padding: "12px 24px",
      fontSize: "11px",
      color: "rgba(255,255,255,0.55)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "\xA9 ", year, " IUCE \u2013 Universidad de Salamanca \u2013 Todos los derechos reservados"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://iuce.usal.es",
    "aria-label": "Web del IUCE",
    style: {
      color: "inherit",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "globe",
    size: 16
  }))))));
}
Object.assign(__ds_scope, { InstitutionalFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/InstitutionalFooter.jsx", error: String((e && e.message) || e) }); }

// components/layout/Navbar.jsx
try { (() => {
const NAV_ITEMS = [{
  label: "Panel",
  icon: "calendar-days"
}, {
  label: "Espacios",
  icon: "building-2"
}, {
  label: "Mis reservas",
  icon: "calendar-check"
}, {
  label: "Normas",
  icon: "book-open"
}];

/**
 * Navbar — sticky top app bar for IUCE Reservas. Logo, primary nav, admin
 * link (USAL red), notification bell, user identity and sign-out.
 */
function Navbar({
  logoSrc = "assets/iuce-logo.png",
  user = {
    name: "Ana Fernández Ruiz",
    email: "investigador1@usal.es",
    role: "USER"
  },
  active = "Panel",
  notificationCount = 0,
  onNavigate
}) {
  const isAdmin = user.role === "ADMIN" || user.role === "SUPER_ADMIN";
  const [hover, setHover] = React.useState(null);
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 30,
      borderBottom: "1px solid var(--border-default)",
      background: "rgba(255,255,255,0.95)",
      backdropFilter: "blur(8px)",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "0 auto",
      display: "flex",
      height: "var(--navbar-height)",
      maxWidth: "var(--container-max)",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "32px"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "IUCE Reservas",
    style: {
      height: "36px",
      width: "auto"
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "24px"
    }
  }, NAV_ITEMS.map(item => {
    const isActive = active === item.label;
    const isHover = hover === item.label;
    return /*#__PURE__*/React.createElement("button", {
      key: item.label,
      type: "button",
      onClick: () => onNavigate?.(item.label),
      onMouseEnter: () => setHover(item.label),
      onMouseLeave: () => setHover(null),
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        fontFamily: "inherit",
        fontSize: "var(--text-sm)",
        fontWeight: "var(--weight-medium)",
        color: isActive || isHover ? "var(--iuce-blue-dark)" : "var(--gray-600)",
        transition: "color var(--transition-fast)"
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: item.icon,
      size: 16
    }), item.label);
  }), isAdmin && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => onNavigate?.("Administración"),
    onMouseEnter: () => setHover("admin"),
    onMouseLeave: () => setHover(null),
    style: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0,
      fontFamily: "inherit",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-medium)",
      color: hover === "admin" ? "var(--usal-red-dark)" : "var(--usal-red)",
      transition: "color var(--transition-fast)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "shield-check",
    size: 16
  }), "Administraci\xF3n"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      color: "var(--gray-500)",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "bell",
    size: 20
  }), notificationCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "-6px",
      right: "-6px",
      minWidth: "16px",
      height: "16px",
      padding: "0 4px",
      borderRadius: "var(--radius-full)",
      background: "var(--usal-red)",
      color: "var(--white)",
      fontSize: "var(--text-2xs)",
      fontWeight: "var(--weight-bold)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, notificationCount)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right",
      lineHeight: 1.25
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-medium)",
      color: "var(--gray-900)"
    }
  }, user.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-xs)",
      color: "var(--gray-500)"
    }
  }, user.email)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      borderRadius: "var(--radius-sm)",
      border: "1px solid var(--border-default)",
      background: "var(--white)",
      padding: "6px 12px",
      fontSize: "var(--text-xs)",
      fontFamily: "inherit",
      fontWeight: "var(--weight-medium)",
      color: "var(--gray-600)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "log-out",
    size: 14
  }), "Cerrar sesi\xF3n"))));
}
Object.assign(__ds_scope, { Navbar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Navbar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/iuce-reservas/Admin.jsx
try { (() => {
// Admin panel — recreation of src/app/(admin)/admin/page.tsx
function Admin({
  onBack
}) {
  const {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    Badge,
    Button,
    Icon
  } = window.IUCEReservasDesignSystem_58b4a1;
  const {
    spaces
  } = window.IUCE_DATA;
  const counts = {
    PENDING: 6,
    APPROVED: 128,
    REJECTED: 11
  };
  const usage = [{
    space: spaces[0],
    count: 42
  }, {
    space: spaces[3],
    count: 31
  }, {
    space: spaces[1],
    count: 27
  }, {
    space: spaces[2],
    count: 18
  }];
  const audit = [{
    action: "Reserva aprobada",
    who: "María García López",
    when: "12 jun 2026, 10:12"
  }, {
    action: "Bloqueo creado",
    who: "IUCE — Soporte Técnico",
    when: "11 jun 2026, 17:40"
  }, {
    action: "Reserva rechazada (revisión)",
    who: "María García López",
    when: "11 jun 2026, 09:05"
  }, {
    action: "Espacio actualizado",
    who: "Carlos Rodríguez Martín",
    when: "10 jun 2026, 14:22"
  }, {
    action: "Cambio de rol",
    who: "IUCE — Soporte Técnico",
    when: "9 jun 2026, 11:00"
  }];
  const stat = (label, value, color, iconName, iconColor, sub) => /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    style: {
      paddingTop: "24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-xs)",
      fontWeight: 500,
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-wider)",
      color
    }
  }, label), /*#__PURE__*/React.createElement(Icon, {
    name: iconName,
    size: 16,
    color: iconColor
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 0",
      fontSize: "var(--text-3xl)",
      fontWeight: 700,
      color: "var(--gray-900)"
    }
  }, value), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 0",
      fontSize: "var(--text-xs)",
      color: "var(--gray-500)"
    }
  }, sub)));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "0 auto",
      maxWidth: "var(--container-max)",
      padding: "40px 24px",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "danger"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield-check",
    size: 12
  }), "Administraci\xF3n"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "12px 0 0",
      fontSize: "var(--text-3xl)",
      fontWeight: 700,
      color: "var(--gray-900)"
    }
  }, "Panel de administraci\xF3n"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 0",
      maxWidth: "672px",
      fontSize: "var(--text-sm)",
      color: "var(--gray-500)"
    }
  }, "Resumen del uso del sistema en los \xFAltimos 30 d\xEDas, cola de solicitudes pendientes y \xFAltimas acciones registradas en el audit log."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "32px",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "16px"
    }
  }, stat("Pendientes", counts.PENDING, "var(--warning-700)", "clock", "var(--warning-500)", "En cola de revisión"), stat("Aprobadas", counts.APPROVED, "var(--success-700)", "circle-check-big", "var(--success-500)", "Total histórico"), stat("Rechazadas", counts.REJECTED, "var(--danger-700)", "circle-x", "var(--danger-500)", "Total histórico"), stat("Total", counts.PENDING + counts.APPROVED + counts.REJECTED, "var(--iuce-blue-dark)", "calendar-check", "var(--iuce-blue)", "Solicitudes en la plataforma")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "32px",
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "24px",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, /*#__PURE__*/React.createElement(Icon, {
    name: "building-2",
    size: 20,
    color: "var(--iuce-blue)"
  }), "Espacios m\xE1s reservados (30 d\xEDas)")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    }
  }, usage.map(u => /*#__PURE__*/React.createElement("li", {
    key: u.space.id,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: "var(--radius-sm)",
      border: "1px solid var(--gray-100)",
      background: "rgba(249,250,251,0.6)",
      padding: "8px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      height: "10px",
      width: "10px",
      borderRadius: "var(--radius-full)",
      background: u.space.color
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-sm)",
      fontWeight: 500,
      color: "var(--gray-900)"
    }
  }, u.space.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "11px",
      color: "var(--gray-500)"
    }
  }, u.space.code))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-sm)",
      fontWeight: 600,
      color: "var(--gray-900)"
    }
  }, u.count)))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    style: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement(CardTitle, null, /*#__PURE__*/React.createElement(Icon, {
    name: "users",
    size: 20,
    color: "var(--iuce-blue)"
  }), "Audit log"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
      fontSize: "var(--text-xs)",
      color: "var(--gray-500)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 12
  }), "CSV")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }
  }, audit.map((a, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      borderLeft: "2px solid var(--iuce-blue)",
      paddingLeft: "12px"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-sm)",
      fontWeight: 500,
      color: "var(--gray-900)"
    }
  }, a.action), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-xs)",
      color: "var(--gray-500)"
    }
  }, a.who, " \xB7 ", a.when))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "32px",
      display: "flex",
      flexWrap: "wrap",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement(Button, null, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar-check",
    size: 16
  }), "Cola de reservas"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "building-2",
    size: 16
  }), "Gestionar espacios"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar-off",
    size: 16
  }), "Bloqueos de calendario"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users",
    size: 16
  }), "Gestionar usuarios"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: onBack
  }, "Volver al panel personal")));
}
window.Admin = Admin;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/iuce-reservas/Admin.jsx", error: String((e && e.message) || e) }); }

// ui_kits/iuce-reservas/Dashboard.jsx
try { (() => {
// Dashboard — recreation of src/app/(dashboard)/dashboard/page.tsx
function Dashboard({
  user,
  onSpaces,
  onAdmin
}) {
  const {
    Button,
    Badge,
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    Icon
  } = window.IUCEReservasDesignSystem_58b4a1;
  const {
    reservations,
    statusBadge
  } = window.IUCE_DATA;
  const isAdmin = user.role === "ADMIN" || user.role === "SUPER_ADMIN";
  const counts = {
    pending: reservations.filter(r => r.status === "PENDING").length,
    approved: reservations.filter(r => r.status === "APPROVED").length,
    rejected: reservations.filter(r => r.status === "REJECTED").length
  };
  const stat = (label, value, color, sub) => /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    style: {
      paddingTop: "24px"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-xs)",
      fontWeight: 500,
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-wider)",
      color
    }
  }, label), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 0",
      fontSize: "var(--text-3xl)",
      fontWeight: 700,
      color: "var(--gray-900)"
    }
  }, value), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0",
      fontSize: "var(--text-xs)",
      color: "var(--gray-500)"
    }
  }, sub)));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "0 auto",
      maxWidth: "var(--container-max)",
      padding: "40px 24px",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Badge, {
    variant: "info"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles",
    size: 12
  }), "Bienvenido de nuevo"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "12px 0 0",
      fontSize: "var(--text-3xl)",
      fontWeight: 700,
      color: "var(--gray-900)"
    }
  }, "Hola, ", user.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 0",
      fontSize: "var(--text-sm)",
      color: "var(--gray-500)"
    }
  }, "Sesi\xF3n iniciada como ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500
    }
  }, user.email))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: onSpaces
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "building-2",
    size: 16
  }), "Ver espacios"), isAdmin && /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onAdmin
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield-check",
    size: 16
  }), "Panel administrativo"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "32px",
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "16px"
    }
  }, stat("Pendientes", counts.pending, "var(--warning-700)", "Solicitudes esperando revisión"), stat("Aprobadas", counts.approved, "var(--success-700)", "Tus reservas confirmadas"), stat("Rechazadas", counts.rejected, "var(--danger-700)", "Solicitudes no aprobadas")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "32px",
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "24px",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar-check",
    size: 20,
    color: "var(--iuce-blue)"
  }), "Mis reservas recientes")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    }
  }, reservations.map(r => {
    const s = statusBadge[r.status];
    return /*#__PURE__*/React.createElement("li", {
      key: r.id,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--gray-100)",
        background: "rgba(249,250,251,0.6)",
        padding: "12px 16px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontWeight: 500,
        color: "var(--gray-900)",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, r.title), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "2px 0 0",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        fontSize: "var(--text-xs)",
        color: "var(--gray-500)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "building-2",
      size: 12
    }), r.space, /*#__PURE__*/React.createElement(Icon, {
      name: "clock",
      size: 12,
      style: {
        marginLeft: "8px"
      }
    }), r.start)), /*#__PURE__*/React.createElement(Badge, {
      variant: s.variant
    }, s.label));
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "24px"
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Atajos")), /*#__PURE__*/React.createElement(CardContent, {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onSpaces,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: "var(--radius-md)",
      border: "1px solid var(--border-default)",
      padding: "12px 16px",
      background: "var(--white)",
      cursor: "pointer",
      fontFamily: "inherit",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-sm)",
      fontWeight: 500,
      color: "var(--gray-900)"
    }
  }, "Cat\xE1logo"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-xs)",
      color: "var(--gray-500)"
    }
  }, "Buscar un espacio")), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 16,
    color: "var(--gray-400)"
  })), isAdmin && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onAdmin,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: "var(--radius-md)",
      border: "1px solid rgba(200,16,46,0.2)",
      background: "rgba(254,243,242,0.4)",
      padding: "12px 16px",
      cursor: "pointer",
      fontFamily: "inherit",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-sm)",
      fontWeight: 500,
      color: "var(--usal-red)"
    }
  }, "Administraci\xF3n"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-xs)",
      color: "rgba(200,16,46,0.7)"
    }
  }, "M\xE9tricas y cola de solicitudes")), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 16,
    color: "var(--usal-red)"
  })))))));
}
window.Dashboard = Dashboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/iuce-reservas/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/iuce-reservas/Landing.jsx
try { (() => {
// Landing / public homepage — recreation of src/app/page.tsx
function Landing({
  onSignIn,
  onSpaces
}) {
  const {
    Button,
    Badge,
    Card,
    CardContent,
    Icon,
    InstitutionalFooter
  } = window.IUCEReservasDesignSystem_58b4a1;
  const {
    spaces
  } = window.IUCE_DATA;
  const features = [{
    icon: "calendar-check",
    title: "Reservas en un clic",
    text: "Solicita la franja horaria que necesites y recibe la confirmación en tu correo institucional."
  }, {
    icon: "building-2",
    title: "Catálogo completo",
    text: "Consulta todos los espacios del IUCE con sus características, capacidad y equipamiento."
  }, {
    icon: "users",
    title: "Aprobación administrativa",
    text: "El equipo del IUCE revisa cada solicitud para garantizar una asignación coherente."
  }, {
    icon: "shield-check",
    title: "Acceso institucional",
    text: "Usa tu cuenta @usal.es. Sin registros adicionales, sin contraseñas que recordar."
  }];
  return /*#__PURE__*/React.createElement("main", {
    style: {
      minHeight: "100%",
      display: "flex",
      flexDirection: "column",
      background: "linear-gradient(to bottom, rgba(242,247,254,0.5), var(--white))",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      borderBottom: "1px solid var(--border-default)",
      background: "rgba(255,255,255,0.9)",
      backdropFilter: "blur(8px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "0 auto",
      display: "flex",
      height: "80px",
      maxWidth: "var(--container-max)",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/iuce-logo.png",
    alt: "IUCE",
    style: {
      height: "48px",
      width: "auto"
    }
  }), /*#__PURE__*/React.createElement(Button, {
    onClick: onSignIn
  }, "Iniciar sesi\xF3n", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 16
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "0 auto",
      maxWidth: "var(--container-max)",
      padding: "80px 24px 48px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "768px"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "info"
  }, "IUCE \xB7 Universidad de Salamanca"), /*#__PURE__*/React.createElement("h1", {
    style: {
      marginTop: "16px",
      fontSize: "var(--text-5xl)",
      fontWeight: 700,
      letterSpacing: "var(--tracking-tight)",
      color: "var(--gray-900)",
      lineHeight: 1.1
    }
  }, "Gesti\xF3n de espacios ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--iuce-blue-dark)"
    }
  }, "del IUCE")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "24px",
      fontSize: "var(--text-lg)",
      color: "var(--gray-600)",
      maxWidth: "620px",
      lineHeight: "var(--leading-relaxed)"
    }
  }, "Reserva aulas, salas de reuniones y laboratorios del Instituto Universitario de Ciencias de la Educaci\xF3n de la Universidad de Salamanca. Solicita en segundos, recibe la confirmaci\xF3n por correo y consulta tus reservas desde un \xFAnico panel."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "40px",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: onSignIn
  }, "Acceder con cuenta USAL", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 16
  })), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "secondary",
    onClick: onSpaces
  }, "Ver cat\xE1logo completo"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "80px",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "16px"
    }
  }, spaces.map(s => /*#__PURE__*/React.createElement(Card, {
    key: s.code,
    style: {
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: "4/3",
      background: "var(--gray-100)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: s.img,
    alt: s.name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block"
    }
  })), /*#__PURE__*/React.createElement(CardContent, {
    style: {
      padding: "16px"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontWeight: 600,
      color: "var(--gray-900)",
      fontSize: "var(--text-base)"
    }
  }, s.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0",
      fontSize: "var(--text-xs)",
      color: "var(--gray-500)"
    }
  }, s.code, " \xB7 ", s.capacity, " personas"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "80px",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "24px"
    }
  }, features.map(f => /*#__PURE__*/React.createElement("div", {
    key: f.title
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      height: "40px",
      width: "40px",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-md)",
      background: "var(--iuce-blue-pale)",
      color: "var(--iuce-blue-dark)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: f.icon,
    size: 20
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      marginTop: "16px",
      marginBottom: 0,
      fontSize: "var(--text-base)",
      fontWeight: 600,
      color: "var(--gray-900)"
    }
  }, f.title), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "6px",
      marginBottom: 0,
      fontSize: "var(--text-sm)",
      color: "var(--gray-600)",
      lineHeight: "var(--leading-relaxed)"
    }
  }, f.text)))))), /*#__PURE__*/React.createElement(InstitutionalFooter, {
    iuceLogoSrc: "../../assets/iuce-logo-white.webp",
    usalLogoSrc: "../../assets/usal-logo-white.webp"
  }));
}
window.Landing = Landing;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/iuce-reservas/Landing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/iuce-reservas/SignIn.jsx
try { (() => {
// Sign-in — recreation of src/app/auth/signin/page.tsx (mock/dev variant)
function SignIn({
  onLogin,
  onBack
}) {
  const {
    Button,
    Badge,
    Input,
    Icon
  } = window.IUCEReservasDesignSystem_58b4a1;
  const [email, setEmail] = React.useState("");
  const mockUsers = [{
    email: "admin@usal.es",
    name: "María García López",
    role: "Admin",
    color: "var(--usal-red)"
  }, {
    email: "investigador1@usal.es",
    name: "Ana Fernández Ruiz",
    role: "Usuario",
    color: "var(--iuce-blue)"
  }, {
    email: "superadmin@usal.es",
    name: "Carlos Rodríguez Martín",
    role: "Super Admin",
    color: "var(--iuce-blue-dark)"
  }];
  return /*#__PURE__*/React.createElement("main", {
    style: {
      minHeight: "100%",
      display: "flex",
      background: "linear-gradient(to bottom, rgba(242,247,254,0.4), var(--white))",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "50%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "48px",
      background: "var(--iuce-blue-dark)",
      color: "var(--white)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--radius-lg)",
      background: "var(--white)",
      padding: "20px 32px",
      boxShadow: "var(--shadow-md)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/iuce-logo.png",
    alt: "IUCE",
    style: {
      height: "96px",
      width: "auto",
      display: "block"
    }
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Badge, {
    variant: "info",
    style: {
      background: "rgba(255,255,255,0.1)",
      color: "var(--white)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles",
    size: 12
  }), "Acceso passwordless"), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: "16px",
      fontSize: "var(--text-3xl)",
      fontWeight: 700,
      lineHeight: 1.2
    }
  }, "Reserva los espacios del IUCE con tu cuenta institucional"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "16px",
      fontSize: "var(--text-base)",
      color: "rgba(255,255,255,0.8)",
      lineHeight: "var(--leading-relaxed)"
    }
  }, "Sin contrase\xF1as que recordar. Solo introduce tu correo @usal.es y recibir\xE1s un enlace de acceso seguro.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-xs)",
      color: "rgba(255,255,255,0.5)"
    }
  }, "\xA9 2026 IUCE \u2014 Universidad de Salamanca")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "48px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: "384px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "4px",
      width: "48px",
      background: "var(--usal-red)",
      borderRadius: "var(--radius-full)",
      marginBottom: "20px"
    }
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: "var(--text-2xl)",
      fontWeight: 700,
      color: "var(--gray-900)"
    }
  }, "Iniciar sesi\xF3n"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "8px",
      fontSize: "var(--text-sm)",
      color: "var(--gray-500)"
    }
  }, "Introduce tu correo institucional y te enviaremos un enlace de acceso."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--radius-md)",
      background: "var(--warning-50)",
      border: "1px solid rgba(247,144,9,0.2)",
      padding: "12px",
      fontSize: "var(--text-xs)",
      color: "var(--warning-700)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontWeight: 500
    }
  }, "Modo desarrollo activo"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "2px 0 0",
      color: "rgba(181,71,8,0.8)"
    }
  }, "Acceso r\xE1pido sin enviar emails reales.")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "16px",
      fontSize: "var(--text-xs)",
      fontWeight: 500,
      color: "var(--gray-400)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-wider)"
    }
  }, "Acceso r\xE1pido (dev)"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "8px",
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    }
  }, mockUsers.map(u => /*#__PURE__*/React.createElement("button", {
    key: u.email,
    type: "button",
    onClick: () => onLogin(u),
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      borderRadius: "var(--radius-md)",
      border: "1px solid var(--border-default)",
      background: "var(--white)",
      padding: "12px 16px",
      textAlign: "left",
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: "32px",
      width: "32px",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-full)",
      background: u.color,
      color: "var(--white)",
      fontSize: "var(--text-xs)",
      fontWeight: 700
    }
  }, u.name.charAt(0)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-sm)",
      fontWeight: 500,
      color: "var(--gray-900)"
    }
  }, u.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-xs)",
      color: "var(--gray-400)"
    }
  }, u.email)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "10px",
      fontWeight: 500,
      color: "var(--gray-500)",
      background: "var(--gray-100)",
      padding: "2px 8px",
      borderRadius: "var(--radius-full)"
    }
  }, u.role)))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      margin: "24px 0",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "50%",
      left: 0,
      right: 0,
      borderTop: "1px solid var(--border-default)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      background: "var(--white)",
      padding: "0 12px",
      fontSize: "var(--text-xs)",
      color: "var(--gray-400)"
    }
  }, "o env\xEDa un magic link"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "signin-email",
    style: {
      display: "block",
      fontSize: "var(--text-sm)",
      fontWeight: 500,
      color: "var(--gray-700)",
      marginBottom: "6px"
    }
  }, "Correo institucional"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "var(--gray-400)",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail",
    size: 16
  })), /*#__PURE__*/React.createElement(Input, {
    id: "signin-email",
    type: "email",
    placeholder: "nombre@usal.es",
    value: email,
    onChange: e => setEmail(e.target.value),
    style: {
      paddingLeft: "36px"
    }
  })), /*#__PURE__*/React.createElement(Button, {
    type: "button",
    style: {
      width: "100%",
      marginTop: "16px"
    },
    onClick: () => onLogin(mockUsers[1])
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "send",
    size: 16
  }), "Enviar enlace de acceso")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "32px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onBack,
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: "var(--text-sm)",
      color: "var(--gray-500)",
      fontFamily: "inherit"
    }
  }, "\u2190 Volver al inicio")))));
}
window.SignIn = SignIn;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/iuce-reservas/SignIn.jsx", error: String((e && e.message) || e) }); }

// ui_kits/iuce-reservas/SpacesCatalog.jsx
try { (() => {
// Spaces catalog — recreation of src/app/(dashboard)/spaces/spaces-catalog.tsx
function SpacesCatalog() {
  const {
    Card,
    CardContent,
    Badge,
    Button,
    Input,
    Icon
  } = window.IUCEReservasDesignSystem_58b4a1;
  const {
    spaces
  } = window.IUCE_DATA;
  const [minCap, setMinCap] = React.useState(0);
  const [accessOnly, setAccessOnly] = React.useState(false);
  const [equip, setEquip] = React.useState([]);
  const allEquip = ["Proyector HD", "Wi-Fi", "Pizarra blanca", "Sistema de sonido"];
  const filtered = spaces.filter(s => {
    if (minCap > 0 && s.capacity < minCap) return false;
    if (accessOnly && !s.accessibility) return false;
    if (equip.length && !equip.every(e => s.equipment.includes(e))) return false;
    return true;
  });
  const toggle = e => setEquip(p => p.includes(e) ? p.filter(x => x !== e) : [...p, e]);
  const hasFilters = minCap > 0 || accessOnly || equip.length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "0 auto",
      maxWidth: "var(--container-max)",
      padding: "40px 24px",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "info"
  }, "Cat\xE1logo"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "12px 0 0",
      fontSize: "var(--text-3xl)",
      fontWeight: 700,
      color: "var(--gray-900)"
    }
  }, "Espacios del IUCE"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 0",
      fontSize: "var(--text-sm)",
      color: "var(--gray-500)"
    }
  }, "Consulta y reserva aulas, laboratorios y salas del instituto."), /*#__PURE__*/React.createElement(Card, {
    style: {
      marginTop: "32px"
    }
  }, /*#__PURE__*/React.createElement(CardContent, {
    style: {
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "var(--text-sm)",
      fontWeight: 600,
      color: "var(--gray-700)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "filter",
    size: 16,
    color: "var(--iuce-blue)"
  }), "Filtros", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--gray-500)",
      fontWeight: 400
    }
  }, "(", filtered.length, " de ", spaces.length, " espacios)")), hasFilters ? /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => {
      setMinCap(0);
      setAccessOnly(false);
      setEquip([]);
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 14
  }), "Limpiar filtros") : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "cap",
    style: {
      fontSize: "var(--text-xs)",
      fontWeight: 500,
      color: "var(--gray-500)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-wider)"
    }
  }, "Capacidad m\xEDnima"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "8px",
      display: "flex",
      alignItems: "center",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement("input", {
    id: "cap",
    type: "range",
    min: 0,
    max: 100,
    step: 5,
    value: minCap,
    onChange: e => setMinCap(+e.target.value),
    style: {
      flex: 1,
      accentColor: "var(--iuce-blue)"
    }
  }), /*#__PURE__*/React.createElement(Input, {
    type: "number",
    value: minCap,
    onChange: e => setMinCap(+e.target.value || 0),
    style: {
      height: "36px",
      width: "72px",
      fontSize: "var(--text-xs)"
    }
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0",
      fontSize: "11px",
      color: "var(--gray-400)"
    }
  }, minCap > 0 ? `Al menos ${minCap} personas` : "Sin mínimo")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-xs)",
      fontWeight: 500,
      color: "var(--gray-500)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-wider)"
    }
  }, "Equipamiento"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "8px",
      display: "flex",
      flexWrap: "wrap",
      gap: "8px"
    }
  }, allEquip.map(opt => {
    const on = equip.includes(opt);
    return /*#__PURE__*/React.createElement("button", {
      key: opt,
      type: "button",
      onClick: () => toggle(opt),
      style: {
        display: "inline-flex",
        alignItems: "center",
        borderRadius: "var(--radius-full)",
        border: `1px solid ${on ? "var(--iuce-blue)" : "var(--border-default)"}`,
        background: on ? "var(--iuce-blue-pale)" : "var(--white)",
        color: on ? "var(--iuce-blue-dark)" : "var(--gray-600)",
        padding: "4px 12px",
        fontSize: "var(--text-xs)",
        cursor: "pointer",
        fontFamily: "inherit"
      }
    }, opt);
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-xs)",
      fontWeight: 500,
      color: "var(--gray-500)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-wider)"
    }
  }, "Accesibilidad"), /*#__PURE__*/React.createElement("label", {
    style: {
      marginTop: "8px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "var(--text-sm)",
      color: "var(--gray-700)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: accessOnly,
    onChange: e => setAccessOnly(e.target.checked),
    style: {
      width: "16px",
      height: "16px",
      accentColor: "var(--iuce-blue)"
    }
  }), /*#__PURE__*/React.createElement("span", null, "Solo espacios accesibles")))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "32px",
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "24px"
    }
  }, filtered.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.id,
    style: {
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      overflow: "hidden",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "4/3",
      background: "var(--gray-100)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: s.img,
    alt: s.name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "12px",
      left: "12px",
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      borderRadius: "var(--radius-full)",
      background: "rgba(255,255,255,0.95)",
      padding: "4px 10px",
      fontSize: "11px",
      fontWeight: 500,
      color: s.color,
      boxShadow: "var(--shadow-sm)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      height: "6px",
      width: "6px",
      borderRadius: "var(--radius-full)",
      background: s.color
    }
  }), s.code)), /*#__PURE__*/React.createElement(CardContent, {
    style: {
      paddingTop: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontWeight: 600,
      color: "var(--gray-900)",
      lineHeight: 1.15
    }
  }, s.name), s.accessibility && /*#__PURE__*/React.createElement(Badge, {
    variant: "success"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "accessibility",
    size: 12
  }), "Accesible")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "12px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
      fontSize: "var(--text-xs)",
      color: "var(--gray-500)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "6px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users",
    size: 14
  }), s.capacity, " personas"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "6px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 14
  }), "Planta ", s.floor)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "12px",
      display: "flex",
      flexWrap: "wrap",
      gap: "6px"
    }
  }, s.equipment.slice(0, 3).map(e => /*#__PURE__*/React.createElement("span", {
    key: e,
    style: {
      borderRadius: "var(--radius-full)",
      background: "var(--gray-100)",
      padding: "2px 8px",
      fontSize: "10px",
      color: "var(--gray-600)"
    }
  }, e)), s.equipment.length > 3 && /*#__PURE__*/React.createElement("span", {
    style: {
      borderRadius: "var(--radius-full)",
      background: "var(--gray-100)",
      padding: "2px 8px",
      fontSize: "10px",
      color: "var(--gray-500)"
    }
  }, "+", s.equipment.length - 3))))))));
}
window.SpacesCatalog = SpacesCatalog;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/iuce-reservas/SpacesCatalog.jsx", error: String((e && e.message) || e) }); }

// ui_kits/iuce-reservas/data.js
try { (() => {
// Shared mock data for the IUCE Reservas UI kit — mirrors prisma/seed.ts.
window.IUCE_DATA = {
  spaces: [{
    id: "1",
    name: "Aula 17A",
    code: "IUCE-17A",
    capacity: 40,
    floor: 1,
    building: "IUCE - Paseo de Canalejas 169",
    accessibility: true,
    color: "#C8102E",
    img: "../../assets/spaces/aula-17a.jpg",
    description: "Aula principal de docencia del IUCE. Espacio amplio con disposición flexible para clases, seminarios y conferencias.",
    equipment: ["Proyector HD", "Pantalla motorizada", "Pizarra blanca", "Sistema de sonido", "Wi-Fi", "Enchufes en mesas"]
  }, {
    id: "2",
    name: "Aula 12A",
    code: "IUCE-12A",
    capacity: 25,
    floor: 1,
    building: "IUCE - Paseo de Canalejas 169",
    accessibility: true,
    color: "#3B7DD8",
    img: "../../assets/spaces/aula-12a.jpg",
    description: "Aula de tamaño mediano para seminarios, grupos de trabajo y reuniones académicas. Disposición flexible.",
    equipment: ["Proyector HD", "Pizarra blanca", "Wi-Fi", "Mesas movibles"]
  }, {
    id: "3",
    name: "Laboratorio",
    code: "IUCE-LAB",
    capacity: 20,
    floor: 0,
    building: "IUCE - Paseo de Canalejas 169",
    accessibility: true,
    color: "#1B3A5C",
    img: "../../assets/spaces/laboratorio.jpg",
    description: "Laboratorio equipado para prácticas con equipamiento informático específico y software educativo.",
    equipment: ["20 puestos informáticos", "Proyector", "Pizarra digital", "Software educativo", "Wi-Fi"]
  }, {
    id: "4",
    name: "Sala de Usos Múltiples",
    code: "IUCE-SUM",
    capacity: 60,
    floor: 0,
    building: "IUCE - Paseo de Canalejas 169",
    accessibility: true,
    color: "#333333",
    img: "../../assets/spaces/sala-usos-multiples.jpg",
    description: "Sala polivalente para eventos, defensas, reuniones y actos académicos. Configurable según necesidad.",
    equipment: ["Proyector HD", "Sistema de sonido", "Micrófonos", "Pantalla grande", "Mesas y sillas configurables"]
  }],
  reservations: [{
    id: "r1",
    title: "Seminario de investigación",
    space: "Aula 17A",
    spaceColor: "#C8102E",
    start: "12 jun 2026, 10:00",
    status: "APPROVED"
  }, {
    id: "r2",
    title: "Defensa de TFM",
    space: "Sala de Usos Múltiples",
    spaceColor: "#333333",
    start: "14 jun 2026, 12:30",
    status: "PENDING"
  }, {
    id: "r3",
    title: "Grupo de trabajo doctorado",
    space: "Aula 12A",
    spaceColor: "#3B7DD8",
    start: "9 jun 2026, 16:00",
    status: "APPROVED"
  }, {
    id: "r4",
    title: "Prácticas de software educativo",
    space: "Laboratorio",
    spaceColor: "#1B3A5C",
    start: "5 jun 2026, 09:00",
    status: "REJECTED"
  }],
  statusBadge: {
    PENDING: {
      label: "Pendiente",
      variant: "warning"
    },
    APPROVED: {
      label: "Aprobada",
      variant: "success"
    },
    REJECTED: {
      label: "Rechazada",
      variant: "danger"
    },
    CANCELLED: {
      label: "Cancelada",
      variant: "secondary"
    }
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/iuce-reservas/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CardHeader = __ds_scope.CardHeader;

__ds_ns.CardTitle = __ds_scope.CardTitle;

__ds_ns.CardDescription = __ds_scope.CardDescription;

__ds_ns.CardContent = __ds_scope.CardContent;

__ds_ns.CardFooter = __ds_scope.CardFooter;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.InstitutionalFooter = __ds_scope.InstitutionalFooter;

__ds_ns.Navbar = __ds_scope.Navbar;

})();
