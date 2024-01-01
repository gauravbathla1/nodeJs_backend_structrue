"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
function env() {
    return {
        dbUrl: process.env.DB_URL,
        jwtSecret: process.env.JWT_SECRET,
        jwtExpiresIn: process.env.JWT_EXPIRES_IN,
        awsAccessKey: process.env.AWS_KEY,
        awsSecretKey: process.env.AWS_SECRET,
        s3Bucket: process.env.S3_BUCKET,
        s3AssetUrl: process.env.S3_ASSET_URL,
        awsRegion: process.env.AWS_REGION,
        sendGridApiKey: process.env.SENDGRID_API_KEY,
        webUrl: process.env.WEB_URL,
        redisHost: process.env.REDIS_HOST,
        redisPort: Number(process.env.REDIS_PORT),
        redisPassword: process.env.REDIS_PASSWORD,
    };
}
exports.env = env;
