/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'serif': ['Times New Roman', 'Georgia', ],
    },
    colors: {
      // background: '#DADCD3',
      // primary: '#000000',
      // secondary: '#999999',
      // accent: '#3963E2',
      background: '#effbf9',
      primary: '#A5A5A5',
      secondary: '#7F7F7F',
      accent: '#595959',
      ...colors
    },
    extend: {},
  },
  plugins: [],
}

