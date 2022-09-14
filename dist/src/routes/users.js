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
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
const user_1 = require("../controllers/user");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.query();
        return res.send(users);
    }
    catch (err) {
        console.log(err);
        // Internal Server Error
        return res.sendStatus(500);
    }
});
router.get('/', getAllUsers);
router.get('/refresh', user_1.handleRefreshToken);
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.query()
            .findById(req.params.id);
        return res.send(users);
    }
    catch (err) {
        console.log(err);
        // Internal Server Error
        return res.sendStatus(500);
    }
});
router.get('/:id', getUserById);
router.post('/', postController_1.default);
router.patch('/:id', patchController_1.default);
router.delete('/:id', deleteController_1.default);
router.post('/sign-in', user_1.signin);
router.post('/sign-out', user_1.signout);
router.post('/sign-up', user_1.signup);
module.exports = router;
//# sourceMappingURL=users.js.map