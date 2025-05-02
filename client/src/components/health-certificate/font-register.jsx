import { Font } from "@react-pdf/renderer";
import jannaltbold from "@/assets/fonts/jannaltbold.ttf";
import jannaltregular from "@/assets/fonts/jannaltregular.ttf";

Font.register({
  family: "jannalt",
  fonts: [
    { src: jannaltregular, fontWeight: "normal" },
    { src: jannaltbold, fontWeight: "bold" },
  ],
});

// Ensure registration
export const registerFonts = () => true;
