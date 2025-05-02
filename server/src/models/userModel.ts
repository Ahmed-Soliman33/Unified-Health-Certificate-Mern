import { Document, model, Schema } from "mongoose";

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

export interface IUser extends Document {
  name: string;
  municipality: string;
  secretariat: string;
  imageLink: string;
  healthCertificateIssuedAt: Date;
  healthCertificateExpiresAt: Date;
  healthCertificateNumber: string;
  nationality: string;
  idNumber: string;
  sex: string;
  profession: string;
  educationalProgramType: string;
  educationalProgramExpiresAt: Date;
  licenseNumber: string;
  establishmentName: string;
  establishmentNumber: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, trim: true },
    imageLink: { type: String, trim: true },
    municipality: { type: String, enum: municipalityOptions, trim: true },
    secretariat: { type: String, trim: true },
    healthCertificateIssuedAt: { type: Date },
    healthCertificateExpiresAt: { type: Date },
    healthCertificateNumber: { type: String, trim: true },
    nationality: { type: String, trim: true },
    idNumber: { type: String, unique: true, trim: true },
    sex: { type: String, enum: ["أنثي", "ذكر"], trim: true },
    profession: { type: String, trim: true },
    educationalProgramType: { type: String, trim: true },
    educationalProgramExpiresAt: { type: Date },
    licenseNumber: { type: String, trim: true },
    establishmentName: { type: String, trim: true },
    establishmentNumber: { type: String, trim: true },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  // console.log(this.imageLink);

  console.log(this.idNumber);

  next();
});

export const User = model<IUser>("User", userSchema);
