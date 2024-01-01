import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import * as express from 'express';
import * as cors from 'cors';
import { env } from './environments/Env';
import Routes from './routes/Routes';
import ErrorHandler from './helpers/ErrorHandler';
import { I18n } from 'i18n';
import { ReqInterface, ResInterface } from './interfaces/ReqInterface';
import AuthService from './services/admin/AuthService';
import { logRoutes } from './logs/Routes';
import db from './db';
const path = require('path');
export class Server {
  public app: express.Application = express();

  constructor() {
    console.log('environment', process.env.NODE_ENV);
    this.setConfigurations();
    this.setRoutes();
    this.error404Handler();
    this.handleErrors();
  }

  setConfigurations() {
    this.setMongodb();
    this.enableCors();
    this.configBodyParser();
    this.setLanguage();
  }



  setLanguage() {
    const localePath = path.resolve(process.cwd() + '/assets/locales');
    const i18n = new I18n();
    i18n.configure({
      locales: ['en', 'fr'],
      directory: localePath
    })
    this.app.use(i18n.init);
  }



  setMongodb() {      
      db.connectDb(env().dbUrl);
      this.createAdmin()
  }

  async createAdmin() {
    await AuthService.createAdmin();
  }

  enableCors() {
    this.app.use(
      cors({
        origin: true,
        credentials: true
      })
    );
  }

  configBodyParser() {
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    this.app.use(express.json({ limit: '10mb' }));
  }

  setRoutes() {

    this.app.use('/api-doc', express.static(path.resolve(process.cwd() + '/assets/apidoc')))
    this.app.use('/images', express.static(path.resolve(process.cwd() + '/images')))
    
    this.app.use((req: ReqInterface, res: ResInterface, next: express.NextFunction) => {
      res.startTime = new Date().getTime();
      req.startTime = new Date().getTime();
      res.api = req.url;
      res.method = req.method;
      req.deviceType = req.headers.devicetype as string;

      console.log(`Api ==> ${req.url}  ${req.method}`);
      console.log('request-body', req.body);
      next();
    });

    this.app.use('/api/v1', Routes);
    this.app.use('/logs', logRoutes);
  }

  error404Handler() {
    this.app.use((req: ReqInterface, res: ResInterface) => {
      res.status(404).json({
        message: 'Route not found',
        status: 404
      });
    })
  }

  handleErrors() {
    this.app.use((error: any, req: ReqInterface, res: ResInterface, next: express.NextFunction) => {
      ErrorHandler.globalErrorHandler(error, req, res, next);
    });
  }
}