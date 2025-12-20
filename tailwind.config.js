/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/react/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      borderRadius: {
        large: "1rem",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      fontWeight: {
        regular: 400,
        semibold: 600,
      },
      fontSize: {
        xs: [
          "0.75rem",
          {
            lineHeight: "normal",
          },
        ],
        sm: [
          "0.875rem",
          {
            lineHeight: "1.5",
          },
        ],
        base: [
          "1rem",
          {
            lineHeight: "1.5",
          },
        ],
        lg: [
          "1.125rem",
          {
            lineHeight: "1.5",
          },
        ],
        "lg-2": [
          "1.25rem",
          {
            lineHeight: "1.5",
          },
        ],
        xl: [
          "1.5rem",
          {
            lineHeight: "1.5",
          },
        ],
        "xl-2": [
          "2rem",
          {
            lineHeight: "1.5",
          },
        ],
        "2xl": [
          "2.25rem",
          {
            lineHeight: "1.5",
          },
        ],
        "2xl-2": [
          "2.5rem",
          {
            lineHeight: "1.5",
          },
        ],
        "3xl": [
          "4.5rem",
          {
            lineHeight: "1.5",
          },
        ],
      },
      colors: {
        stroke: "#191919",
        "bg-white": "#FCFCFD",
        "bg-content": "#F3F4F7",
        "bg-notification": "rgba(188,167,157,0.1)",
        "primary-900": "#024447",
        "primary-800": "#045651",
        "primary-700": "#076B5B",
        "primary-600": "#0A8061",
        "primary-500": "#0F9565",
        "primary-400": "#3EBF84",
        "primary-300": "#66DF9C",
        "primary-200": "#9CF4BA",
        "primary-100": "#CCF9D7",
        "primary-0": "#FFFFFF",
        "success-900": "#3B6506",
        "success-800": "#4C7A0B",
        "success-700": "#659711",
        "success-600": "#7FB519",
        "success-500": "#9CD323",
        "success-400": "#BCE455",
        "success-300": "#D3F178",
        "success-200": "#E8FAA6",
        "success-100": "#F5FCD2",
        "error-900": "#7A0619",
        "error-800": "#930B16",
        "error-700": "#B71112",
        "error-600": "#DB2719",
        "error-500": "#FF4423",
        "error-400": "#FF7F59",
        "error-300": "#FFA37A",
        "error-200": "#FFC8A6",
        "error-100": "#FFE7D3",
        "warning-900": "#7A4D0B",
        "warning-800": "#936312",
        "warning-700": "#B7821D",
        "warning-600": "#DBA32A",
        "warning-500": "#FFC73A",
        "warning-400": "#FFD96B",
        "warning-300": "#FFE488",
        "warning-200": "#FFEFB0",
        "warning-100": "#FFF8D7",
        "information-900": "#102E7A",
        "information-800": "#1A4393",
        "information-700": "#2A60B7",
        "information-600": "#3D81DB",
        "information-500": "#54A6FF",
        "information-400": "#7EC2FF",
        "information-300": "#98D3FF",
        "information-200": "#BAE5FF",
        "information-100": "#DCF3FF",
        "secondary-900": "#090305",
        "secondary-800": "#0B0607",
        "secondary-700": "#0D090A",
        "secondary-600": "#100D0E",
        "secondary-500": "#131313",
        "secondary-400": "#717171",
        "secondary-300": "#B8B8B8",
        "secondary-200": "#E7E7E7",
        "secondary-100": "#F3F3F3",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      screens: {
        xsm: "427px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
