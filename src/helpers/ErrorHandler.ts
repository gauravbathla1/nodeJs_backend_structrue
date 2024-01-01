import { RESPONSE } from "../constants/ResponseConstant";
import { AppError } from "../utils/AppError";
import { logError, logFailed } from "../logs/LogHelper";
import { ReqInterface, ResInterface } from "../interfaces/ReqInterface";
import { NextFunction } from "express";

export class ErrorHandler {
  constructor() {

  }

  globalErrorHandler(err: any, req: ReqInterface, res: ResInterface, next: NextFunction) {
    err.statusCode = err.statusCode || RESPONSE.HTTP_INTERNAL_SERVER_ERROR;
    err.status = err.status || err.status;
    if (process.env.NODE_ENV === 'test') {
      this.sendErrTest(err, res);
    }
    else {
      //log the error
      // console.log('Error', err);
      let error = { ...err };
      // console.log('error', error);
      if (error.name === 'JsonWebTokenError') error = this.handleJwtError(res);
      if (error.name === 'TokenExpiredError') error = this.handleExpiredTokenError(res);
      if (error.kind === 'ObjectId') error = this.handleCastError(error, res);
      if (!error.message) {
        error.message = err.message;
      }
      this.sendError(error, req, res);
    }
  }

  handleJwtError(res: ResInterface) {
    const message = res.__('jwt_invalid_token');
    return new AppError(message, RESPONSE.HTTP_UNAUTHORIZED, 'JWT_INVALID');
  }

  handleExpiredTokenError(res: ResInterface) {
    const message = res.__('jwt_expired_token');
    return new AppError(message, RESPONSE.HTTP_UNAUTHORIZED, 'JWT_EXPIRED');
  }

  handleCastError(err: any, res: ResInterface) {
    const idValue = err.value;
    let message = res.__('invalid_oject_id');
    message = message.replace('$_id', idValue);
    return new AppError(message, RESPONSE.HTTP_BAD_REQUEST, 'BAD_REQUEST');
  }


  sendErrTest(err: any, res: ResInterface) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    })
  }

  sendError(err: any, req: ReqInterface, res: ResInterface) {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        statusText: err.statusText
      });

      logFailed(
        res,
        err,
        err.status,
      );
      // programming or other unknown errors : don't want to leak error details
    } else {
      // 1) log the errors
      // console.error('Error : ', err);

      logError(
        res,
        {
          status: err.status,
          error: err,
          stack: err.stack
        },
        RESPONSE.HTTP_INTERNAL_SERVER_ERROR
      );
      // 2) send a generic message
      res.status(RESPONSE.HTTP_INTERNAL_SERVER_ERROR).json({
        status: 500,
        statusText: 'ERROR',
        message: 'Something Went Wrong',
      })
    }
  }
}

export default new ErrorHandler();