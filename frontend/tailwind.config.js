/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#07111f',
        tide: '#0f172a',
        mist: '#d8e6f5',
        coral: '#ff7a59',
        sun: '#ffbe0b',
        aqua: '#4ecdc4',
        mint: '#86efac',
      },
      boxShadow: {
        panel: '0 18px 60px rgba(15, 23, 42, 0.16)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'hero-mesh': 'radial-gradient(circle at top left, rgba(255,122,89,0.22), transparent 34%), radial-gradient(circle at top right, rgba(78,205,196,0.18), transparent 30%), linear-gradient(135deg, #f8fbff 0%, #eef6ff 42%, #fff9f2 100%)',
        'auth-grid': 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%), radial-gradient(circle at 0% 0%, rgba(255,122,89,0.26), transparent 34%), radial-gradient(circle at 100% 100%, rgba(78,205,196,0.22), transparent 30%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseborder: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 122, 89, 0.18)' },
          '50%': { boxShadow: '0 0 0 8px rgba(255, 122, 89, 0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.55s ease-out both',
        'fade-up-delayed': 'fade-up 0.7s ease-out both',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        pulseborder: 'pulseborder 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
