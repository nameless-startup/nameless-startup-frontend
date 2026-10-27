import localFont from "next/font/local";

export const Peyda = localFont({
  src: [
    {
      path: "../fonts/Peyda-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Peyda-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Peyda-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Peyda-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-peyda",
  display: "swap",
});