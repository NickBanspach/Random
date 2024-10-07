/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  darkMode: ["selector", '[data-joy-color-scheme="dark"]'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    stroke: {
      gray: {
        300: "#e2e2e2",
        700: "#272727",
      },
    },
  },
  plugins: [],
};
