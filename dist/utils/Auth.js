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
exports.Auth = void 0;
// import { ObjectId } from "mongoose";
const Bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const Env_1 = require("../environments/Env");
class Auth {
    constructor() {
        this.MAX_TOKEN_TIME = 600000;
    }
    generateVerificationCode(size = 4) {
        let digits = '0123456789';
        let otp = '';
        for (let i = 0; i < size; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        return otp;
    }
    decodeJwt(token) {
        return new Promise((resolve, reject) => {
            Jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
                if (err) {
                    return reject(err);
                }
                else {
                    return resolve(data);
                }
            });
        });
    }
    /**
     *
     * @param data
     * @param expiresIn
     * @param next
     * @returns {Promise<string>}
     */
    static getToken(
    // data: { [key: string]: string | number | ObjectId },
    data, expiresIn, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return Jwt.sign(data, (0, Env_1.env)().jwtSecret, {
                    expiresIn
                });
            }
            catch (err) {
                // next(err)
                console.log(err);
            }
        });
    }
    /**
     *
     * @param candidatePassword
     * @param userPassword
     * @returns {Promise<boolean>}
     */
    comparePassword(candidatePassword, userPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                Bcrypt.compare(candidatePassword, userPassword, ((err, isSame) => {
                    if (err) {
                        reject(err);
                    }
                    else if (!isSame) {
                        resolve(false);
                    }
                    else {
                        resolve(true);
                    }
                }));
            });
        });
    }
    encryptPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                Bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(hash);
                    }
                });
            });
        });
    }
}
exports.Auth = Auth;
