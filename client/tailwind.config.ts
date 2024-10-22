import { withUt } from 'uploadthing/tw';
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontSize: {
        'heading-1': ['4rem', { lineHeight: '5rem' }],
        'heading-2': ['3rem', { lineHeight: '2.5rem' }],
        'heading-3': ['2rem', { lineHeight: '2.5rem' }],
        'heading-4': ['1.5rem', { lineHeight: '2rem' }],
        'heading-5': ['1.25rem', { lineHeight: '1.5rem' }],
        'heading-6': ['1rem', { lineHeight: '1.5rem' }],
        'body-large': ['1.25rem', { lineHeight: '2rem' }],
        'body-regular': ['1rem', { lineHeight: '1.5rem' }],
        'body-small': ['.95rem', { lineHeight: '1.5rem' }],
        'body-xsmall': ['0.75rem', { lineHeight: '1.5rem' }],
        caption: ['.95rem', { lineHeight: '1rem' }],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default withUt(config);
