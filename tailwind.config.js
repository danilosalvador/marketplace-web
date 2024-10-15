/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['var(--ff-title)'],
        text: ['var(--ff)'],
      },
      fontSize: {
        'title-lg': 'var(--fs-title-lg)',
        'title-md': 'var(--fs-title-md)',
        'title-sm': 'var(--fs-title-sm)',
        subtitle: 'var(--fs-subtitle)',
        'body-md': 'var(--fs-body-md)',
        'body-sm': 'var(--fs-body-sm)',
        'body-xs': 'var(--fs-body-xs)',
        'label-md': 'var(--fs-label-md)',
        'label-sm': 'var(--fs-label-sm)',
        'action-md': 'var(--fs-action-md)',
        'action-sm': 'var(--fs-action-sm)',
      },
      fontWeight: {
        'fw-title': 'var(--fw-title)',
        'fw-subtitle': 'var(--fw-subtitle)',
        'fw-body': 'var(--fw-body)',
        'fw-label': 'var(--fw-label)',
        'fw-action': 'var(--fw-action)',
      },
      lineHeight: {
        default: '1.2',
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
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
