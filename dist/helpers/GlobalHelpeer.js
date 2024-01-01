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
const axios = require('axios');
class GlobalHelper {
    getShareDeepLink(type, shareId, title) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(process.env.FIRE_BASE_KEY, "firebase key");
                let option;
                // if (deviceType == 'mobile') {
                // let baseUrl = process.env.NODE_ENV == 'dev'?'localhost:4200/':'https://primumtekapps.com/'
                option = {
                    dynamicLinkInfo: {
                        domainUriPrefix: 'https://peaceflow.page.link',
                        link: `https://peaceflow.app/?type=${type}&id=${shareId}&title=${title}`,
                        iosInfo: {
                            iosBundleId: process.env.IOS_BUNDLE_ID,
                            //  iosFallbackLink:'https://primumtekapps.com/#/reset-password'
                        },
                        androidInfo: {
                            androidPackageName: process.env.ANDROID_PKG_NAME,
                            //androidFallbackLink:'https://primumtekapps.com/#/reset-password'
                        },
                    },
                };
                const link = yield axios({
                    method: 'post',
                    url: `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${process.env.FIRE_BASE_KEY}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: option
                });
                console.log((_a = link === null || link === void 0 ? void 0 : link.data) === null || _a === void 0 ? void 0 : _a.shortLink, "link");
                return (_b = link === null || link === void 0 ? void 0 : link.data) === null || _b === void 0 ? void 0 : _b.shortLink;
            }
            catch (error) {
                // console.log(error);
                return error;
            }
        });
    }
}
;
exports.default = new GlobalHelper();
