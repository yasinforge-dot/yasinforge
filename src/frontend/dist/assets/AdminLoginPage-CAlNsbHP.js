import { e as useInternetIdentity, b as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-Cdk8ITCB.js";
import { m as motion, B as Button } from "./proxy-DTk2W0P-.js";
function AdminLoginPage() {
  const { loginStatus, login, isAuthenticated } = useInternetIdentity();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/admin" });
    }
  }, [isAuthenticated, navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex items-center justify-center relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 bg-primary blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2/3 left-1/4 w-[300px] h-[300px] rounded-full opacity-5 bg-secondary blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-grid-subtle" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 32 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        className: "relative z-10 w-full max-w-md mx-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { scale: 0.8, opacity: 0 },
                animate: { scale: 1, opacity: 1 },
                transition: { delay: 0.15, duration: 0.5 },
                className: "inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 border border-primary/30 glow-neon bg-primary/10",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "svg",
                  {
                    "aria-hidden": "true",
                    width: "32",
                    height: "32",
                    viewBox: "0 0 32 32",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M16 4L28 10V22L16 28L4 22V10L16 4Z",
                          stroke: "currentColor",
                          strokeWidth: "1.5",
                          fill: "currentColor",
                          fillOpacity: "0.15",
                          className: "text-primary"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M16 10L22 13V19L16 22L10 19V13L16 10Z",
                          fill: "currentColor",
                          className: "text-primary"
                        }
                      )
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground mb-1", children: "YasinForge" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body", children: "Admin Control Panel" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated rounded-2xl p-8 border-glow", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold text-foreground mb-2", children: "Secure Access" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "Authenticate with Internet Identity to access the admin dashboard. Your identity is cryptographically verified on-chain." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "admin_login.submit_button",
                onClick: () => login(),
                disabled: loginStatus === "logging-in",
                className: "w-full h-12 font-display font-semibold text-sm tracking-wide glow-neon transition-smooth",
                size: "lg",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-2", children: loginStatus === "logging-in" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "svg",
                    {
                      "aria-hidden": "true",
                      className: "animate-spin w-4 h-4",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "circle",
                          {
                            className: "opacity-25",
                            cx: "12",
                            cy: "12",
                            r: "10",
                            stroke: "currentColor",
                            strokeWidth: "4"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "path",
                          {
                            className: "opacity-75",
                            fill: "currentColor",
                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          }
                        )
                      ]
                    }
                  ),
                  "Authenticating..."
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "svg",
                    {
                      "aria-hidden": "true",
                      width: "16",
                      height: "16",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "2",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
                      ]
                    }
                  ),
                  "Login with Internet Identity"
                ] }) })
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 pt-5 border-t border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 w-5 h-5 flex-shrink-0 rounded-full border border-secondary/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  "aria-hidden": "true",
                  width: "10",
                  height: "10",
                  viewBox: "0 0 24 24",
                  fill: "currentColor",
                  className: "text-secondary",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" })
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "Your credentials are never stored. Authentication uses the Internet Computer's native identity protocol." })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "hover:text-primary transition-colors", children: "← Back to site" }) })
        ]
      }
    )
  ] });
}
export {
  AdminLoginPage as default
};
