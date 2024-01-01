// import { Server, Socket } from "socket.io";
// import { createAdapter } from '@socket.io/redis-adapter'
// import redis from "./redis";
// import { NextFunction } from "express";
// import { AppError } from "./utils/AppError";
// import { RESPONSE } from "./constants/ResponseConstant";
// import { Auth } from "./utils/Auth";
// import SessionModel from "./models/SessionModel";
// import { UserInterface } from "./interfaces/UserInterface";
// // import { Redis } from "./helpers/RedisHelper";
// export class SocketService {
//     io: any;
//     public sockets: any;
//     public onlineUsers: any;
//     public blockData: any;
//     static activeSockets: any = [];
//     constructor() {
//         this.io;
//         this.sockets = [];
//         this.onlineUsers = [];
//         this.blockData;
//     }
//     /* clearing all sockets when restarting. */
//     private async clearSockets() {
//         await new Redis(5, 'test').flushDb();
//     }
//     public init(server: any) {
//         this.clearSockets();
//         this.io = new Server(server,
//             {
//                 maxHttpBufferSize: 100000000,
//                 connectTimeout: 5000,
//                 transports: ['websocket', 'polling'],
//                 pingInterval: 25 * 1000,
//                 pingTimeout: 5000,
//             });
//         const pubClient = redis.client;
//         const subClient = pubClient.duplicate();
//         this.io.adapter(createAdapter(pubClient, subClient));
//     }
//     async provideSocket(id: any) {
//         console.log('provide socket for id', id)
//         let userSocket = this.sockets[id];
//         return userSocket;
//     }
//     globalSocket() {
//         return this.io;
//     }
//     async connect() {
//         //This middleware is used to validate the user using jwt token        
//         this.io.use(async (socket: Socket, next: NextFunction) => {
//             try {
//                 const token = socket.handshake.query.token as string;
//                 console.log('query ', JSON.stringify(socket.handshake.query));
//                 if (!token) {
//                     console.log('if token not present');
//                     return next(new AppError('You are not logged in, please login again', RESPONSE.HTTP_UNAUTHORIZED, "UNAUTHORIZED"));
//                 }
//                 const decoded = await new Auth().decodeJwt(token);
//                 const session: any = await SessionModel.findById(decoded.id).populate('user');
//                 if (!session) {
//                     return next(new AppError('jwt_invalid_token', 401, "UNAUTHORIZED"))
//                 }
//                 if (!session.isActive) {
//                     // return ResponseHelper.expired(res, res.__('session_expired'));
//                     return next(new AppError('session_expired', 410, 'EXPIRED'))
//                 }
//                 const user = session.user as UserInterface;
//                 if (!user.isAccountActive) {
//                     // return ResponseHelper.forbidden(res, res.__('account_inactive'));
//                     return next(new AppError('account_inactive', 403, 'FORBIDDEN'))
//                 }
//                 if (user.passwordChangedAt && decoded.iat < user.passwordChangedAt.getTime() / 1000) {
//                     // return ResponseHelper.unAuthenticated(res, res.__('user_changed_password_recently'), {}, 'OLD_PASSWORD');
//                     return next(new AppError('user_changed_password_recently', 401, 'UNAUTHORIZE'));
//                 }
//                 socket.data.user = user;
//                 next();
//             } catch (error) {
//                 next(error)
//             }
//         })
//         this.io.on('connection', async (socket: Socket) => {
//             const userId = `${socket.data.user._id}`;
//             // await new Redis(10, 'sockets').hSet({ [userId]: socket.id })
//             await new Redis(5, userId).lpush(socket.id);
//             console.log('socket connected');
//          //   await ChatService.joinAllGroup(socket.data?.user?._id, socket);
//             socket.on('sendMessage', (data, callback) => {
//                 //ChatController.sendMessage(data, socket, callback);
//             })
//             socket.on('changeChatStatus', (data, callback) => {
//                // ChatController.changeChatStatus(data, socket, callback);
//             })
//             socket.on('editMessage', (data, callback) => {
//                // ChatController.editChat(data, socket, callback);
//             })
//             socket.on('deleteMessage', (data, callback) => {
//                // ChatController.deleteChat(data, socket, callback);
//             })
//             socket.on('blockUser', (data, callback) => {
//                // ChatController.blockUser(data, socket, callback);
//             })
//             socket.on('unblockUser', (data, callback) => {
//                // ChatController.unblockUser(data, socket, callback);
//             })
//             socket.on('reportChat', (data, callback) => {
//               //  ChatController.reportChat(data, socket, callback);
//             })
//             socket.on('disconnect', async (data) => {
//                 await new Redis(10, 'sockets').hDel(userId);
//                 await new Redis(5, userId).lrem(socket.id);
//                 // const onlineUsers = await new Redis(10, 'sockets').hLen();
//                 const onlineUsers  = await new Redis(5, 'test').dbSize();
//                 console.log('onlineUsers', onlineUsers);
//             });
//         })
//     }
// }
// export default new SocketService();
