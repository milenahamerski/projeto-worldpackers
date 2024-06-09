tailwind.config = {
  theme: {
    extend: {
      colors: {
        blue: {
          100: "#01585D",
          200: "#027F86",
        },
        gray: "#D8D0C5",
        chalk: "#333737",
        "ocre-light": "#D6B670",
      },
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        background:
          'url("/projeto-worldpackers/src/assets/img/background.png")',
        sea: 'url("/projeto-worldpackers/src/assets/img/sea.jpg")',
        logo: 'url("/projeto-worldpackers/src/assets/img/seashellther.png")',
      },
      fontSize: {
        "2xl": "2.0rem",
        "1xl": "1.5rem",
      },
    },
  },
};
