"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("@config/multer"));
const file_1 = require("@helpers/file");
const uploads = multer_1.default(multer_2.default);
const router = express_1.Router();
router.post('/', uploads.single('image'), async (req, res) => {
    const filename = req.file?.filename;
    console.log(filename, 'hola', req.body);
    const archivo = await file_1.insertArchivos({
        id_archivo: req.file?.filename,
        nombre: req.file?.originalname,
        id_usuario: req.body.id
    });
    res.status(200).json({ status: 200, usuario: archivo, message: 'archivo recibido' });
});
exports.default = router;
//# sourceMappingURL=files.js.map