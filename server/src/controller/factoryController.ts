import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { Model, Document } from "mongoose";
import catchError from "../utils/catchError";
import { NextFunction, Request, RequestHandler, Response } from "express";
import AppError from "../utils/AppError";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup to store image in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload function to Cloudinary
const uploadToCloudinary = async (buffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "image" }, (error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url || "");
      })
      .end(buffer);
  });
};

// Create Entity (with optional photo)
export const createEntity = <T extends Document>(
  Model: Model<T>
): RequestHandler[] => [
  upload.single("photo"),
  catchError(
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      let imageUrl: string | undefined;

      if (req.file) {
        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "image/jpg",
          "image/webp",
        ];

        if (!allowedTypes.includes(req.file.mimetype)) {
          console.warn("🚫 File is not a valid image:", req.file.mimetype);
        } else {
          try {
            imageUrl = await uploadToCloudinary(req.file.buffer);
          } catch (err) {
            console.error("Cloudinary Error:", err);
            return next(new AppError("Error uploading image", 500));
          }
        }
      }

      if (!req.body.userData) {
        return next(new AppError("Missing userData field", 400));
      }

      let userData;
      try {
        userData = JSON.parse(req.body.userData);
      } catch (err) {
        return next(new AppError("Invalid JSON in userData", 400));
      }

      try {
        const doc = await Model.create({
          ...userData,
          imageLink: imageUrl,
        });

        res.status(200).json({
          data: {
            doc,
          },
          // @ts-ignore
          link: `${process.env.FRONT_LINK}${doc.idNumber}`,
        });
      } catch (err: any) {
        if (err.code === 11000 && err.keyPattern?.idNumber) {
          return res.status(409).json({
            status: "fail",
            message: "رقم الهوية مستخدم بالفعل",
          });
        }

        console.error("Database Error:", err);
        return res.status(500).json({
          status: "error",
          message: "حصل خطأ أثناء إنشاء البيانات، حاول مرة أخرى لاحقًا",
        });
      }
    }
  ),
];

// Get Entity by ID
export const getEntitiy = <T extends Document>(
  Model: Model<T>
): RequestHandler => {
  return catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { idNumber } = req.params;

    const doc = await Model.findOne({ idNumber });
    if (!doc) return next(new AppError("No document found with this ID", 404));

    console.log({ doc });
    res.status(200).json({
      data: { doc },
      // @ts-ignore
      link: `${process.env.FRONT_LINK}${doc.idNumber}`,
    });
  });
};
