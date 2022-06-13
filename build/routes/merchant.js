"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const callback_1 = __importDefault(require("../controllers/callback"));
const router = express_1.default.Router();
router.get('/receiver', callback_1.default.merchantReceiver);
module.exports = router;
