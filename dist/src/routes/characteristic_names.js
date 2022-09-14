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
const Characteristic_1 = __importDefault(require("../models/Characteristic"));
const CharacteristicName_1 = __importDefault(require("../models/CharacteristicName"));
const models_1 = __importDefault(require("../models"));
const router = express_1.default.Router();
const getAllCharacteristicNames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const characteristic_names = yield CharacteristicName_1.default
            .query();
        return res.send(characteristic_names);
    }
    catch (err) {
        console.log(err);
        // Internal Server Error
        return res.sendStatus(500);
    }
});
router.get('/', getAllCharacteristicNames);
const getCharacteristicNamesParametrized = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { selectedSubcategoryName, selectedCategoryName } = req.query;
        if (!selectedCategoryName)
            return res.send("no categories");
        const characteristic_names = yield CharacteristicName_1.default
            .query()
            .innerJoin('subcategories', 'subcategories.id', 'characteristic_names.for_subcategory_id')
            .innerJoin('categories', 'categories.id', 'subcategories.category_id')
            .withGraphFetched('characteristics(onlyUniqueValues, defaultSelects)')
            .skipUndefined()
            .where("categories.name", selectedCategoryName)
            .skipUndefined()
            .where("subcategories.name", selectedSubcategoryName)
            .withGraphFetched('characteristics(onlyUniqueValues, defaultSelects)');
        return res.send(characteristic_names);
    }
    catch (err) {
        console.log(err);
        // Internal Server Error
        return res.sendStatus(500);
    }
});
router.get('/parameterized/', getCharacteristicNamesParametrized);
const getCharacteristicNamesBySubcategoryId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const characteristic_names = yield CharacteristicName_1.default
            .query()
            .where('for_subcategory_id', id)
            .withGraphFetched('characteristics(onlyUniqueValues, defaultSelects)');
        return res.send(characteristic_names);
    }
    catch (err) {
        console.log(err);
        // Internal Server Error
        return res.sendStatus(500);
    }
});
router.get('/by-subcategory-id/:id', getCharacteristicNamesBySubcategoryId);
const getCharacteristicNameById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const characteristic_name = yield CharacteristicName_1.default
            .query()
            .findById(req.params.id);
        return res.send(characteristic_name);
    }
    catch (err) {
        console.log(err);
        // Internal Server Error
        return res.sendStatus(500);
    }
});
router.get('/:id', getCharacteristicNameById);
const postCharacteristicName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const characteristic_name = yield CharacteristicName_1.default.query()
            .insert(req.body);
        if (characteristic_name) {
            const subcategory_id = characteristic_name.for_subcategory_id;
            const products = yield models_1.default.query()
                .where("subcategory_id", subcategory_id)
                .orderBy("id", "DESC");
            const characteristics = products
                .map((product) => {
                return {
                    characteristic_name_id: characteristic_name.id,
                    product_id: product.id,
                    value: ""
                };
            });
            yield Characteristic_1.default.query()
                .insertGraph(characteristics);
            return res.send(characteristic_name);
        }
        else
            res.sendStatus(400);
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
});
router.post('/', postCharacteristicName);
router.patch('/:id', patchController_1.default);
router.delete('/:id', deleteController_1.default);
module.exports = router;
//# sourceMappingURL=characteristic_names.js.map