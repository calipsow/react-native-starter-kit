// tailwind.config.js
module.exports = {
  content: [
    './src/components/*.{js,ts,jsx,tsx}',
    './src/modules/*.{js,ts,jsx,tsx}',
    './src/modules/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/**/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/**/**/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/**/**/**/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/**/**/**/**/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        xs: {
          fontSize: 12, // 0.75rem * 16
          lineHeight: 18, // 1.5 * 12
        },
        sm: {
          fontSize: 14, // 0.875rem * 16
          lineHeight: 22, // 1.5715 * 14
        },
        base: {
          fontSize: 16, // 1rem * 16
          lineHeight: 24, // 1.5 * 16
          letterSpacing: -0.27, // -0.017em * 16
        },
        lg: {
          fontSize: 18, // 1.125rem * 16
          lineHeight: 27, // 1.5 * 18
          letterSpacing: -0.31, // -0.017em * 18
        },
        xl: {
          fontSize: 20, // 1.25rem * 16
          lineHeight: 30, // 1.5 * 20
          letterSpacing: -0.34, // -0.017em * 20
        },
        xl2: {
          fontSize: 24, // 1.5rem * 16
          lineHeight: 34, // 1.415 * 24
          letterSpacing: -0.41, // -0.017em * 24
        },
        xl3: {
          fontSize: 30, // 1.875rem * 16
          lineHeight: 40, // 1.333 * 30
          letterSpacing: -0.51, // -0.017em * 30
        },
        xl4: {
          fontSize: 36, // 2.25rem * 16
          lineHeight: 46, // 1.277 * 36
          letterSpacing: -0.61, // -0.017em * 36
        },
        xl5: {
          fontSize: 48, // 3rem * 16
          lineHeight: 58, // 1.2 * 48
          letterSpacing: -0.82, // -0.017em * 48
        },
        xl6: {
          fontSize: 60, // 3.75rem * 16
          lineHeight: 60, // 1 * 60
          letterSpacing: -1.02, // -0.017em * 60
        },
        xl7: {
          fontSize: 80, // 5rem * 16
          lineHeight: 80, // 1 * 80
          letterSpacing: -1.36, // -0.017em * 80
        },
      },
      letterSpacing: {
        tighter: -0.64,
        tight: -0.32,
        normal: 0,
        wide: 0.32,
        wider: 0.64,
        widest: 12.8,
      },
    },
  },
};
