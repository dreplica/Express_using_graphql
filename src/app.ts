import createError, { HttpError } from 'http-errors';
import express, { Request, Response, NextFunction, request, response, json } from 'express';
import winston from 'winston';
import expressWinston from 'express-winston';
import path from 'path';
import cors from 'cors';
import graphql from 'express-graphql';
import schema, { contextRe } from './graphqlschema/schema';
import jsonwebtoken from 'jsonwebtoken'

// import  logger  from 'morgan';
import routing from './routes/route_contact';
import routing_users from './routes/routing_users';
import { auth } from './controllers/authenticate';
import { JsonWebTokenError } from 'jsonwebtoken';

const logger = expressWinston.logger({
	transports: [ new winston.transports.Console() ],
	format: winston.format.combine(winston.format.colorize(), winston.format.json()),
	meta: true,
	msg: 'HTTP {{req.method}} {{req.url}}',
	expressFormat: true,
	colorize: false,
	ignoreRoute: function(req, res) {
		return false;
	}
});
const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../', 'views'));
app.set('view engine', 'ejs');
app.disable('x-powered-by'); //it disable x-header for security best to use helmet
app.use(cors());
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname,"../", 'public')));
app.use(
	'/graphql',auth,
	graphql((req, res) => {
		return {
			schema,
			graphiql: true,
			context: {req, res}
		};
	})
);
app.use('/api', routing);
app.use('/user', routing_users);
// catch 404 and forward to error handler
app.use(function(_req, _res, next) {
	next(createError(404));
});

// error handler
app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.send('error');
});

export default app;
