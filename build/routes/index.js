"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_1 = __importDefault(require("./session"));
const files_1 = __importDefault(require("./files"));
const router = express_1.Router();
router.use('/file', files_1.default);
router.use('/users', session_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map