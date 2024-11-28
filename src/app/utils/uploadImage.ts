import DataURIParser from 'datauri/parser';
import fileUpload from 'express-fileupload';
import cloudinary from '../config/cloudinary.config';
import path from 'path';
import AppError from '../error/AppError';
import httpStatus from 'http-status';


export const uploadImage = async (file: fileUpload.FileArray) => {
  const parser = new DataURIParser();

  try {
    const fileInfos = Object.values(file) as fileUpload.UploadedFile[];
    const fileAsync = fileInfos.map(async (file) => {
      const file64 = parser.format(
        path.extname(file.name).toString(),
        file.data,
      ).content as string;
      const uploadResponse = await cloudinary.uploader.upload(file64, {
        upload_preset: 'kiq7tq73',
        folder: 'car-washing',
      });
      return uploadResponse;
    });

    const uploadPromise = await Promise.all(fileAsync);
    const data = uploadPromise.map((image) => image.public_id);
    return data;
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST , "somethin happen occured in filed upload or cloudinary imae upload")
  }
};

export async function uploadImageByUrls(imageUrls: string[]): Promise<string[]> {
  if (!Array.isArray(imageUrls) || !imageUrls.every((url) => typeof url === "string")) {
    throw new Error("imageUrls must be an array of strings");
  }

  try {
    const uploadResults = await Promise.all(
      imageUrls.map((imageUrl) =>
        cloudinary.uploader.upload(imageUrl, {
          folder: "uploads", // Optional: Specify a folder in Cloudinary
        })
      )
    );

    return uploadResults.map((result) => result.secure_url,
    );
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Image upload failed"
    );
  }
}



export const cloudinaryController = {
  uploadImage,
};
