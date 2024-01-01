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
const server_1 = require("./server");
const QuotesService_1 = require("./services/admin/QuotesService");
const cron = require('node-cron');
let app = new server_1.Server().app;
const server = require('http').Server(app);
let port = process.env.PORT;
cron.schedule('* * * * *', function () {
    return __awaiter(this, void 0, void 0, function* () {
        // cron.schedule('0 0 * * *', async function () {
        QuotesService_1.default.updateQuotesPosition();
        console.log('running a task every 24 hour');
        //console.log(getdata)
    });
});
server.listen(port, () => {
    console.log(`server is listening at port ${port}`);
});
