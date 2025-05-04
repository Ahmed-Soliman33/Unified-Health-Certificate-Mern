import { View, Text, StyleSheet, Image } from "@react-pdf/renderer";
import moment from "moment-hijri";

// Register the font (ensure the path is correct)
import { Font } from "@react-pdf/renderer";
Font.register({
  family: "jannalt",
  src: "path/to/jannalt.ttf", // Replace with the actual font file path
});
// Fallback font for testing
Font.register({
  family: "NotoSansArabic",
  src: "https://fonts.google.com/noto/specimen/Noto+Sans+Arabic", // Or local path
});

const styles = StyleSheet.create({
  name: {
    fontSize: 24,
    color: "#07706D",
    direction: "rtl",
    paddingRight: 20,
    position: "absolute",
    zIndex: 1,
    top: "30px",
    fontFamily: "jannalt",
    fontWeight: "bold",
    maxWidth: 300,
  },
  rowsContainer: {
    flexDirection: "row",
    marginTop: -15,
  },
  rightCol: {
    width: "83%",
    display: "flex",
    flexDirection: "column",
    paddingRight: 10,
  },
  leftCol: {
    width: "25%",
    display: "flex",
    flexDirection: "column",
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 3,
  },
  content: {
    fontSize: 13,
    marginTop: 30,
    flex: 0.5,
    fontFamily: "jannalt",
    fontWeight: "bold",
    color: "#222",
    direction: "rtl",
  },
  nationality: {
    maxWidth: 150,
    height: 50,
    direction: "rtl",
    fontFamily: "jannalt",
    fontWeight: "bold",
    transform: "translate(66px, 65px)",
  },
  idNumber: {
    height: 50,
    maxWidth: 150,
    direction: "rtl",
    fontFamily: "jannalt",
    fontWeight: "bold",
    transform: "translate(300px, 52px)",
  },
  profession: {
    height: 50,
    maxWidth: 150,
    direction: "rtl",
    fontFamily: "jannalt",
    fontWeight: "bold",
    transform: "translate(66px, 95px)",
  },
  healthCertificateNumber: {
    maxWidth: 150,
    height: 50,
    direction: "rtl",
    fontFamily: "jannalt",
    fontWeight: "bold",
    transform: "translate(300px, 82px)",
  },
  healthCertificateIssuedAt: {
    maxWidth: 150,
    height: 50,
    direction: "rtl",
    fontFamily: "jannalt",
    fontWeight: "bold",
    transform: "translate(300px, 107px)",
  },
  healthCertificateExpiresAt: {
    maxWidth: 150,
    height: 50,
    direction: "rtl",
    fontFamily: "jannalt",
    fontWeight: "bold",
    transform: "translate(66px, 120px)",
  },
  educationalProgramType: {
    maxWidth: 150,
    height: 50,
    direction: "rtl",
    fontFamily: "jannalt",
    fontWeight: "bold",
    transform: "translate(300px, 130px)",
  },
  educationalProgramExpiresAt: {
    maxWidth: 150,
    height: 50,
    direction: "rtl",
    fontFamily: "jannalt",
    fontWeight: "bold",
    transform: "translate(66px, 144px)",
  },
  userImage: {
    width: 119,
    height: 120,
    alignItems: "center",
    transform: "translate(5px, 13px)",
  },
  qrCode: {
    width: 119,
    height: 118,
    transform: "translate(5px, 29px)",
  },
});

// Helper function to safely format dates
const formatHijriDate = (date) => {
  if (!date || !moment(date).isValid()) return "";
  return moment(date).format("iYYYY/iMM/iDD");
};

export const PersonalInfoSection = ({ qrCodeUrl, imgLink, formData }) => (
  <View style={styles.rowsContainer}>
    <View style={styles.leftCol}>
      <Image src={imgLink} style={styles.userImage} />
      <Image src={qrCodeUrl} style={styles.qrCode} />
    </View>
    <View style={styles.rightCol}>
      <Text style={styles.name}>{formData.name || ""}</Text>

      <View style={styles.content}>
        <Text style={styles.nationality}>{formData.nationality || ""}</Text>
        <Text style={styles.idNumber}>{formData.idNumber || ""}</Text>
        <Text style={styles.profession}>{formData.profession || ""}</Text>
        <Text style={styles.healthCertificateNumber}>
          {formData.healthCertificateNumber || ""}
        </Text>
        <Text style={styles.healthCertificateExpiresAt}>
          {formatHijriDate(formData.healthCertificateExpiresAt) || ""}
        </Text>
        <Text style={styles.healthCertificateIssuedAt}>
          {formatHijriDate(formData.healthCertificateIssuedAt) || ""}
        </Text>
        <Text style={styles.educationalProgramExpiresAt}>
          {formatHijriDate(formData.educationalProgramExpiresAt) || ""}
        </Text>
        <Text style={styles.educationalProgramType}>
          {formData.educationalProgramType || ""}
        </Text>
      </View>
    </View>
  </View>
);
