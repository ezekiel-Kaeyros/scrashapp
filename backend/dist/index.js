"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
// import routes from './routes';
// import socket from './sockets';
// import { initDb } from './db';
const express_rate_limit_1 = require("express-rate-limit");
const path_1 = __importDefault(require("path"));
// Create a Redis client
// const client = redis.createClient();
// Middleware function to check cache
const checkCache = (req, res, next) => {
    const { id } = req.params;
};
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 5 * 60 * 1000, // 5 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 5 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Use an external store for consistency across multiple server instances.
});
// initDb();
const app = (0, express_1.default)();
// Apply the rate limiting middleware to all requests.
app.use(limiter);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express_1.default.static(__dirname + '/static'));
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('*', (req, _res, next) => {
    console.log(req.method, req.url);
    next();
});
// app.use('/', routes);
app.get('/', function (req, res) {
    res.render('index');
});
const httpServer = (0, http_1.createServer)(app);
// socket(httpServer);
const PORT = process.env.PORT || 4001;
httpServer.listen({ port: PORT }, () => {
    console.log(`httpServer ready at http://localhost:${PORT}`);
});
