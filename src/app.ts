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
import './app/passport/google.passport'

const swaggerDoc = YAML.load('./swagger.yaml');
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
  res.status(200).send('Welcome to the Car Washing Service API');
});
// application routes
app.use('/api/v1', router);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use(globalErrorHandler);
app.use(notFound);

export default app;
