import {
  Document,
  Page,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
  PDFViewer,
} from "@react-pdf/renderer";
import { CertificateHeader } from "./certificate-header";
import { PersonalInfoSection } from "./personal-info-section";
import { CertificateFooter } from "./certificate-footer";
import { GuidelinesPage } from "./guidelines-page";
import { registerFonts } from "./font-register";
import { municipalityLogos } from "./municipalityLogos";
import pdf_bg from "@/assets/Images_PNG/pdf_bg.png";

// Ensure fonts are registered
registerFonts();

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    position: "relative", // Important for background image layering
    flexDirection: "column",
    backgroundColor: "#ECEFF3",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    opacity: 0.7,
  },
  container: {
    direction: "rtl",
    flex: 1,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    marginTop: 20,
  },
  photoSection: {
    width: 100,
    alignItems: "center",
  },
});

// Main PDF Document component
const HealthCertificateDocument = ({
  formData,
  imgLink,
  municipalityLogo,
  qrCodeUrl,
  userLink,
}) => (
  <Document>
    {/* First Page - Certificate */}
    <Page
      size={{ width: 21.45 * 28.35, height: 13.56 * 28.35 }}
      style={styles.page}
    >
      {/* Background Image */}
      <Image
        src={pdf_bg} // You can use a base64 string or URL here
        style={styles.backgroundImage}
      />

      <View style={styles.container}>
        <CertificateHeader municipalityLogo={municipalityLogo} />
        <PersonalInfoSection
          userLink={userLink}
          qrCodeUrl={qrCodeUrl}
          imgLink={imgLink}
          formData={formData}
        />
        <CertificateFooter />
      </View>
    </Page>

    {/* Second Page - Guidelines */}
    <GuidelinesPage />
  </Document>
);

// Main component that provides PDF viewing and download functionality
const HealthCertificatePDF = ({
  qrCodeUrl,
  imgLink,
  formData,
  municipality,
  userLink,
}) => {
  // Import all municipality logos

  const municipalityLogo = municipalityLogos[municipality] || "";
  return (
    <div className="flex flex-col items-center mt-4">
      {/* Download Button */}
      <PDFDownloadLink
        document={
          <HealthCertificateDocument
            userLink={userLink}
            qrCodeUrl={qrCodeUrl}
            imgLink={imgLink}
            formData={formData}
            municipality={municipality}
            municipalityLogo={municipalityLogo}
          />
        }
        fileName="health-certificate.pdf"
        className="mb-4  text-blue-600 underline cursor-pointer"
      >
        {({ blob, url, loading, error }) =>
          loading
            ? "جاري تحضير الشهادة الصحية..."
            : "اضغط هنا لتحميل الشهادة الصحية بصيغة PDF"
        }
      </PDFDownloadLink>
    </div>
  );
};

// Form to PDF component
const FormToPDF = ({
  qrCodeUrl,
  formData,
  imgLink,
  submitted,
  municipality,
  userLink,
}) => {
  return (
    <div>
      {submitted && (
        <>
          <HealthCertificatePDF
            userLink={userLink}
            qrCodeUrl={qrCodeUrl}
            formData={formData}
            municipality={municipality}
            imgLink={imgLink}
          />

          {/* <div className="w-full  h-[700px]">
            <PDFViewer width={"100%"} height={"100%"}>
              <HealthCertificateDocument
                userLink={userLink}
                qrCodeUrl={qrCodeUrl}
                imgLink={imgLink}
                formData={formData}
                municipality={municipality}
              />
            </PDFViewer>
          </div> */}
        </>
      )}
    </div>
  );
};

export default FormToPDF;
