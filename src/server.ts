import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import xss from 'xss-clean';
import morgan from 'morgan';
import express from 'express';
import 'express-async-errors';
import { config } from './config';
import bodyParser from 'body-parser';
import { connectDB } from './connect.db';
import sanitize from 'express-mongo-sanitize';
import rateLimiter from 'express-rate-limit';
import { Logger } from './services/logger.service';

// routers
import authRouter from './modules/auth/auth.routes';
import userRouter from './modules/user/user.routes';
import collectionRouter from './modules/collection/collection.routes';
import downloadRouter from './modules/download/download.routes';
import packageRouter from './modules/package/package.routes';
import categoryRouter from './modules/category/category.routes';
import analyticRouter from './modules/analytic/analytic.routes';

// middlewares
import { notFoundMiddleware } from './middlewares/not-found';
import { errorHandlerMiddleware } from './middlewares/error-handler';

const app = express();
const baseApiUrl = '/api/v1';
const authUrl = '/api/v1/auth';

// security middleware
app.use(xss());
app.use(cors());
app.options('*', cors); // allow all request options by cors
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 600, //  60 request max
  })
);
app.use(helmet());
app.use(sanitize());
app.set('trust proxy', 1);

// utility middlewares
process.env.NODE_ENV !== 'production' && app.use(morgan('tiny'));
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use(`${authUrl}`, authRouter);
app.use(`${baseApiUrl}/users`, userRouter);
app.use(`${baseApiUrl}/categories`, categoryRouter);
app.use(`${baseApiUrl}/packages`, packageRouter);
app.use(`${baseApiUrl}/downloads`, downloadRouter);
app.use(`${baseApiUrl}/collections`, collectionRouter);
app.use(`${baseApiUrl}/analytics`, analyticRouter);

// error handlers
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  const { server_port, mongo_uri } = config;
  const logger = Logger.getInstance();

  try {
    logger.log(`Connecting to database...`);
    await connectDB(mongo_uri!);
    app.listen(server_port, () =>
      logger.log(`Server started on port ${server_port}`)
    );
  } catch (error) {
    logger.error(error);
  }
};

start();
