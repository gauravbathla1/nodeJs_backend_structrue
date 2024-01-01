import * as express from 'express';
import { getList } from './LogController';
import * as path from 'path';

export const logRoutes = express.Router();
const p = path.resolve(process.cwd() + '/src/logs/index.html');
console.log(p);
logRoutes.use('/', express.static(p))
logRoutes.get('/list', getList);

