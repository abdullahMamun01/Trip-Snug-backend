/* eslint-disable no-undef */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';
import handleEmptyResponse from './app/middleware/handleEmptyResponse';
import fileUpload from 'express-fileupload';
import './app/middleware/passport';
import session from 'express-session';
const app: Application = express();
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import passport from 'passport';
import config from './app/config';
import './app/passport/google.passport';
import path from 'path';

const CSS_URL =
  'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css';
const swaggerDoc = YAML.load(path.join(__dirname, '', 'swagger.yaml'));

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload());
app.use(handleEmptyResponse);
app.use(
  session({
    secret: config.accessTokenSecret as string,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

//root route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to trip snug api',
    success: true,
    statusCode: 200,
  });
});
// application routes
app.use('/api/v1', router);

app.use(
  '/docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDoc, {
    customCss:
      '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
    customCssUrl: CSS_URL,
  }),
);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
