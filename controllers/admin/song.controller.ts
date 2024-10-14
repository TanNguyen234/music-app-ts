import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import Topic from "../../models/topic.model";
import { systemConfig } from "../../config/config";

// [GET] /admin/songs/
export const index = async (req: Request, res: Response) => {
  const songs = await Song.find({
    deleted: false,
  });

  res.render("admin/pages/songs/index.pug", {
    pageTitle: "Quản lý bài hát",
    songs: songs.reverse(),
  });
};

// [GET] /admin/songs/create
export const create = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false,
    status: "active",
  }).select("title");

  const singers = await Singer.find({
    deleted: false,
    status: "active",
  }).select("fullName");

  res.render("admin/pages/songs/create.pug", {
    pageTitle: "Thêm mới bài hát",
    topics: topics,
    singers: singers,
  });
};

interface Song {
  title: string;
  topicId?: string;
  singerId?: string;
  description?: string;
  status: string;
  avatar?: string;
  audio?: string;
  lyrics?: string;
}

// [POST] /admin/songs/create
export const createPost = async (req: Request, res: Response) => {
  //Nhớ thêm validate cho title
  const dataSong: Song = {
    title: req.body.title,
    topicId: req.body.topicId,
    singerId: req.body.singerId,
    description: req.body.description,
    status: req.body.status,
    avatar: req.body.avatar || "",
    audio: req.body.audio || "",
    lyrics: req.body.lyrics || "",
  };

  const song = new Song(dataSong);
  await song.save();

  res.redirect(`/${systemConfig.prefixAmin}/songs`);
};

// [GET] /admin/songs/edit/:id
export const edit = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const song = await Song.findOne({
    _id: id,
    deleted: false,
  });

  const topics = await Topic.find({
    deleted: false,
  }).select("title");

  const singers = await Singer.find({
    deleted: false,
  }).select("fullName");

  res.render("admin/pages/songs/edit.pug", {
    pageTitle: "Chỉnh sửa bài hát",
    song: song,
    topics: topics,
    singers: singers,
  });
};

// [PATCH] /admin/songs/edit/:id
export const editPatch = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  //Nhớ thêm validate cho title
  const dataSong: Song = {
    title: req.body.title,
    topicId: req.body.topicId,
    singerId: req.body.singerId,
    description: req.body.description,
    status: req.body.status,
    lyrics: req.body.lyrics || "",
  };

  if (req.body.avatar) {
    dataSong.avatar = req.body.avatar;
  }

  if (req.body.audio) {
    dataSong.audio = req.body.audio;
  }

  await Song.updateOne(
    {
      _id: id,
    },
    dataSong
  );

  res.redirect("back");
};
