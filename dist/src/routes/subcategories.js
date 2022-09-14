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
const Categoty_1 = __importDefault(require("../models/Categoty"));
const Subcategory_1 = __importDefault(require("../models/Subcategory"));
const router = express_1.default.Router();
const getAllSubcategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subcategories = yield Subcategory_1.default.query();
        // .withGraphFetched("category")
        return res.send(subcategories);
    }
    catch (err) {
        console.log(err);
        // Internal Server Error
        return res.sendStatus(500);
    }
});
router.get('/', getAllSubcategories);
const getSubcategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subcategory = yield Subcategory_1.default.query()
            .findById(req.params.id)
            .withGraphFetched("category");
        return res.send(subcategory);
    }
    catch (err) {
        console.log(err);
        // Internal Server Error
        return res.sendStatus(500);
    }
});
router.get('/:id', getSubcategoryById);
const getSubcategoryByCategoryId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const subcategories = yield Categoty_1.default
            .relatedQuery('subcategories')
            .for(id);
        // .withGraphFetched("category")
        return res.send(subcategories);
    }
    catch (err) {
        console.log(err);
        // Internal Server Error
        return res.sendStatus(500);
    }
});
router.get('/by-category-id/:id', getSubcategoryByCategoryId);
router.post('/', postController_1.default);
router.patch('/:id', patchController_1.default);
router.delete('/:id', deleteController_1.default);
module.exports = router;
//# sourceMappingURL=subcategories.js.map