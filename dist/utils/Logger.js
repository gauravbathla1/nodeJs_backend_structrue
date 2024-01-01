// import { ReqInterface } from '../interfaces/ReqInterface';
// import LogModel from '../logs/LogModel';
// class DataDog {
//     hostname: any;
//     serviceName: any;
//     source: any;
//     req: ReqInterface;
//     constructor(req: ReqInterface) {
//         this.req = req;
//         try {
//             if (req.hasOwnProperty('originalUrl')) {
//                 this.serviceName = req.originalUrl;
//             } else {
//                 this.serviceName = req.url;
//             }
//             this.source = "NodeJS";
//         } catch (error) {
//             console.log("error in constructing logger", error);
//         }
//     }
//     async error(message: string, error: any) {
//         try {
//             const execTime = new Date().getTime() - this.req.startTime;
//             await LogModel.create({
//                 method: this.req.method,
//                 execStatus: 2,
//                 api: this.serviceName,
//                 status: 500,
//                 execTime,
//                 user: this.req?.user?._id || 'guest',
//                 session: this.req?.session?._id || 'guest',
//                 message,
//                 data: JSON.stringify(error, undefined, 2)
//             });
//             console.log(message, JSON.stringify({
//                 api: this.serviceName,
//                 status: 100,
//                 execTime,
//                 user: this.req?.user?._id || 'guest',
//                 session: this.req?.session?._id || 'guest',
//                 error
//             }, undefined, 2))
//         } catch (error) {
//             return true;
//         }
//     }
//     async info(message: string, data: any) {
//         try {
//             const execTime = new Date().getTime() - this.req.startTime;
//             await LogModel.create({
//                 method: this.req.method,
//                 execStatus: 4,
//                 api: this.serviceName,
//                 status: 100,
//                 execTime,
//                 user: this.req?.user?._id || 'guest',
//                 session: this.req?.session?._id || 'guest',
//                 message,
//                 data: JSON.stringify(data, undefined, 2)
//             });
//             console.log(message, JSON.stringify({
//                 api: this.serviceName,
//                 status: 100,
//                 execTime,
//                 user: this.req?.user?._id || 'guest',
//                 session: this.req?.session?._id || 'guest',
//                 data
//             }, undefined, 2))
//         } catch (error) {
//             return true;
//         }
//     }
// }
// export default DataDog;
