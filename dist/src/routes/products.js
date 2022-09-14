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
const Product_1 = __importDefault(require("../models/Product"));
const router = express_1.default.Router();
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default
            .query()
            .orderBy('id', "DESC");
        return res.send(products);
    }
    catch (err) {
        console.log(err);
        // Internal Server Error
        return res.sendStatus(500);
    }
});
router.get('/', getAllProducts);
const getProductsByQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { q } = req.query;
        const products = yield Product_1.default.query()
            .whereRaw(`name like '%${q}%'`);
        return res.send(products);
    }
    catch (err) {
        console.log(err);
        // Internal Server Error
        return res.sendStatus(500);
    }
});
router.get('/search', getProductsByQuery);
const getProductsParametrized = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { selectedCategoryName, selectedSubcategoryName, } = req.query;
        if (!selectedCategoryName || !selectedSubcategoryName) {
            return res.sendStatus(400);
        }
        const allProducts = yield Product_1.default.query()
            .select(['products.id', 'products.name', 'products.image_url'], Product_1.default.relatedQuery('favorites')
            .count()
            .as("number_of_favorites"), Product_1.default.relatedQuery('prices')
            .select('price')
            .orderBy('date', 'desc')
            .limit(1)
            .as('latest_price'))
            .withGraphFetched("[characteristics(defaultSelects).[characteristic_name], subcategory]")
            .innerJoin('subcategories', 'products.subcategory_id', 'subcategories.id')
            .innerJoin('categories', 'subcategories.category_id', 'categories.id')
            .where("categories.name", selectedCategoryName)
            .where("subcategories.name", selectedSubcategoryName);
        return res.send(allProducts);
    }
    catch (err) {
        console.log(err);
        // Internal Server Error
        return res.sendStatus(500);
    }
});
router.get('/explore', getProductsParametrized);
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default
            .query()
            .findById(req.params.id)
            .select('products.*', Product_1.default.relatedQuery('favorites')
            .count()
            .as("number_of_favorites"), Product_1.default.relatedQuery('prices')
            .select('price')
            .orderBy('date', 'desc')
            .limit(1)
            .as('latest_price'))
            .withGraphFetched("[subcategory.[category], comments.[user], prices, characteristics.[characteristic_name]]");
        return res.send(product);
    }
    catch (err) {
        console.log(err);
        // Internal Server Error
        return res.sendStatus(500);
    }
});
router.get('/:id', getProductById);
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.query()
            .insert(req.body);
        if (product) {
            const subcategory_id = product.subcategory_id;
            const characteristic_names = yield CharacteristicName_1.default.query()
                .where("for_subcategory_id", subcategory_id)
                .orderBy("id", "DESC");
            console.log(characteristic_names);
            const characteristics = characteristic_names
                .map((characteristic_name) => {
                return {
                    characteristic_name_id: characteristic_name.id,
                    product_id: product.id,
                    value: ""
                };
            });
            yield Characteristic_1.default.query()
                .insertGraph(characteristics);
            return res.send(product);
        }
        else
            res.sendStatus(400);
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
});
router.post('/', postProduct);
router.patch('/:id', patchController_1.default);
router.delete('/:id', deleteController_1.default);
module.exports = router;
//# sourceMappingURL=products.js.map