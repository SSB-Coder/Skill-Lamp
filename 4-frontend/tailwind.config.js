/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace']
      },
      colors: {
        app: {
          bg: '#121214',           // page background — true neutral obsidian, not navy
          surface: '#1A1A1D',      // card / panel background
          panel: '#1A1A1D',        // backward-compat alias
          surfaceRaised: '#212124',// hover state, dropdowns, modals — one step lighter
          border: '#2C2C30',       // default 1px border
          borderLight: '#2C2C30',  // backward-compat alias
          borderSubtle: '#232326', // internal dividers, less prominent than border
          text: '#EDEDEF',         // primary text — off-white, not pure #FFF
          muted: '#98989E',        // secondary text, labels
          subtle: '#656569',       // tertiary / disabled text
          accent: '#22C3B6',       // the ONE accent — tealish cyan. Primary actions, active states
          action: '#22C3B6',       // backward-compat alias
          accentHover: '#1AA396',  // accent pressed/hover
          actionHover: '#1AA396',  // backward-compat alias
          accentMuted: '#7FE0D4',  // accent used as text color on dark surfaces
          accentWash: 'rgba(34,195,182,0.12)', // accent used as a background tint
          success: '#3FAE74',      // muted green — status: eligible / positive delta
          warning: '#C99A4A',      // muted amber — metric deltas only
          amber: '#C99A4A',        // backward-compat alias
          danger: '#D9534F'        // muted red — status: blocked / backlog
        }
      }
    }
  },
  plugins: []
};
