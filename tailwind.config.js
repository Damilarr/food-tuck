/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors:{
        yelloww:"#ff9f0d"
      },
      backgroundColor:{
        dark:"#0d0d0d"
      },
    },
    backgroundImage:{
      homeSect:"url('assets/imgs/banner2.png')",
      banner:"url('assets/imgs/banner.png')"
    }
  }
}
