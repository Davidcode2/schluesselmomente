/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/src/**/*.{html,js}', 'index.html', 'impressum.html'],
  theme: {
    extend: {
      backgroundImage: {
        'hero-image': "url('./assets/wallhaven-4586m5.jpg')",
        'footer-texture': "url('./assets/wallhaven-4586m5.jpg')",
      },
      boxShadow: {
        'hard': '30px 30px rgba(0, 0, 0, 1)',
      }
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
