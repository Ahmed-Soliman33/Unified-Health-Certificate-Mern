import { View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import wzara_Logo from "@/assets/Images_PNG/eskan.png";
import balady_Logo from "@/assets/Images_PNG/balady.png";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxHeight: 75,
    paddingTop: 0,
    fontFamily: "jannalt",
    fontWeight: "bold",
  },

  wzaraLogo: {
    paddingRight: 10,
    width: "auto",
    height: "auto",
  },
  logo: {
    width: 70,
    height: 70,
  },
  municipalityLogo: {
    maxWidth: 100,
    maxHeight: 80,
  },
  titleContainer: {
    width: "49%",
    backgroundColor: "#07706D",
    paddingVertical: 10,
  },
  imagesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    color: "#FFF",
    fontFamily: "jannalt",
    fontWeight: "bold",
  },
});

export const CertificateHeader = ({ municipalityLogo }) => (
  <View style={styles.header}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>الشهادة الصحية الموحدة</Text>
    </View>
    <View style={styles.imagesContainer}>
      <Image src={municipalityLogo} style={styles.municipalityLogo} />
      <Image src={balady_Logo} style={styles.logo} />
      <Image src={wzara_Logo} style={styles.wzaraLogo} />
    </View>
  </View>
);
