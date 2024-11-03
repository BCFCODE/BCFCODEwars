import { Montserrat } from "next/font/google";

// Load Montserrat font with multiple weights and styles
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"], // Added weights for normal, medium, semi-bold, bold, and extra-bold
  style: ["normal", "italic"], // Added styles for normal and italic
  display: "swap",
});
