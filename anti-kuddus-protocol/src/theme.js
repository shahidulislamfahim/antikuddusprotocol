import { createContext, useContext } from "react";

/* =========================================================================
   FONTS
   Primary application font: Proxima Nova, used for every role — display
   headings, body copy, and the uppercase "mono-style" labels alike — with
   a high-quality system fallback stack so the app renders correctly even
   before a licensed Proxima Nova source is wired up (see index.html and
   src/index.css for how to add one).
   ========================================================================= */
export const fontDisplay =
  "'Proxima Nova', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
export const fontBody =
  "'Proxima Nova', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
export const fontMono =
  "'Proxima Nova', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/* =========================================================================
   THEME
   Light: white ground, royal-purple ink, glass panels.
   Dark: black ground, tribunal-green ink, glass panels.
   ========================================================================= */
export const THEMES = {
  light: {
    mode: "light",
    bg: "#FFFFFF",
    bgAlt: "#FAF8FE",
    glass: "rgba(255,255,255,0.62)",
    glassStrong: "rgba(255,255,255,0.82)",
    glassBorder: "rgba(109,40,217,0.16)",
    border: "rgba(109,40,217,0.14)",
    primary: "#6D28D9",
    primaryInk: "#FFFFFF",
    primaryDim: "#F1EAFC",
    text: "#1E1330",
    textMuted: "#6B6478",
    textFaint: "#9C93AA",
    danger: "#B3261E",
    dangerDim: "#FBEAE9",
    success: "#166B3F",
    successDim: "#E7F5EC",
    shadow: "0 10px 30px rgba(109,40,217,0.08)",
  },
  dark: {
    mode: "dark",
    bg: "#000000",
    bgAlt: "#080A08",
    glass: "rgba(18,20,18,0.58)",
    glassStrong: "rgba(14,16,14,0.82)",
    glassBorder: "rgba(34,197,94,0.20)",
    border: "rgba(34,197,94,0.16)",
    primary: "#22C55E",
    primaryInk: "#04140A",
    primaryDim: "#0F2318",
    text: "#EAF7EE",
    textMuted: "#8FA89A",
    textFaint: "#5B6E63",
    danger: "#FF6B5E",
    dangerDim: "#2A1210",
    success: "#22C55E",
    successDim: "#0F2318",
    shadow: "0 10px 30px rgba(34,197,94,0.10)",
  },
};

export const ThemeContext = createContext(THEMES.light);
export const useT = () => useContext(ThemeContext);
