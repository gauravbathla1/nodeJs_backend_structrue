import LogModel from "./LogModel";
import { Response, NextFunction } from 'express';

export const getList = async (req: any, res: Response, next: NextFunction) => {
    try {
        const reqQuery = req.query;
        const limit = reqQuery.limit || 50;

        const match: { [key: string]: any } = {};

        if (reqQuery.lt) {
            match['createdAt'] = { '$lte': new Date(reqQuery.lt) };
        }

        if (reqQuery.gt) {
            match['createdAt'] = { '$gte': new Date(reqQuery.gt) };
        }
        if (reqQuery.execStatus) {
            match['execStatus'] = Number(reqQuery.execStatus);
        }

        if(reqQuery.search){
            match['api'] = {'$regex': reqQuery.search, '$options': '$i'}
        }
        const countMatch = { ...match };
        delete countMatch.createdAt;
        const count = await LogModel.countDocuments(countMatch);
        const list = await LogModel.find(match).sort({ createdAt: -1 }).limit(limit);

        res.status(200).json({
            status: 200,
            data: {
                count,
                list
            }
        })
    } catch (error) {
        console.log('error', error);
    }
}