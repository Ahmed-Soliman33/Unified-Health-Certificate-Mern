import { View, Text, StyleSheet, Image, Link } from "@react-pdf/renderer";
import moment from "moment-hijri";

const styles = StyleSheet.create({
  name: {
    fontSize: 24,
    color: "#07706D",
    direction: "rtl",
    paddingRight: 20,
    paddingTop: 15,
    fontFamily: "jannalt",
    fontWeight: "bold",
  },
  infoRow: {
    flexDirection: "column",
  },
  rowsContainer: {
    flexDirection: "row",
    marginTop: -5,
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
    paddingTop: 4,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    gap: 13,
    fontSize: "13px",
  },
  rightContent: {
    flex: 0.5,
    flexDirection: "column",
    paddingLeft: 10,
  },
  leftContent: {
    flex: 0.5,
    flexDirection: "column",
    paddingLeft: 10,
  },

  label: {
    color: "#333",
    fontFamily: "jannalt",
    fontWeight: "bold",
    direction: "rtl",
  },
  value: {
    paddingRight: 10,
    fontFamily: "jannalt",
    fontWeight: "bold",
    direction: "rtl",
    color: "#222",
    backgroundColor: "#fff",
    height: "30px",
  },
  userImage: {
    width: 125,
    height: 125,
    padding: 3,
    border: "1px solid #85BD48",
    backgroundColor: "#FFF",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  photoText: {
    fontSize: 10,
    color: "#555",
    fontFamily: "jannalt",
    fontWeight: "bold",
  },
  qrCode: {
    width: 125,
    height: 120,
    padding: 3,
    border: "1px solid #85BD48",
    backgroundColor: "#FFF",
  },
});

export const PersonalInfoSection = ({ qrCodeUrl, imgLink, formData }) => (
  <View style={styles.rowsContainer}>
    <View style={styles.leftCol}>
      <Image src={imgLink} style={styles.userImage} />

      <Image src={qrCodeUrl} style={styles.qrCode} />
    </View>
    <View style={styles.rightCol}>
      <Text style={styles.name}>{formData.name}</Text>

      <View style={styles.content}>
        <View style={styles.leftContent}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>الجنسية</Text>
            <Text style={styles.value}>{formData.nationality}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>المهنة</Text>
            <Text style={styles.value}>{formData.profession}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>تاريخ نهاية الشهادة الصحية</Text>
            <Text style={styles.value}>
              {moment(formData.healthCertificateExpiresAt).format(
                "iYYYY/iMM/iDD"
              )}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>تاريخ انتهاء البرنامج التثقيفي</Text>
            <Text style={styles.value}>
              {moment(formData.educationalProgramExpiresAt).format(
                "iYYYY/iMM/iDD"
              )}
            </Text>
          </View>
        </View>
        <View style={styles.rightContent}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>رقم الهوية</Text>
            <Text style={styles.value}>{formData.idNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>رقم الشهادة الصحية</Text>
            <Text style={styles.value}>{formData.healthCertificateNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>تاريخ إصدار الشهادة الصحية</Text>
            <Text style={styles.value}>
              {moment(formData.healthCertificateIssuedAt).format(
                "iYYYY/iMM/iDD"
              )}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>نوع البرنامج التثقيفي</Text>
            <Text style={styles.value}>{formData.educationalProgramType}</Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);
