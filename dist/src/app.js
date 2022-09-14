"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const index_1 = __importDefault(require("./routes/index"));
const users_1 = __importDefault(require("./routes/users"));
const categories_1 = __importDefault(require("./routes/categories"));
const subcategories_1 = __importDefault(require("./routes/subcategories"));
const products_1 = __importDefault(require("./routes/products"));
const comments_1 = __importDefault(require("./routes/comments"));
const prices_1 = __importDefault(require("./routes/prices"));
const favorites_1 = __importDefault(require("./routes/favorites"));
const keywords_1 = __importDefault(require("./routes/keywords"));
const characteristic_names_1 = __importDefault(require("./routes/characteristic_names"));
const characteristics_1 = __importDefault(require("./routes/characteristics"));
const app = (0, express_1.default)();
const corsConfig = {
    origin: "http://localhost:3001",
    credentials: true
};
app.use((0, cors_1.default)(corsConfig));
// view engine setup
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// app.use(cors({ origin: '*' }));
app.use('/', index_1.default);
app.use('/users', users_1.default);
app.use('/categories', categories_1.default);
app.use('/subcategories', subcategories_1.default);
app.use('/products', products_1.default);
app.use('/comments', comments_1.default);
app.use('/prices', prices_1.default);
app.use('/favorites', favorites_1.default);
app.use('/keywords', keywords_1.default);
app.use('/characteristic_names', characteristic_names_1.default);
app.use('/characteristics', characteristics_1.default);
// catch 404 and forward to error handler
const error404Handler = (req, res, next) => {
    next((0, http_errors_1.default)(404));
};
app.use(error404Handler);
const errorHandler = (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.sendStatus(err.status || 500);
    // res.render('error');
};
app.use(errorHandler);
// module.exports = app;
exports.default = app;
//# sourceMappingURL=app.js.map