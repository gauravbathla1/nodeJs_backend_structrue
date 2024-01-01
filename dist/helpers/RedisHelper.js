// // import redis from '../redis';
// export class Redis {
//     index: number = 0;
//     key: string;
//     value: any;
//     constructor(index: number, key: string, value?: any) {
//         this.index = index;
//         this.key = key;
//         this.value = value;
//     }
//     async hSet(setObj: { [key: string]: string | number }): Promise<boolean> {
//         let hValues: any[] = [];
//         Object.keys(setObj).forEach((e: string) => {
//             hValues.push(e);
//             hValues.push(setObj[e]);
//         })
//         await redis.client.select(this.index);
//         await redis.client.hSet(this.key, hValues);
//         return true;
//     }
//     async hGet(key: string): Promise<string | number> {
//         await redis.client.select(this.index);
//         return await redis.client.hGet(this.key, key) as string | number;
//     }
//     async hDel(key: string): Promise<boolean> {
//         await redis.client.select(this.index);
//         await redis.client.hDel(this.key, [key]);
//         return true;
//     }
//     async hLen():Promise<number>{
//         await redis.client.select(this.index);
//         return await redis.client.hLen(this.key);
//     }
//     async del(){
//         await redis.client.select(this.index);
//         await redis.client.del(this.key);
//         return true;
//     }
//     async lpush(socketId:string){
//         await redis.client.select(this.index);
//         await redis.client.lPush(this.key, socketId);
//     }
//     async lrem(socketId:string, count:number =1){
//         await redis.client.select(this.index);
//         await redis.client.lRem(this.key, count, socketId);
//     }
//     async dbSize(){
//         await redis.client.select(this.index);
//         const size = await redis.client.dbSize();
//         return size;
//     }
//     async lrange(start:number = 0, end: number = -1){
//         await redis.client.select(this.index);
//         const count = await redis.client.lRange(this.key, start, end);
//         return count;
//     }
//     async flushDb(){
//         await redis.client.select(this.index);
//         await redis.client.flushDb();
//     }
// }
