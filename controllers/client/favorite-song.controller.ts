import { Request, Response } from "express"
import FavoriteSong from "../../models/favorite-song.model"
import Song from "../../models/song.model"
import Singer from "../../models/singer.model"

// [GET] /favorite-songs/
export const index = async (req: Request, res: Response) => {
    var favoriteSongs = await FavoriteSong.find({
        // userId: '',
        deleted: false
    })

    for (let item of favoriteSongs) {
        const infoSong = await Song.findOne({
            _id: item.songId,
            deleted: false
        })

        const infoSinger = await Singer.findOne({
            _id: infoSong?.singerId,
        })

        item["infoSong"] = infoSong

        console.log(item)

        item["infoSinger"] = infoSinger
    }

    res.render('client/pages/favorite-songs/index.pug', {
        pageTitle: "Bài hát yêu thích",
        favoriteSongs: favoriteSongs
    })
}