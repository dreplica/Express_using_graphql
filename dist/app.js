"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const winston_1 = __importDefault(require("winston"));
const express_winston_1 = __importDefault(require("express-winston"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const schema_1 = __importDefault(require("./graphqlschema/schema"));
// import  logger  from 'morgan';
const route_contact_1 = __importDefault(require("./routes/route_contact"));
const routing_users_1 = __importDefault(require("./routes/routing_users"));
const authenticate_1 = require("./controllers/authenticate");
const logger = express_winston_1.default.logger({
    transports: [new winston_1.default.transports.Console()],
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.json()),
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) {
        return false;
    }
});
const app = express_1.default();
// view engine setup
app.set('views', path_1.default.join(__dirname, '../', 'views'));
app.set('view engine', 'ejs');
app.disable('x-powered-by'); //it disable x-header for security best to use helmet
app.use(cors_1.default());
app.use(logger);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname,"../", 'public')));
app.use('/graphql', authenticate_1.auth, express_graphql_1.default((req, res) => {
    return {
        schema: schema_1.default,
        graphiql: true,
        context: { req, res }
    };
}));
app.use('/api', route_contact_1.default);
app.use('/user', routing_users_1.default);
// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.send('error');
});
exports.default = app;
//# sourceMappingURL=app.js.map