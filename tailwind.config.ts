import { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const tailwindConfig = {
  darkMode: ['class'],
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}', // Tremor module
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border) / <alpha-value>) !important',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        alternative: 'hsl(var(--alternative) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'hsl(var(--primary)/ <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        brand: {
          DEFAULT: 'hsl(var(--brand)/ <alpha-value>)',
          foreground: 'hsl(var(--brand-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        normal: {
          DEFAULT: 'hsl(var(--normal) / <alpha-value>)',
          foreground: 'hsl(var(--normal-foreground) / <alpha-value>)',
        },
        info: {
          DEFAULT: 'hsl(var(--info) / <alpha-value>)',
          foreground: 'hsl(var(--info-foreground) / <alpha-value>)',
        },
        warn: {
          DEFAULT: 'hsl(var(--warn) / <alpha-value>)',
          foreground: 'hsl(var(--warn-foreground) / <alpha-value>)',
        },
        success: {
          DEFAULT: 'hsl(var(--success) / <alpha-value>)',
          foreground: 'hsl(var(--success-foreground) / <alpha-value>)',
        },
        error: {
          DEFAULT: 'hsl(var(--error) / <alpha-value>)',
          foreground: 'hsl(var(--error-foreground) / <alpha-value>)',
        },
      },
      tremor: {
        brand: {
          faint: '#e1f4fa', // blue-50
          muted: '#82d1ea', // blue-200
          subtle: '#35b2de', // blue-400
          DEFAULT: '#17a5da', // blue-500
          emphasis: '#0085b9', // blue-700
          inverted: '#ffffff', // white
        },
        background: {
          muted: '#f9fafb', // gray-50
          subtle: '#f3f4f6', // gray-100
          DEFAULT: '#ffffff', // white
          default: '#ffffff', // white
          emphasis: '#374151', // gray-700
        },
        border: {
          DEFAULT: '#e5e7eb', // gray-200
        },
        ring: {
          DEFAULT: '#e5e7eb', // gray-200
        },
        content: {
          subtle: '#9ca3af', // gray-400
          DEFAULT: '#6b7280', // gray-500
          emphasis: '#374151', // gray-700
          strong: '#111827', // gray-900
          inverted: '#ffffff', // white
        },
      },
      'dark-tremor': {
        brand: {
          faint: '#0B1229', // custom
          muted: '#172554', // blue-950
          subtle: '#1e40af', // blue-800
          DEFAULT: '#3b82f6', // blue-500
          emphasis: '#60a5fa', // blue-400
          inverted: '#030712', // gray-950
        },
        background: {
          muted: '#131A2B', // custom
          subtle: '#1f2937', // gray-800
          DEFAULT: '#ffffff', // gray-900
          emphasis: '#d1d5db', // gray-300
        },
        border: {
          DEFAULT: '#09090c', // border-border
        },
        ring: {
          DEFAULT: '#1f2937', // gray-800
        },
        content: {
          subtle: '#27272a', // border-border
          DEFAULT: '#ffffff', // white
          emphasis: '#4b5563', // gray-200
          strong: '#f9fafb', // gray-50
          inverted: '#000000', // black
        },
      },
      boxShadow: {
        // light
        'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'tremor-card':
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'tremor-dropdown':
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        // dark
        'dark-tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'dark-tremor-card':
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'dark-tremor-dropdown':
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        'tremor-small': '0.375rem',
        'tremor-default': '0.5rem',
        'tremor-full': '9999px',
      },
      fontSize: {
        'tremor-label': ['0.75rem', { lineHeight: '1rem' }],
        'tremor-default': ['0.875rem', { lineHeight: '1.25rem' }],
        'tremor-title': ['1.125rem', { lineHeight: '1.75rem' }],
        'tremor-metric': ['1.875rem', { lineHeight: '2.25rem' }],
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        heading: ['var(--font-heading)', ...fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        fadeIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
        overlayContentShow: {
          '0%': { opacity: '0', transform: 'translate(0%, -2%) scale(.96)' },
          '100%': { opacity: '1', transform: 'translate(0%, 0%) scale(1)' },
        },
        overlayContentHide: {
          '0%': { opacity: '1', transform: 'translate(0%, 0%) scale(1)' },
          '100%': { opacity: '0', transform: 'translate(0%, -2%) scale(.96)' },
        },
        dropdownFadeIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        dropdownFadeOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
        fadeInOverlayBg: {
          '0%': { opacity: '0' },
          '100%': { opacity: '0.75' },
        },
        fadeOutOverlayBg: {
          '0%': { opacity: '0.75' },
          '100%': { opacity: '0' },
        },
        slideDown: {
          '0%': { height: '1', opacity: '0' },
          '100%': {
            height: 'var(--radix-accordion-content-height)',
            opacity: '1',
          },
        },
        slideUp: {
          '0%': {
            height: 'var(--radix-accordion-content-height)',
            opacity: '1',
          },
          '100%': { height: '1', opacity: '0' },
        },

        slideDownNormal: {
          '0%': { height: '1', opacity: '0' },
          '100%': {
            height: 'inherit',
            opacity: '1',
          },
        },
        slideUpNormal: {
          '0%': { height: 'inherit', opacity: '1' },
          '100%': { height: '1', opacity: '0' },
        },

        panelSlideLeftOut: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': {
            transform: 'translate-x-0',
            opacity: '1',
          },
        },
        panelSlideLeftIn: {
          '0%': { transform: 'translate-x-0', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' },
        },
        panelSlideRightOut: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': {
            transform: 'translate-x-0',
            opacity: '1',
          },
        },
        panelSlideRightIn: {
          '0%': { transform: 'translate-x-0', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        lineLoading: {
          '0%': {
            marginLeft: '-10%',
            width: '80px',
          },
          '25%': {
            width: ' 240px',
          },
          '50%': {
            marginLeft: '100%',
            width: '80px',
          },
          '75%': {
            width: '240px',
          },
          '100%': {
            marginLeft: '-10%',
            width: '80px',
          },
        },
        shimmer: {
          '0%': {
            'background-position': '-1000px 0',
          },
          '100%': {
            'background-position': '1000px 0',
          },
        },
        sway: {
          '0%, 100%': {
            transform: 'rotate(-10deg) scale(1.5) translateY(4rem)',
          },
          '50%': {
            transform: 'rotate(10deg) scale(1.5) translateY(2rem)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fadeIn 300ms both',
        'fade-out': 'fadeOut 300ms both',

        'dropdown-content-show':
          'overlayContentShow 100ms cubic-bezier(0.16, 1, 0.3, 1)',
        'dropdown-content-hide':
          'overlayContentHide 100ms cubic-bezier(0.16, 1, 0.3, 1)',

        'overlay-show':
          'overlayContentShow 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        'overlay-hide':
          'overlayContentHide 300ms cubic-bezier(0.16, 1, 0.3, 1)',

        'fade-in-overlay-bg': 'fadeInOverlayBg 300ms',
        'fade-out-overlay-bg': 'fadeOutOverlayBg 300ms',

        'slide-down': 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        'slide-up': 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',

        'slide-down-normal':
          'slideDownNormal 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        'slide-up-normal': 'slideUpNormal 300ms cubic-bezier(0.87, 0, 0.13, 1)',

        'panel-slide-left-out':
          'panelSlideLeftOut 200ms cubic-bezier(0.87, 0, 0.13, 1)',
        'panel-slide-left-in':
          'panelSlideLeftIn 250ms cubic-bezier(0.87, 0, 0.13, 1)',
        'panel-slide-right-out':
          'panelSlideRightOut 200ms cubic-bezier(0.87, 0, 0.13, 1)',
        'panel-slide-right-in':
          'panelSlideRightIn 250ms cubic-bezier(0.87, 0, 0.13, 1)',

        'line-loading': 'lineLoading 1.8s infinite',

        // tailwind class for this is `animate-dropdownFadeIn`
        dropdownFadeIn: 'dropdownFadeIn 0.1s ease-out',
        // tailwind class for this is `animate-dropdownFadeOut`
        dropdownFadeOut: 'dropdownFadeOut 0.1s ease-out',

        shimmer: 'shimmer 2s infinite linear',
        sway: 'sway 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
} satisfies Config

export default tailwindConfig
