"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = exports.favorite = exports.like = exports.detail = exports.songs = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const favorite_song_model_1 = __importDefault(require("../../models/favorite-song.model"));
const songs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topic = yield topic_model_1.default.findOne({
            slug: req.params.slugTopic,
            status: "active",
            deleted: false,
        });
        const songs = yield song_model_1.default.find({
            topicId: topic === null || topic === void 0 ? void 0 : topic.id,
            deleted: false,
            status: "active",
        }).select('avatar title slug singerId like');
        for (const song of songs) {
            const infoSinger = yield singer_model_1.default.findOne({
                _id: song.singerId,
                deleted: false,
                status: "active",
            });
            song.infoSinger = infoSinger;
        }
        res.render("client/pages/songs/list.pug", {
            pageTitle: topic === null || topic === void 0 ? void 0 : topic.title,
            songs: songs,
        });
    }
    catch (error) {
        res.redirect("/topics");
    }
});
exports.songs = songs;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slugSong = req.params.slugSong;
        const song = yield song_model_1.default.findOne({
            slug: slugSong,
            deleted: false,
            status: "active",
        });
        if (song && song != null && song != undefined) {
            const singer = yield singer_model_1.default.findOne({
                _id: song.singerId,
                deleted: false,
            }).select('fullName');
            const topic = yield topic_model_1.default.findOne({
                _id: song.topicId,
                deleted: false,
            }).select('title');
            let favorite = false;
            const favoriteSong = yield favorite_song_model_1.default.findOne({
                songId: song.id
            });
            if (favoriteSong) {
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
    }
    catch (error) {
        res.redirect("back");
    }
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const typeLike = req.params.typeLike;
    const song = yield song_model_1.default.findOne({
        _id: idSong,
        status: "active",
        deleted: false
    });
    if (song && song.like !== null && song.like !== undefined) {
        const newLike = typeLike == 'yes' ? song.like + 1 : song.like - 1;
        yield song_model_1.default.updateOne({
            _id: idSong
        }, {
            like: newLike
        });
        res.json({
            code: 200,
            message: "Success",
            like: newLike
        });
    }
    else {
        res.json({
            code: 400,
            message: "fail"
        });
    }
});
exports.like = like;
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const type = req.params.type;
    switch (type) {
        case "favorite":
            const exitFavorite = yield favorite_song_model_1.default.findOne({
                songId: idSong,
            });
            if (!exitFavorite) {
                const favorite = new favorite_song_model_1.default({
                    songId: idSong
                });
                yield favorite.save();
            }
            res.json({
                code: 200,
                message: "Success"
            });
            break;
        case "unfavorite":
            yield favorite_song_model_1.default.deleteOne({
                songId: idSong
            });
            res.json({
                code: 200,
                message: "Success"
            });
            break;
        default:
            res.json({
                code: 400,
                message: "fail"
            });
            break;
    }
});
exports.favorite = favorite;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const song = yield song_model_1.default.findOne({
        _id: idSong
    });
    if (song && song.like !== null && song.like !== undefined) {
        const listen = song.listen + 1;
        yield song_model_1.default.updateOne({
            _id: idSong
        }, {
            listen: listen
        });
        const newSong = yield song_model_1.default.findOne({ _id: idSong });
        res.json({
            code: 200,
            message: "Success",
            newListen: newSong === null || newSong === void 0 ? void 0 : newSong.listen
        });
    }
    else {
        res.json({
            code: 400,
            message: "fail"
        });
    }
});
exports.listen = listen;
