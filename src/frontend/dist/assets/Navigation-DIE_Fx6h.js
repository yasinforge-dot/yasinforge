import { R as React2, r as reactExports, j as jsxRuntimeExports, e as useInternetIdentity, f as useRouterState, L as Link } from "./index-D0yZ9B68.js";
import { c as createLucideIcon } from "./useBackend-CzoG8yy-.js";
import { c as createStore } from "./vanilla-wjP-HMWV.js";
import { c as cn } from "./proxy-BcgAcmJN.js";
const identity = (arg) => arg;
function useStore(api, selector = identity) {
  const slice = React2.useSyncExternalStore(
    api.subscribe,
    React2.useCallback(() => selector(api.getState()), [api, selector]),
    React2.useCallback(() => selector(api.getInitialState()), [api, selector])
  );
  React2.useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  const api = createStore(createState);
  const useBoundStore = (selector) => useStore(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = (createState) => createState ? createImpl(createState) : createImpl;
const useScrollStore = create((set) => ({
  progress: 0,
  scrollY: 0,
  setProgress: (progress) => set({ progress }),
  setScrollY: (scrollY) => set({ scrollY })
}));
function useScrollProgress() {
  const { progress, scrollY, setProgress, setScrollY } = useScrollStore();
  reactExports.useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const rawScrollY = window.scrollY;
      const total = el.scrollHeight - el.clientHeight;
      const p = total > 0 ? Math.min(rawScrollY / total, 1) : 0;
      setProgress(p);
      setScrollY(rawScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setProgress, setScrollY]);
  return { progress, scrollY };
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
];
const ArrowUpRight = createLucideIcon("arrow-up-right", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 18h16", key: "19g7jn" }],
  ["path", { d: "M4 6h16", key: "1o0s65" }]
];
const Menu = createLucideIcon("menu", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
var DefaultContext = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
};
var IconContext = React2.createContext && /* @__PURE__ */ React2.createContext(DefaultContext);
var _excluded = ["attr", "size", "title"];
function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function Tree2Element(tree) {
  return tree && tree.map((node, i) => /* @__PURE__ */ React2.createElement(node.tag, _objectSpread({
    key: i
  }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
  return (props) => /* @__PURE__ */ React2.createElement(IconBase, _extends({
    attr: _objectSpread({}, data.attr)
  }, props), Tree2Element(data.child));
}
function IconBase(props) {
  var elem = (conf) => {
    var {
      attr,
      size,
      title
    } = props, svgProps = _objectWithoutProperties(props, _excluded);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return /* @__PURE__ */ React2.createElement("svg", _extends({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className,
      style: _objectSpread(_objectSpread({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && /* @__PURE__ */ React2.createElement("title", null, title), props.children);
  };
  return IconContext !== void 0 ? /* @__PURE__ */ React2.createElement(IconContext.Consumer, null, (conf) => elem(conf)) : elem(DefaultContext);
}
function SiWhatsapp(props) {
  return GenIcon({ "attr": { "role": "img", "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "d": "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" }, "child": [] }] })(props);
}
const SERVICES = [
  "Laravel Development",
  "API Integration",
  "Security Hardening",
  "3D Web Experiences",
  "E-commerce Solutions"
];
const COMPANY = [
  { label: "About", href: "/#about" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Services", href: "/#services" },
  { label: "Blog", href: "/blog" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/#contact" }
];
function Footer() {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : ""
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "footer",
    {
      className: "bg-card border-t border-border/50",
      "data-ocid": "footer.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 py-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: "/assets/generated/yasinforge-logo.dim_200x200.png",
                    alt: "YasinForge",
                    className: "w-8 h-8 object-contain"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-lg tracking-tight", children: [
                  "Yasin",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Forge" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-6", children: "Forging digital excellence — where code meets craft, performance meets artistry." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: "https://wa.me/923247019637",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group",
                    "data-ocid": "footer.whatsapp_link",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SiWhatsapp, { className: "w-4 h-4 text-green-500" }),
                      "+92 324 7019637",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: "mailto:yasinforge@gmail.com",
                    className: "flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group",
                    "data-ocid": "footer.email_link",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }),
                      "yasinforge@gmail.com",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm tracking-wider uppercase text-foreground mb-5", children: "Services" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-2.5", children: SERVICES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "/#services",
                  className: "text-sm text-muted-foreground hover:text-foreground transition-colors duration-200",
                  children: s
                }
              ) }, s)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm tracking-wider uppercase text-foreground mb-5", children: "Company" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-2.5", children: COMPANY.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: c.href,
                  className: "text-sm text-muted-foreground hover:text-foreground transition-colors duration-200",
                  children: c.label
                }
              ) }, c.label)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm tracking-wider uppercase text-foreground mb-5", children: "Start a Project" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4 leading-relaxed", children: "Have an idea? Let's forge it into reality together." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: "/#contact",
                  className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all duration-200 glow-neon",
                  "data-ocid": "footer.cta_button",
                  children: [
                    "Get In Touch",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-3.5 h-3.5" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "© ",
              year,
              " YasinForge. All rights reserved."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Built with love using",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-primary hover:underline",
                  children: "caffeine.ai"
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}
const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/#contact" }
];
function Navigation() {
  const [open, setOpen] = reactExports.useState(false);
  const scrollY = useScrollStore((s) => s.scrollY);
  const scrolled = scrollY > 40;
  const { loginStatus: _loginStatus } = useInternetIdentity();
  const routerState = useRouterState();
  const isAdminPage = routerState.location.pathname.startsWith("/admin");
  reactExports.useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);
  const handleSectionLink = (href) => {
    setOpen(false);
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "bg-card/90 backdrop-blur-xl border-b border-border shadow-[0_4px_24px_oklch(0_0_0/0.4)]" : "bg-transparent"
      ),
      "data-ocid": "nav.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 h-16 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/",
              className: "flex items-center gap-2.5 group",
              "data-ocid": "nav.logo_link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: "/assets/generated/yasinforge-logo.dim_200x200.png",
                    alt: "YasinForge",
                    className: "w-8 h-8 object-contain"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-lg tracking-tight text-foreground group-hover:text-primary transition-colors duration-200", children: [
                  "Yasin",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Forge" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "nav",
            {
              className: "hidden md:flex items-center gap-1",
              "aria-label": "Main navigation",
              children: [
                NAV_LINKS.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: link.href,
                    onClick: (e) => {
                      if (link.href.startsWith("/#")) {
                        e.preventDefault();
                        handleSectionLink(link.href);
                        if (window.location.pathname !== "/") {
                          window.location.href = link.href;
                        }
                      }
                    },
                    className: "px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative group",
                    "data-ocid": `nav.${link.label.toLowerCase()}_link`,
                    children: [
                      link.label,
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-0 left-4 right-4 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" })
                    ]
                  },
                  link.label
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/admin",
                    className: cn(
                      "ml-2 p-2 rounded-md transition-all duration-200",
                      isAdminPage ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                    ),
                    title: "Admin Dashboard",
                    "data-ocid": "nav.admin_link",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5" })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setOpen((v) => !v),
              className: "md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors",
              "aria-label": "Toggle menu",
              "data-ocid": "nav.mobile_menu_toggle",
              children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5" })
            }
          )
        ] }),
        open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden bg-card/95 backdrop-blur-xl border-b border-border px-6 py-4 flex flex-col gap-2", children: [
          NAV_LINKS.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: link.href,
              onClick: (e) => {
                if (link.href.startsWith("/#")) {
                  e.preventDefault();
                  handleSectionLink(link.href);
                  if (window.location.pathname !== "/") {
                    window.location.href = link.href;
                  }
                } else {
                  setOpen(false);
                }
              },
              className: "text-sm font-medium text-muted-foreground hover:text-foreground py-2 border-b border-border/30 last:border-0",
              "data-ocid": `nav.mobile_${link.label.toLowerCase()}_link`,
              children: link.label
            },
            link.label
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/admin",
              onClick: () => setOpen(false),
              className: "flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary py-2",
              "data-ocid": "nav.mobile_admin_link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4" }),
                "Admin"
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  Footer as F,
  Navigation as N,
  ShieldCheck as S,
  useScrollStore as a,
  useScrollProgress as u
};
