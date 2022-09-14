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
const express_1 = __importDefault(require("express"));
const deleteController_1 = __importDefault(require("../controllers/deleteController"));
const patchController_1 = __importDefault(require("../controllers/patchController"));
const postController_1 = __importDefault(require("../controllers/postController"));
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const Favorite_1 = __importDefault(require("../models/Favorite"));
const router = express_1.default.Router();
const getAllFavorites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const favorites = yield Favorite_1.default.query();
        return res.send(favorites);
    }
    catch (err) {
        console.log(err);
        // Internal Server Error
        return res.sendStatus(500);
    }
});
router.get('/', getAllFavorites);
const toggleFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id, user_id } = req.body;
        const fav = yield Favorite_1.default.query()
            .findOne({ product_id, user_id });
        if (!fav) {
            yield Favorite_1.default.query()
                .insert({
                product_id,
                user_id
            });
        }
        else {
            yield Favorite_1.default.query()
                .deleteById(fav.id);
        }
        return res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});
router.post('/toggle', verifyToken_1.default, toggleFavorite);
const getFavoritesForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.query;
        const favorites = yield Favorite_1.default.query()
            .withGraphFetched("product")
            .where({ user_id: user_id });
        const products = favorites.map((fav) => fav.product);
        return res.send(products);
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});
router.get('/for-user', verifyToken_1.default, getFavoritesForUser);
const getFavoriteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const favorite = yield Favorite_1.default
            .query()
            .findById(req.params.id);
        return res.send(favorite);
    }
    catch (err) {
        console.log(err);
        // Internal Server Error
        return res.sendStatus(500);
    }
});
router.get('/:id', getFavoriteById);
router.post('/', postController_1.default);
router.patch('/:id', patchController_1.default);
router.delete('/:id', deleteController_1.default);
module.exports = router;
//# sourceMappingURL=favorites.js.map