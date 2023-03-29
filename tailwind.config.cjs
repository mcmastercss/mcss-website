/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 20s linear infinite",
        marquee2: "marquee2 20s linear infinite",
        marquee3: "marquee3 15s linear infinite",
        marquee4: "marquee4 15s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-160%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(160%)" },
          "100%": { transform: "translateX(0%)" },
        },
        marquee3: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-258%)" },
        },
        marquee4: {
          "0%": { transform: "translateX(258%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("daisyui"),
  ],
  daisyui: {
    darkTheme: false,
  },
};
