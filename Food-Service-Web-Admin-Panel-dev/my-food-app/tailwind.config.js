/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // main Colors
        primary: "#1273EE",
        secondary: "#000145",
        // Status Colors
        error: "#F11F46",
        info: "#007BFF",
        warning: "#F69B0E",
        "warning-10": "#F69B0E10",
        success: "#03BC44",
        "success-10": "#03BC441A",
        danger: "#F11F46",
        "danger-10": "#F11F4610",
        blue: "#000145",
        "blue-50": "#00014580",
        "blue-20": "#00014533",
        kilamanjaro: "#220D03",
        "black-10": "#0000001A",
        "black-20": "#00000033",
        "black-30": "#0000004D",
        "black-40": "#00000066",
        "warning-subtle": "#FFC10733",
        "primary-subtle": "#FD7E141A",
        "blue-subtle": "#28A7451A",
        "success-subtle": "#007BFF1A",
        "danger-subtle": "#F11F461A",
        "text-subtle": "#5F5E5E",
        pending: "#FAAD14",
        "pending-subtle": "#FFFDD3",
        rejected: "#FF4D4F",
        "rejected-subtle": "#F11F461A",
        scorpion: "#5F5E5E",
        "in-review": "#0285FF1A",
        "wild-sand": "#F6F6F6",
      },
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      keyframes: {
        pulseRing: {
          "100%": {
            transform: "scale(0.1)",
            opacity: "0.6",
            boxShadow: "0 0 0 0 rgba(76,167,249,0.7)",
          },
          "100%": {
            transform: "scale(1.5)",
            opacity: "0",
            boxShadow: "0 0 0 14px rgba(76,167,249,0)",
          },
        },
      },
      animation: {
        pulseRing: "pulseRing 1.5s ease-out infinite",
        pulseRingFast: "pulseRing 0.60s ease-out infinite",
        pulseRingSlow: "pulseRing 2s ease-out infinite",
      },
    },
  },
  plugins: [],
};
{
  /* <div className="relative w-6 h-6">
                                <div className="absolute inset-0 rounded-full bg-[#4ca7f9] opacity-75 animate-ping"></div>
                                <span className="relative z-10 font-bold bg-transparent w-6 h-6 rounded-full flex justify-center items-center">
                                  {subStatus.count || 0}
                                </span>
                              </div> */
}
