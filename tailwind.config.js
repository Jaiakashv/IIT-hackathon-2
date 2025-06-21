/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#1E40AF', // Deep blue (primary) - blue-800
        'primary-50': '#EFF6FF', // Very light blue (50-level shade) - blue-50
        'primary-100': '#DBEAFE', // Light blue (100-level shade) - blue-100
        'primary-500': '#3B82F6', // Medium blue (500-level shade) - blue-500
        'primary-600': '#2563EB', // Darker blue (600-level shade) - blue-600
        'primary-700': '#1D4ED8', // Dark blue (700-level shade) - blue-700
        
        // Secondary Colors
        'secondary': '#7C3AED', // Complementary purple (secondary) - violet-600
        'secondary-50': '#F5F3FF', // Very light purple (50-level shade) - violet-50
        'secondary-100': '#EDE9FE', // Light purple (100-level shade) - violet-100
        'secondary-500': '#8B5CF6', // Medium purple (500-level shade) - violet-500
        
        // Accent Colors
        'accent': '#F59E0B', // Warm amber (accent) - amber-500
        'accent-50': '#FFFBEB', // Very light amber (50-level shade) - amber-50
        'accent-100': '#FEF3C7', // Light amber (100-level shade) - amber-100
        'accent-600': '#D97706', // Darker amber (600-level shade) - amber-600
        
        // Background Colors
        'background': '#FAFBFC', // Soft off-white (background) - slate-50
        'surface': '#FFFFFF', // Pure white (surface) - white
        
        // Text Colors
        'text-primary': '#1F2937', // Near-black (text primary) - gray-800
        'text-secondary': '#6B7280', // Medium gray (text secondary) - gray-500
        
        // Status Colors
        'success': '#10B981', // Fresh green (success) - emerald-500
        'success-50': '#ECFDF5', // Very light green (50-level shade) - emerald-50
        'success-100': '#D1FAE5', // Light green (100-level shade) - emerald-100
        
        'warning': '#F59E0B', // Consistent with accent (warning) - amber-500
        'warning-50': '#FFFBEB', // Very light amber (50-level shade) - amber-50
        'warning-100': '#FEF3C7', // Light amber (100-level shade) - amber-100
        
        'error': '#EF4444', // Clear red (error) - red-500
        'error-50': '#FEF2F2', // Very light red (50-level shade) - red-50
        'error-100': '#FEE2E2', // Light red (100-level shade) - red-100
        
        // Border Colors
        'border': '#E5E7EB', // Light gray (border) - gray-200
        'border-light': '#F3F4F6', // Very light gray (border light) - gray-100
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'fluid-sm': 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
        'fluid-base': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 1rem + 0.625vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 1.3rem + 1vw, 1.875rem)',
        'fluid-3xl': 'clamp(1.875rem, 1.6rem + 1.375vw, 2.25rem)',
      },
      borderRadius: {
        'DEFAULT': '6px',
        'card': '8px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'interactive': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'modal': '0 20px 25px rgba(0, 0, 0, 0.1)',
      },
      scale: {
        '102': '1.02',
      },
      transitionDuration: {
        '150': '150ms',
        '300': '300ms',
        '500': '500ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      zIndex: {
        '100': '100',
        '150': '150',
        '200': '200',
        '300': '300',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}