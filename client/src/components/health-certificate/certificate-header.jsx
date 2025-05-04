import { View, Image, StyleSheet } from "@react-pdf/renderer";

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
    transform: "translate(395px, 8px)",
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
    <Image src={municipalityLogo} style={styles.municipalityLogo} />
  </View>
);
