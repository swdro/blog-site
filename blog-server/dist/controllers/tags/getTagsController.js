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
exports.getTagsController = void 0;
const tags_1 = require("../../model/tags");
function getTagsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tags = yield (0, tags_1.getTags)();
            res.send(tags);
        }
        catch (e) {
            console.log(e);
            res.status(500).send({
                error: "failed to get tags"
            });
        }
    });
}
exports.getTagsController = getTagsController;
