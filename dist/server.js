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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const dotenv = require("dotenv");
dotenv.config({ path: './.env' });
const express = require("express");
// import * as path from 'path';
const cors = require("cors");
const Env_1 = require("./environments/Env");
const Routes_1 = require("./routes/Routes");
const ErrorHandler_1 = require("./helpers/ErrorHandler");
const i18n_1 = require("i18n");
const AuthService_1 = require("./services/admin/AuthService");
const Routes_2 = require("./logs/Routes");
const db_1 = require("./db");
const Logger_1 = require("./helpers/Logger");
const path = require('path');
// let dist = require("../dist")
class Server {
    constructor() {
        this.app = express();
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
        const i18n = new i18n_1.I18n();
        i18n.configure({
            locales: ['en', 'fr'],
            directory: localePath
        });
        this.app.use(i18n.init);
    }
    setMongodb() {
        db_1.default.connectDb((0, Env_1.env)().dbUrl);
        this.createAdmin();
    }
    createAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            yield AuthService_1.default.createAdmin();
        });
    }
    enableCors() {
        this.app.use(cors({
            origin: true,
            credentials: true
        }));
    }
    configBodyParser() {
        this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
        this.app.use(express.json({ limit: '10mb' }));
    }
    setRoutes() {
        // this.app.use('/tas',path.resolve(process.cwd()+'/public/dist'));
        // console.log("_____====>",express.static(process.cwd()+'/public/dist'),"path", path.resolve(process.cwd()+'/public/dist'));
        // let path2 = path.resolve('./public/dist');
        // console.log("tas_1", path2 );
        // console.log("tas_2", express.static(path2) );
        this.app.use('/api-doc', express.static(path.resolve(process.cwd() + '/assets/apidoc')));
        this.app.use('/images', express.static(path.resolve(process.cwd() + '/images')));
        // this.app.use('/tas', express.static(path2) );
        // this.app.use("/admin", express.static(path.join(__dirname, "/public/")));
        // this.app.use('/', express.static( path.join(process.cwd() +'/public/') ) );
        // console.log(express.static(path.resolve(process.cwd() + '/public/dist')));
        // express.static(path.resolve(process.cwd() + '/public/dist')) 
        // this.app.use('/tas', express.static(path.join(__dirname, '/public/dist')));
        // this.app.use(express.static(__dirname + 'public/dist'));
        // this.app.get('/admin', (req, res) => res.sendFile(path.join(__dirname)));
        // this.app.get('*', (req, res) => {
        //   res.sendFile(path.join(__dirname, 'admin/dist/quickflick'));
        // });
        // this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use((req, res, next) => {
            res.startTime = new Date().getTime();
            req.startTime = new Date().getTime();
            res.api = req.url;
            res.method = req.method;
            req.deviceType = req.headers.devicetype;
            console.log(`Api ==> ${req.url}  ${req.method}`);
            console.log('request-body', req.body);
            next();
        });
        this.app.use(Logger_1.logger);
        this.app.use('/api/v1', Routes_1.default);
        this.app.use('/logs', Routes_2.logRoutes);
    }
    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: 'Route not found',
                status: 404
            });
        });
    }
    handleErrors() {
        this.app.use((error, req, res, next) => {
            ErrorHandler_1.default.globalErrorHandler(error, req, res, next);
        });
    }
}
exports.Server = Server;
