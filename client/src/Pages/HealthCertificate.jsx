import UserForm from "../components/UserForm";

function HealthCertificate({
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
}) {
  return (
    <div className="min-h-screen bg-[#ECEFF3]" dir="rtl">
      <div className="max-w-[80%] mx-auto bg-white rounded-lg shadow-md p-10 mt-10">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <UserForm
          qrCodeUrl={qrCodeUrl}
          userId={userId}
          imgLink={imgLink}
          initialData={userData}
          onSubmit={handleSubmit}
          submitted={submitted}
          isReadOnly={isReadOnly}
          isLoading={isLoading}
          userLink={userLink}
        />
      </div>
    </div>
  );
}

export default HealthCertificate;
