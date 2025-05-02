import HealthCertificate from "./Pages/HealthCertificate";
import Header from "./components/header/Header";
import QRCodeGenerator from "./components/QRCodeGenerator";
import { useEffect, useState } from "react";
import { fetchUser, createUser } from "./services/api";
import UserInquiry from "./components/UserInquiry";
import Modal from "./components/ui/Modal";
import { Button } from "./components/ui/button";

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [userId, setUserId] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [userLink, setUserLink] = useState("");
  const [userData, setUserData] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await createUser(formData);
      setUserId(response.data.doc.idNumber);
      setImgLink(response.data?.doc?.imageLink);
      setUserLink(response.link);
      setSubmitted(true);
      QRCodeGenerator({
        link: response.link,
        setQrCodeUrl,
      });
      alert(`تم حفظ البيانات بنجاح!`);
    } catch (err) {
      setError(err.message);
      setSubmitted(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchUser = async (id) => {
    if (!id) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetchUser(id);
      setUserData(response);
      setIsReadOnly(true);
      setSubmitted(true);
      setImgLink(response.data?.doc?.imageLink);
      setUserLink(response.link);
      QRCodeGenerator({
        link: response.link,
        setQrCodeUrl,
      });
    } catch (err) {
      setError(
        "لم يتم العثور على مستخدم يحمل نفس رقم الهوية. يرجى التحقق من تسجيل البيانات."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const link = window.location.pathname;
  useEffect(() => {
    const userId = link.split("/")[1];
    if (userId) {
      setUserId(userId);
      handleFetchUser(userId);
    }
  }, [link]);

  return (
    <>
      <Header />
      <main>
        {!userData && (
          <div className="flex items-center justify-center pt-20 bg-[#ECEFF3]">
            <Button onClick={() => setIsModalOpen(true)}>
              فتح نافذة الاستعلام
            </Button>

            <Modal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
              <UserInquiry
                userLink={userLink}
                setIsModalOpen={setIsModalOpen}
                handleFetchUser={handleFetchUser}
              />
            </Modal>
          </div>
        )}
        <HealthCertificate
          {...{
            userId,
            imgLink,
            userData,
            handleSubmit,
            submitted,
            isReadOnly,
            isLoading,
            error,
            qrCodeUrl,
            userLink,
          }}
        />
      </main>
    </>
  );
}

export default App;
