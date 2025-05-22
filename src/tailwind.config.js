module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [require('daisyui')],
    daisyui: {
      themes: ["light", "dark"], // or more like "cupcake", "retro"
    },
  }
  