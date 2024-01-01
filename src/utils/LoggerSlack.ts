// import { ChatPostMessageArguments, WebClient } from '@slack/web-api';
// import { LOG_TYPE } from '../constants/LogTypeConstant';
// import { env } from '../environments/Env';
// export class LoggerSlack {
//   private slackToken: string;
//   private channelId = '#api-nodejs';
//   private web: WebClient;
//   private logData: LogData;
//   private startTime: number;
//   private req: any;

//   constructor(
//     data: LogData,
//     req: any
//   ) {
//     this.slackToken = env().slackToken;
//     this.logData = data;
//     this.web = new WebClient(this.slackToken);
//     this.req = req;
//   }

//   /**
//    * 1. write code text like groupId  in between '!' eg !my name!
//    * Surround text with brackets, then surround the link with parentheses:
//    *   [your text](the link)
//    */
//   async log() {
//     try {
//       const time = new Date().getTime();
//       const timeDiff = Math.floor((time - this.req.startTime));
//       if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'test') {
//         let message = this.logData.message.replace(/\!/g, '`');
//         message = '`[INFO]` : ' + message;

//         let type = '';
//         if (this.logData.type === LOG_TYPE.success) {
//           type = `*${this.logData.type}*`;
//         }
//         else {
//           type = `~${this.logData.type}~`;
//         }

//         let text = `${type}, *Api* => ${this.req.originalUrl}, ${message}, Execution time ${timeDiff} ms`;
//         if (this.logData.data) {
//           text = `${text}, Data: ${JSON.stringify(this.logData.data)}`
//         }


//         const data: ChatPostMessageArguments = {
//           text,
//           channel: this.channelId,
//           as_user: true,
//         }

//         await this.web.chat.postMessage(data);
//       }

//       return;
//     } catch (err) {
//       console.log('error', JSON.stringify(err));
//       // console.log('error', err);
//     }
//   }


// }

// interface LogData {
//   type: string,
//   message: string;
//   data?: any;
// }