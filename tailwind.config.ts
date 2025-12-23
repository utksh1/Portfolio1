import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Cyberpunk Neon Colors
        'cyber-cyan': '#00ff88',
        'cyber-purple': '#a855f7',
        'cyber-blue': '#0084ff',
        'space-navy': '#0a0e27',
        'space-dark': '#0f1729',
        'electric-cyan': '#00ffff',
        'neon-pink': '#ff0080',
        'glow-cyan': 'rgba(0, 255, 136, 0.5)',
        'glow-purple': 'rgba(168, 85, 247, 0.5)',
        'glow-blue': 'rgba(0, 132, 255, 0.5)',
      },
      fontFamily: {
        'mono': ['var(--font-jetbrains-mono)', 'Courier New', 'monospace'],
        'cyber': ['var(--font-orbitron)', 'monospace'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'matrix': 'matrix 20s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { 
            textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
            boxShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor'
          },
          '100%': { 
            textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
            boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        matrix: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0a0e27 100%)',
        'gradient-neon': 'linear-gradient(45deg, #00ff88, #a855f7, #0084ff)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 255, 136, 0.3)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.3)',
        'glow-blue': '0 0 20px rgba(0, 132, 255, 0.3)',
        'cyber-inset': 'inset 0 2px 4px 0 rgba(0, 255, 136, 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;