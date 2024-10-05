import mongoose from 'mongoose';

const singerSchema = new mongoose.Schema({//Thiết lập schema
  fullName: String,
  avatar: String,
  status: String,
  slug: String,
  deleted: {
    type: Boolean,
    default: false
  },
  deleteAt: Date
}, {timestamps: true});//Hàm mongoose nếu giá trị là true thì nó sẽ tự động lưu lại [ngày tạo] và khi uppdate nó cg tự động lưu [ngày updata]

const Singer = mongoose.model("Singer", singerSchema, "singers"); //Kết nối tới collection có tên products

export default Singer;