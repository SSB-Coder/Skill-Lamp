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
          bg: '#0B0F19',          // Solid matte dark slate background
          panel: '#151D2C',       // Solid opaque card surface
          border: '#283347',      // 1px solid crisp neutral border
          borderLight: '#374151', // Hover border state
          text: '#F8FAFC',        // High-contrast primary text
          muted: '#94A3B8',       // Secondary label / table header text
          action: '#0284C7',      // Professional enterprise steel blue (Primary action)
          actionHover: '#0369A1', // Button hover state
          amber: '#D97706',       // Matte metric highlight (strictly for delta values)
          success: '#16A34A',     // Status eligible
          danger: '#DC2626'       // Status blocked
        }
      }
    }
  },
  plugins: []
};
