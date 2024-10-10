import { Request, Response } from "express"
import Song from "../../models/song.model"
import Singer from "../../models/singer.model"
import { convertToSlug } from "../../helpers/convertToSlug";

// [GET] /search/:type
export const result = async (req: Request, res: Response) => {
    const type: string = req.params.type;

    const keyword: string = `${req.query.keyword}`;

    if(keyword) {
        const keywordRegex = new RegExp(keyword, 'i');

        //Tạo slug không dấu có dấu trừ ngăn cách
        const slug = convertToSlug(keyword);
        const slugRegex = new RegExp(slug, 'i');

        const songs = await Song.find({
            $or: [
                { title: keywordRegex },
                { slug: slugRegex }
            ],
            deleted: false
        })

        for (const song of songs) {
            const infoSinger = await Singer.findOne({
                _id: song.singerId
            })

            song["infoSinger"] = infoSinger
        }

        switch (type) {
            case "result":
                res.render('client/pages/search/result.pug', {
                    pageTitle: `Kết quả: ${keyword}`,
                    keyword: keyword,
                    songs: songs ?? []
                })
                break;
        
            case "suggest":
                res.json({
                    code: 200,
                    message: "Thành công",
                    songs: songs ?? []
                })

                break;
            default:
                res.json({
                    code: 400,
                    message: "Failed"
                })
                break;
        }
    } else {
        res.redirect('back')
    }
}