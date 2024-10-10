import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favorite-song.model";

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

    if(song && song != null && song != undefined) {
      const singer = await Singer.findOne({
        _id: song.singerId,
        deleted: false,
      }).select('fullName')
  
      const topic = await Topic.findOne({
        _id: song.topicId,
        deleted: false,
      }).select('title')  

      let favorite: boolean = false
  
      const favoriteSong = await FavoriteSong.findOne({
        // userId: '',
        songId: song.id
      })

      if(favoriteSong) {
        favorite = true;
      }

      res.render("client/pages/songs/detail.pug", {
        pageTitle: "Trang chi tiết bài hát",
        song: song,
        singer: singer,
        topic: topic,
        favorite: favorite
      });
    }
  } catch (error) {
    res.redirect("back");
  }
};

//[PATCH] /songs/like/:typeLike/:idSong (API)
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
      message: "fail"
    })
  }
}
//[PATCH] /songs/favorite/:type/:idSong (API)
export const favorite = async (req: Request, res: Response) => {
  const idSong: string = req.params.idSong;
  const type: string = req.params.type

    switch (type) {
      case "favorite":
        const exitFavorite = await FavoriteSong.findOne({
          songId: idSong,
        })

        if(!exitFavorite) {
          const favorite = new FavoriteSong({
            // userId: "",
            songId: idSong
          })
          
          await favorite.save()
        }

        res.json({
          code: 200,
          message: "Success"
        })
        break;
      case "unfavorite":
        await FavoriteSong.deleteOne({
          // userId: "",
          songId: idSong
        })

        res.json({
          code: 200,
          message: "Success"
        })

        break;
      default:
        res.json({
          code: 400,
          message: "fail"
        })

        break;
    }
}
//[PATCH] /songs/listen/:idSong
export const listen = async (req: Request, res: Response) => {
  const idSong: string = req.params.idSong;
  
  const song = await Song.findOne({
    _id: idSong
  })

  if(song && song.like !== null && song.like !== undefined) {
    const listen: number = song.listen + 1;

    await Song.updateOne({
      _id: idSong
    }, {
      listen: listen
    })

    const newSong = await Song.findOne({ _id: idSong})

    res.json({
      code: 200,
      message: "Success",
      newListen: newSong?.listen
    })
  } else {
    res.json({
      code: 400,
      message: "fail"
    })
  }
}