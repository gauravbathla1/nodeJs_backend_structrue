"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlHelper = void 0;
class HtmlHelper {
    constructor() {
    }
    // book approve , reset password (forgot) , email verify , wellcome email , 
    HTMLMailFormat(name, link, type) {
        if (type === 'forgot-password') {
            return (`<!DOCTYPE html>
            <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f5f5f5;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                }
                .header {
                  text-align: center;
                  padding: 20px 0;
                }
                .content {
                  background-color: #fff;
                  padding: 20px;
                }
                .button {
                  text-align: center;
                  padding: 20px 0;
                }
                .footer {
                  text-align: center;
                  background-color: #333;
                  color: #fff;
                  padding: 10px 0;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>PeaceFlow Admin</h1>
                </div>
                <div class="content">
                  <h2>Forgot Password</h2>
                  <p>Dear ${name},</p>
                  <p>You have requested to reset your password. Click the button below to reset your password:</p>
                  <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none;">Reset Password</a>
                  <p>If you didn't request a password reset, please ignore this email.</p>
                </div>
                <div class="button">
                  <a href="http://34.196.212.121/#/login" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none;">Go to PeaceFlow Admin</a>
                </div>
                <div class="footer">
                  &copy; ${new Date().getFullYear()} PeaceFlow Admin. All rights reserved.
                </div>
              </div>
            </body>
            </html>
            `);
        }
    }
}
exports.default = new HtmlHelper();
