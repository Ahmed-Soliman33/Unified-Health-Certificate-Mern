import QRCode from "qrcode";

const QRCodeGenerator = ({ link, setQrCodeUrl }) => {
  if (link) {
    QRCode.toDataURL(link, {
      width: 490, // Full size
      margin: 2, // REMOVE white border
      color: {
        dark: "#000000", // Foreground color
        light: "#fff", // Background color (light blue)
      },
    })
      .then((url) => {
        setQrCodeUrl(url);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return null;
};

export default QRCodeGenerator;
