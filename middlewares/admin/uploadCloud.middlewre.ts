import { Request, Response, NextFunction } from "express";
import  { v2 as cloudinary} from "cloudinary";
import streamifier from "streamifier";
import dotenv from 'dotenv'
dotenv.config()

//Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});
//End Cloudinary

let streamUpload = (buffer: any) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

const uploadToCloudinary = async (buffer: any) => {
  let result: any = await streamUpload(buffer);   
  return result.secure_url;
} //Tạo một trường req.file.fieldname trong req.body có giá trị result.secure_url để trong controller luu vào database

export const uploadSingle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {//Hàm Upload lên cloudinary
    if (req.file) {
      const link = await uploadToCloudinary(req.file.buffer);
      req.body[req.file.fieldname] = link; //req.file.fieldname để linh động thay cho req.body.thumbnail vì khi upload có thể là thumbnail hoặc image
    }
    
    next();
}