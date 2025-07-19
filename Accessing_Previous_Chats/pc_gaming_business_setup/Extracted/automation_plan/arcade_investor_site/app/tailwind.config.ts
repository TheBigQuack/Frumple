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
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(rgba(0, 255, 157, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 157, 0.1) 1px, transparent 1px)',
        'neon-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #00FF9D 100%)',
        'gaming-gradient': 'linear-gradient(135deg, #1A0B2E 0%, #16213E 50%, #0F3460 100%)',
      },
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
        'gaming': ['Rajdhani', 'sans-serif'],
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
        // Gaming theme colors
        neon: {
          purple: '#8B5CF6',
          green: '#00FF9D',
          blue: '#0EA5E9',
          pink: '#F472B6',
        },
        cyber: {
          dark: '#0A0A0F',
          darker: '#050507',
          purple: '#6B46C1',
          green: '#10B981',
          blue: '#3B82F6',
        },
        gaming: {
          bg: '#1A0B2E',
          surface: '#16213E',
          accent: '#0F3460',
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
        'neon-glow': {
          '0%, 100%': {
            boxShadow: '0 0 5px #8B5CF6, 0 0 10px #8B5CF6, 0 0 15px #8B5CF6',
          },
          '50%': {
            boxShadow: '0 0 10px #8B5CF6, 0 0 20px #8B5CF6, 0 0 30px #8B5CF6',
          },
        },
        'cyber-pulse': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.02)',
          },
        },
        'glitch': {
          '0%, 100%': {
            transform: 'translateX(0)',
            filter: 'hue-rotate(0deg)',
          },
          '10%': {
            transform: 'translateX(-2px)',
            filter: 'hue-rotate(90deg)',
          },
          '20%': {
            transform: 'translateX(2px)',
            filter: 'hue-rotate(180deg)',
          },
          '30%': {
            transform: 'translateX(-2px)',
            filter: 'hue-rotate(270deg)',
          },
          '40%': {
            transform: 'translateX(2px)',
            filter: 'hue-rotate(360deg)',
          },
        },
        'slide-in': {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'neon-glow': 'neon-glow 2s ease-in-out infinite',
        'cyber-pulse': 'cyber-pulse 3s ease-in-out infinite',
        'glitch': 'glitch 0.5s ease-in-out infinite',
        'slide-in': 'slide-in 0.8s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      boxShadow: {
        'neon-purple': '0 0 20px #8B5CF6',
        'neon-green': '0 0 20px #00FF9D',
        'cyber-glow': '0 0 30px rgba(139, 92, 246, 0.5)',
        'gaming-card': '0 8px 32px rgba(0, 0, 0, 0.8), 0 0 20px rgba(139, 92, 246, 0.2)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
