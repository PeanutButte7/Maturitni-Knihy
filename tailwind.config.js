module.exports = {
  purge: [],
  theme: {
    fontFamily: {
      sans: ['Fira Sans', 'sans-serif'],
    },
    container: {
      padding: {
        default: '2rem',
        sm: '4rem',
        md: '6rem',
        lg: '10rem',
        xl: '15rem'
      },
    },
    extend: {
      fontSize: {
        '4xl': '2.5rem'
      },
      colors: {
        primary: 'var(--color-primary)',
        note: 'var(--color-note)',
        accent: 'var(--color-accent)',
        highlight: 'var(--color-highlight)',
        brand: 'var(--color-brand)',
        background: 'var(--color-background)'
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'checked'],
  },
  plugins: [],
};
