
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
// import routes from './routes';
// import socket from './sockets';
// import { initDb } from './db';
import { rateLimit } from 'express-rate-limit'
import path from 'path'
// Create a Redis client
// const client = redis.createClient();

// Middleware function to check cache

const checkCache = (req: any, res: any, next: any) => {
	const { id } = req.params;
}

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 5 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
})
// initDb();

const app = express();

// Apply the rate limiting middleware to all requests.
app.use(limiter)

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(__dirname + '/static'));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use('*', (req: any, _res, next) => {
	console.log(req.method, req.url);
	next();
})

// app.use('/', routes);
app.get('/', function(req, res) {
	res.render('index');
  });

const httpServer = createServer(app);
// socket(httpServer);

const PORT = process.env.PORT || 4001;
httpServer.listen({ port: PORT }, () => {
  console.log(`httpServer ready at http://localhost:${PORT}`);
});
