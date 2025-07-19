import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(rgba(0,255,159,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,159,0.1) 1px, transparent 1px)',
        'neon-gradient': 'linear-gradient(135deg, #00ff9f 0%, #9945ff 50%, #00ff9f 100%)',
        'cyber-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a0033 50%, #000a1a 100%)',
        'purple-neon': 'linear-gradient(135deg, #9945ff 0%, #c084fc 50%, #9945ff 100%)',
        'green-neon': 'linear-gradient(135deg, #00ff9f 0%, #00d982 50%, #00ff9f 100%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        // Cyberpunk Color Palette
        neon: {
          green: '#00ff9f',
          purple: '#9945ff',
          pink: '#ff10f0',
          blue: '#00d4ff',
          orange: '#ff6b35',
        },
        cyber: {
          black: '#0a0a0a',
          'dark-gray': '#1a1a1a',
          'med-gray': '#2a2a2a',
          'light-gray': '#3a3a3a',
          'purple-dark': '#1a0033',
          'green-dark': '#001a0f',
        },
        glow: {
          green: 'rgba(0, 255, 159, 0.5)',
          purple: 'rgba(153, 69, 255, 0.5)',
          pink: 'rgba(255, 16, 240, 0.5)',
          blue: 'rgba(0, 212, 255, 0.5)',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'neon-pulse': {
          '0%, 100%': {
            textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
          },
          '50%': {
            textShadow: '0 0 2px currentColor, 0 0 5px currentColor, 0 0 8px currentColor',
          },
        },
        'cyber-glow': {
          '0%, 100%': {
            boxShadow: '0 0 5px rgba(0, 255, 159, 0.5), 0 0 10px rgba(0, 255, 159, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 10px rgba(0, 255, 159, 0.8), 0 0 20px rgba(0, 255, 159, 0.5)',
          },
        },
        'data-stream': {
          '0%': {
            transform: 'translateY(-100%)',
            opacity: '0',
          },
          '50%': {
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(100vh)',
            opacity: '0',
          },
        },
        'glitch': {
          '0%': {
            transform: 'translate(0)',
          },
          '20%': {
            transform: 'translate(-2px, 2px)',
          },
          '40%': {
            transform: 'translate(-2px, -2px)',
          },
          '60%': {
            transform: 'translate(2px, 2px)',
          },
          '80%': {
            transform: 'translate(2px, -2px)',
          },
          '100%': {
            transform: 'translate(0)',
          },
        },
        'matrix-rain': {
          '0%': {
            transform: 'translateY(-100%)',
          },
          '100%': {
            transform: 'translateY(100vh)',
          },
        },
        'neon-border': {
          '0%, 100%': {
            borderColor: 'rgba(0, 255, 159, 0.5)',
            boxShadow: '0 0 5px rgba(0, 255, 159, 0.5)',
          },
          '50%': {
            borderColor: 'rgba(153, 69, 255, 0.8)',
            boxShadow: '0 0 10px rgba(153, 69, 255, 0.8)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'cyber-glow': 'cyber-glow 3s ease-in-out infinite',
        'data-stream': 'data-stream 3s linear infinite',
        'glitch': 'glitch 0.3s infinite',
        'matrix-rain': 'matrix-rain 5s linear infinite',
        'neon-border': 'neon-border 2s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
