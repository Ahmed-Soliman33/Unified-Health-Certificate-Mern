import { Page, Image } from "@react-pdf/renderer";
import pdf_page_2 from "@/assets/Images_PNG/page2.png";

export const GuidelinesPage = () => (
  <Page size={{ width: 21.45 * 28.35, height: 13.56 * 28.35 }}>
    <Image src={pdf_page_2} />
  </Page>
);
