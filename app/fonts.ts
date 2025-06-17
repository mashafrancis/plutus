import localFont from "next/font/local";

export const fontMono = localFont({
  src: [
    {
      path: "./fonts/mxl-mono-light.woff2",
      weight: "400",
      style: "light",
    },
    {
      path: "./fonts/mxl-mono-regular.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/mxl-mono-medium.woff2",
      weight: "600",
      style: "medium",
    },
    {
      path: "./fonts/mxl-mono-semibold.woff2",
      weight: "600",
      style: "semibold",
    },
    {
      path: "./fonts/mxl-mono-bold.woff2",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-mono",
  display: "swap",
  fallback: ["Courier New", "monospace"],
});

export const fontSans = localFont({
  src: [
    // {
    // 	path: "./fonts/CircularText-Light.woff2",
    // 	weight: "400",
    // 	style: "light",
    // },
    // {
    // 	path: "./fonts/CircularText-Book.woff2",
    // 	weight: "500",
    // 	style: "normal",
    // },
    // {
    // 	path: "./fonts/CircularStd-Medium.woff2",
    // 	weight: "600",
    // 	style: "semibold",
    // },
    // {
    // 	path: "./fonts/CircularStd-Bold.woff2",
    // 	weight: "700",
    // 	style: "bold",
    // },
    {
      path: "./fonts/mxl-sans-regular.woff",
      weight: "400",
      style: "light",
    },
    {
      path: "./fonts/mxl-sans-regular.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/mxl-sans-medium.woff",
      weight: "600",
      style: "semibold",
    },
    {
      path: "./fonts/mxl-sans-bold.woff",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-sans",
});
