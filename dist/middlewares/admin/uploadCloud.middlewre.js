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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFields = exports.uploadSingle = void 0;
const uploadToCloudianry_1 = require("../../helpers/uploadToCloudianry");
const uploadSingle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        const link = yield (0, uploadToCloudianry_1.uploadToCloudinary)(req.file.buffer, req.file.mimetype);
        req.body[req.file.fieldname] = link;
    }
    next();
});
exports.uploadSingle = uploadSingle;
const uploadFields = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    for (const key in files) {
        const array = files[key];
        for (const item of array) {
            try {
                let file = item;
                const result = yield (0, uploadToCloudianry_1.uploadToCloudinary)(file.buffer, file.mimetype);
                const field = file.mimetype === 'image/jpeg' ? 'avatar' : 'audio';
                req.body[field] = result;
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    next();
});
exports.uploadFields = uploadFields;
