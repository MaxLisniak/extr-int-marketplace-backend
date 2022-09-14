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
const Characteristic_1 = __importDefault(require("../models/Characteristic"));
const router = express_1.default.Router();
const getAllCharacteristics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const characteristics = yield Characteristic_1.default
            .query()
            .withGraphFetched('characteristic_name')
            .orderBy("characteristic_name_id", "ASC");
        return res.send(characteristics);
    }
    catch (err) {
        console.log(err);
        // Internal Server Error
        return res.sendStatus(500);
    }
});
router.get('/', getAllCharacteristics);
const getCharacteristicById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const characteristic = yield Characteristic_1.default
            .query()
            .findById(req.params.id)
            .withGraphFetched('characteristic_name');
        return res.send(characteristic);
    }
    catch (err) {
        console.log(err);
        // Internal Server Error
        return res.sendStatus(500);
    }
});
router.get('/:id', getCharacteristicById);
router.post('/', postController_1.default);
router.patch('/:id', patchController_1.default);
router.delete('/:id', deleteController_1.default);
module.exports = router;
//# sourceMappingURL=characteristics.js.map