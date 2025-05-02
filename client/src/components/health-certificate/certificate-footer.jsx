import { View, Text, StyleSheet, Image } from "@react-pdf/renderer";
import pdf_footer from "@/assets/pdf_footer.png";
const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 10,
    marginTop: -4,
  },
});

export const CertificateFooter = () => (
  <View style={styles.footer}>
    <Image src={pdf_footer} />
  </View>
);
