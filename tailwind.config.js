/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        steelblue: "#1d5182",
        lightskyblue: {
          "100": "#9ac1f0",
          "200": "#73aeee",
        },
        black: "#000",
        lightsteelblue: {
          "100": "#abcbf2",
          "200": "#adb2c4",
        },
        lavender: "#d1e0f3",
        dimgray: "#524931",
        gainsboro: {
          "100": "#e6e6e6",
          "200": "#e0e0e0",
        },
        darkgray: "#9e9e9e",
        aliceblue: "#e9eff5",
        "text-secondary": "#aaa",
        "text-brand": "#f2f2f7",
        rosybrown: "#a58b72",
        "stroke-1": "#444446",
        "state-active": "#0b84ff",
        orange: "#fba923",
        darkgoldenrod: {
          "100": "#b4791b",
          "200": "#b67815",
        },
        navajowhite: "#ffd3a8",
        burlywood: "#e7bf97",
        linen: {
          "100": "#fff2e6",
          "200": "#fff2e5",
        },
        whitesmoke: {
          "100": "#f8f8f8",
          "200": "#f4f4f4",
          "300": "#f2f2f2",
          "400": "#efefef",
          "500": "#ebebeb",
        },
        gray: "#939393",
        darkslategray: "#454444",
        cornflowerblue: "#86b7ff",
      },
      spacing: {},
      fontFamily: {
        "super-easy": "'Super Easy'",
        jaldi: "Jaldi",
        "caption-2": "Inter",
      },
      borderRadius: {
        xl: "20px",
        "6xl": "25px",
        "41xl": "60px",
        "3xs": "10px",
        "81xl": "100px",
      },
    },
    fontSize: {
      "13xl": "32px",
      xl: "20px",
      mini: "15px",
      xs: "12px",
      "5xl": "24px",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
