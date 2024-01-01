// import { createClient, RedisClientType } from 'redis';
// import { env } from './environments/Env';
// import SocketService  from './socket';
// export class Redis {
//     client: RedisClientType;
//     host: string;
//     port: number;
//     password: string;
//     async init(server: any) {
//         try {
//             this.host = env().redisHost;
//             this.port = env().redisPort;
//             this.password = env().redisPassword;
//             const connectConfig = { socket: { host: this.host, port: this.port }, password: this.password }
//             if (!this.password) delete connectConfig.password;
//             console.log(connectConfig);
//             this.client = createClient(connectConfig);
//             this.client.on('error', (error: any) => {
//                 console.log('error', error);
//             })
//             await this.client.connect();
//             console.log('Redis connect');
//             this.connectSocket(server);
//             return true;
//         } catch (error) {
//             console.log('Redis Error : ', error);
//         }
//     }
//     connectSocket(server: any){
//         SocketService.init(server);
//         SocketService.connect();
//     }
// }
// export default new Redis();
