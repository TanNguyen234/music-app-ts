import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

// [GET] /songs/:slugTopic
export const songs = async (req: Request, res: Response) => {
  try {
    const topic = await Topic.findOne({
      slug: req.params.slugTopic,
      status: "active",
      deleted: false,
    });

    const songs = await Song.find({
      topicId: topic?.id,
      deleted: false,
      status: "active",
    }).select('avatar title slug singerId like');

      for (const song of songs) {
        const infoSinger = await Singer.findOne({
            _id: song.singerId,
            deleted: false,
            status: "active",
        })

        song.infoSinger = infoSinger;
    }

    res.render("client/pages/songs/list.pug", {
      pageTitle: topic?.title,
      songs: songs,
    });
  } catch (error) {
    res.redirect("/topics");
  }
};

// [GET] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
  try {
    const slugSong: string = req.params.slugSong;

    const song = await Song.findOne({
      slug: slugSong,
      deleted: false,
      status: "active",
    })

    const singer = await Singer.findOne({
      _id: song?.singerId,
      deleted: false,
    }).select('fullName')

    const topic = await Topic.findOne({
      _id: song?.topicId,
      deleted: false,
    }).select('title')

    res.render("client/pages/songs/detail.pug", {
      pageTitle: "Trang chi tiết bài hát",
      song: song,
      singer: singer,
      topic: topic
    });
  } catch (error) {
    res.redirect("back");
  }
};

//[PATCH] /songs/:typeLike/:idSong (API)
export const like = async (req: Request, res: Response) => {
  const idSong: string = req.params.idSong;
  const typeLike: string = req.params.typeLike
  
  const song = await Song.findOne({
    _id: idSong,
    status: "active",
    deleted: false
  })

  if(song && song.like !== null && song.like !== undefined) {
    const newLike: number = typeLike == 'yes' ? song.like + 1 : song.like - 1

    await Song.updateOne({
      _id: idSong
    }, {
      like: newLike
    })

    res.json({
      code: 200,
      message: "Success",
      like: newLike
    })
  } else {
    res.json({
      code: 400,
      message: false
    })
  }
}