import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select } from "./ui/select";
import { Camera } from "lucide-react";
import moment from "moment-hijri";
import FormToPDF from "./health-certificate/FormToPDF";

const municipalityOptions = [
  "القصيم",
  "جدة",
  "تبوك",
  "المدينة المنورة",
  "الدمام",
  "جازان",
  "نجران",
  "الاحساء",
  "الرياض",
  "الباحه",
  "الشرقية",
  "حفر الباطن",
  "مكه",
  "الطائف",
  "حائل",
  "ابها",
];

const UserForm = ({
  qrCodeUrl,
  submitted,
  initialData,
  onSubmit,
  isLoading,
  imgLink,
  userLink,
}) => {
  const isReadOnly = !!initialData;
  const [formData, setFormData] = useState({
    name: "",
    municipality: "",
    secretariat: "",
    healthCertificateIssuedAt: "",
    healthCertificateExpiresAt: "",
    healthCertificateNumber: "",
    nationality: "",
    idNumber: "",
    sex: "",
    profession: "",
    educationalProgramType: "",
    educationalProgramExpiresAt: "",
    licenseNumber: "",
    establishmentName: "",
    establishmentNumber: "",
    photo: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      const formattedData = {
        ...formData,
        name: initialData.data.doc.name || "",
        municipality: initialData.data.doc.municipality || "",
        secretariat: initialData.data.doc.secretariat || "",
        healthCertificateIssuedAt:
          formatDateForInput(initialData.data.doc.healthCertificateIssuedAt) ||
          "",
        healthCertificateExpiresAt:
          formatDateForInput(initialData.data.doc.healthCertificateExpiresAt) ||
          "",
        healthCertificateNumber:
          initialData.data.doc.healthCertificateNumber || "",
        nationality: initialData.data.doc.nationality || "",
        idNumber: initialData.data.doc.idNumber || "",
        sex: initialData.data.doc.sex || "",
        profession: initialData.data.doc.profession || "",
        educationalProgramType:
          initialData.data.doc.educationalProgramType || "",
        educationalProgramExpiresAt:
          formatDateForInput(
            initialData.data.doc.educationalProgramExpiresAt
          ) || "",
        licenseNumber: initialData.data.doc.licenseNumber || "",
        establishmentName: initialData.data.doc.establishmentName || "",
        establishmentNumber: initialData.data.doc.establishmentNumber || "",
        photo: initialData.data.doc.imageLink || null,
      };
      setFormData(formattedData);
      if (initialData.data.doc.imageLink)
        setPhotoPreview(initialData.data.doc.imageLink);
    }
  }, [initialData]);

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setFormData((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit && !isReadOnly) onSubmit(formData);
  };

  return (
    <div className="p-3">
      <form onSubmit={handleSubmit} className="space-y-6 print:text-black">
        <div className="text-center mb-6">
          <h1 className="text-[32px] font-bold mb-4 text-[#484E56]">
            الشهادة الصحية الموحدة
          </h1>
          <div className="flex justify-center mb-4">
            <div className="relative w-32 h-40 border-2 border-gray-300 overflow-hidden">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="صورة شخصية"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full bg-gray-50">
                  <Camera className="w-10 h-10 text-gray-400 mb-2" />
                  <span>صورة شخصية</span>
                </div>
              )}
              {!isReadOnly && (
                <>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-0 left-0 right-0 top-0 bg-opacity-50 text-white py-1 text-xs"
                  />
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Right Column */}
          <div className="space-y-4">
            <div className="bg-gray-50 p-3 rounded">
              <Label>الأمانة</Label>
              <Select
                className="font-[jannaltregular] font-light"
                name="municipality"
                value={formData.municipality}
                onChange={handleChange}
                disabled={isReadOnly}
                required={!isReadOnly}
              >
                <option className="font-[jannaltregular]" disabled value="">
                  اختر الأمانة
                </option>
                {municipalityOptions.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <Label>الاسم</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                readOnly={isReadOnly}
                required={!isReadOnly}
              />
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <Label>الجنس</Label>
              {isReadOnly ? (
                <div className="font-[jannaltregular] font-light text-[#484E56] rounded-md border border-gray-300 p-2">
                  {formData.sex}
                </div>
              ) : (
                <Select
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  required={!isReadOnly}
                >
                  <option disabled value="">
                    اختر الجنس
                  </option>
                  <option value="ذكر">ذكر</option>
                  <option value="أنثي">أنثي</option>
                </Select>
              )}
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <Label>رقم الشهادة الصحية</Label>
              <Input
                type="number"
                min={0}
                name="healthCertificateNumber"
                value={formData.healthCertificateNumber}
                onChange={handleChange}
                readOnly={isReadOnly}
              />
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <Label>تاريخ إصدار الشهادة الصحية هجري</Label>
              {formData.healthCertificateIssuedAt ? (
                <Input
                  value={moment(formData.healthCertificateIssuedAt).format(
                    "iYYYY/iMM/iDD"
                  )}
                  disabled
                  readOnly
                />
              ) : (
                <div className="font-[jannaltregular]  font-light text-[#484E56] rounded-md border border-gray-300 p-2">
                  تُكمِّل تلقائيًّا
                </div>
              )}
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <Label>تاريخ نهاية الشهادة الصحية هجري</Label>
              {formData.healthCertificateExpiresAt ? (
                <Input
                  value={moment(formData.healthCertificateExpiresAt).format(
                    "iYYYY/iMM/iDD"
                  )}
                  disabled
                  readOnly
                />
              ) : (
                <div className="font-[jannaltregular] font-light rounded-md border border-gray-300 p-2 text-[#484E56]">
                  تُكمِّل تلقائيًّا
                </div>
              )}
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <Label>نوع البرنامج التثقيفي</Label>
              <Input
                name="educationalProgramType"
                value={formData.educationalProgramType}
                onChange={handleChange}
                readOnly={isReadOnly}
              />
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <Label>رقم الرخصة</Label>
              <Input
                type="number"
                min={0}
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                readOnly={isReadOnly}
              />
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <Label>رقم المنشأة</Label>
              <Input
                type="number"
                min={0}
                name="establishmentNumber"
                value={formData.establishmentNumber}
                onChange={handleChange}
                readOnly={isReadOnly}
              />
            </div>
          </div>

          {/* Left Column */}
          <div className="space-y-4">
            <div className="bg-gray-50 p-3 rounded">
              <Label>البلدية</Label>
              <Input
                name="secretariat"
                value={formData.secretariat}
                onChange={handleChange}
                readOnly={isReadOnly}
                required={!isReadOnly}
              />
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <Label>رقم الهوية</Label>
              <Input
                type="number"
                min={0}
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                readOnly={isReadOnly}
                required={!isReadOnly}
              />
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <Label>الجنسية</Label>
              <Input
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                readOnly={isReadOnly}
                required={!isReadOnly}
              />
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <Label>المهنة</Label>
              <Input
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                readOnly={isReadOnly}
              />
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <Label>تاريخ إصدار الشهادة الصحية ميلادي</Label>
              {isReadOnly ? (
                <div className="rounded-md border border-gray-300 p-2 font-[jannaltregular] font-light text-[#484E56]">
                  {formData.healthCertificateIssuedAt}
                </div>
              ) : (
                <Input
                  type="date"
                  name="healthCertificateIssuedAt"
                  value={formData.healthCertificateIssuedAt}
                  onChange={handleChange}
                  required={!isReadOnly}
                />
              )}
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <Label>تاريخ نهاية الشهادة الصحية ميلادي</Label>
              {isReadOnly ? (
                <div className="font-[jannaltregular] rounded-md border border-gray-300 p-2 font-light text-[#484E56]">
                  {formData.healthCertificateExpiresAt}
                </div>
              ) : (
                <Input
                  type="date"
                  name="healthCertificateExpiresAt"
                  value={formData.healthCertificateExpiresAt}
                  onChange={handleChange}
                  required={!isReadOnly}
                />
              )}
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <Label>تاريخ انتهاء البرنامج التثقيفي</Label>
              {isReadOnly ? (
                <div className="font-[jannaltregular] rounded-md border border-gray-300 p-2 font-light text-[#484E56]">
                  {formData.educationalProgramExpiresAt}
                </div>
              ) : (
                <Input
                  type="date"
                  name="educationalProgramExpiresAt"
                  value={formData.educationalProgramExpiresAt}
                  onChange={handleChange}
                />
              )}
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <Label>اسم المنشأة</Label>
              <Input
                name="establishmentName"
                value={formData.establishmentName}
                onChange={handleChange}
                readOnly={isReadOnly}
              />
            </div>
          </div>
        </div>
        {!isReadOnly && (
          <div className="flex justify-center mt-8">
            <Button
              type="submit"
              disabled={isLoading}
              className="px-8 text-[17px] cursor-pointer"
            >
              {isLoading ? "جاري الحفظ..." : "حفظ البيانات"}
            </Button>
          </div>
        )}
      </form>
      <FormToPDF
        userLink={userLink}
        qrCodeUrl={qrCodeUrl}
        formData={formData}
        imgLink={imgLink}
        submitted={submitted}
        municipality={formData.municipality}
      />
    </div>
  );
};

export default UserForm;
