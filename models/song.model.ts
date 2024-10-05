import mongoose from 'mongoose'

const songSchema = new mongoose.Schema({//Thiết lập schema
  title: String,
  avatar: String,
  description: String,
  status: String,
  singerId: String,
  infoSinger: Object,
  topicId: String,
  like: Number,
  lyrics: String,
  audio: String,
  slug: String,
  deleted: {
    type: Boolean,
    default: false
  },
  deleteAt: Date
}, {timestamps: true});//Hàm mongoose nếu giá trị là true thì nó sẽ tự động lưu lại [ngày tạo] và khi uppdate nó cg tự động lưu [ngày updata]

const Song = mongoose.model("Song", songSchema, "songs"); //Kết nối tới collection có tên products

export default Song;