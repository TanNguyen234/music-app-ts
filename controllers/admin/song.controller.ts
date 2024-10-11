import { Request, Response } from "express"
import Song from "../../models/song.model"
import Singer from "../../models/singer.model"
import Topic from "../../models/topic.model"

// [GET] /admin/songs/
export const index = async (req: Request, res: Response) => {
    const songs = await Song.find({
        deleted: false
    })

    res.render('admin/pages/songs/index.pug', {
        pageTitle: "Quản lý bài hat",
        songs: songs
    })
}

// [GET] /admin/songs/create
export const create = async (req: Request, res: Response) => {
 const topics = await Topic.find({
    deleted: false,
    status: "active"
 }).select("title")

 const singers = await Singer.find({
    deleted: false,
    status: "active"
 }).select("fullName")

 res.render('admin/pages/songs/create.pug', {
        pageTitle: "Thêm mới bài hát",
        topics: topics,
        singers: singers
    })
}