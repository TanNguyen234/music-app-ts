import { Request, Response, NextFunction } from "express";
import { uploadToCloudinary } from "../../helpers/uploadToCloudianry";

export const uploadSingle = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  //Hàm Upload lên cloudinary
  if (req.file) {
    const link = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
    req.body[req.file.fieldname] = link; //req.file.fieldname để linh động thay cho req.body.thumbnail vì khi upload có thể là thumbnail hoặc image
  }

  next();
};

export const uploadFields = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Hàm Upload lên cloudinary
  const files = req.files as unknown as { [fieldname: string]: File[] }; //Sử dụng ep kiểu với unknown
    for (const key in files) {
      const array = files[key]
      for (const item of array) {
        try {
          let file: any = item;
          const result = await uploadToCloudinary(file.buffer, file.mimetype);
          const field: string = file.mimetype === 'image/jpeg' ? 'avatar' : 'audio'
          req.body[field] = result; //req.file.fieldname để linh động thay cho req.body.thumbnail vì khi upload có thể là thumbnail hoặc image
        } catch (error) {
          console.log(error);
        }
      }
    }
  next();
};
