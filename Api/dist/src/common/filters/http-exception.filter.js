"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HttpExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let HttpExceptionFilter = HttpExceptionFilter_1 = class HttpExceptionFilter {
    logger = new common_1.Logger(HttpExceptionFilter_1.name);
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            if (typeof exceptionResponse === 'string') {
                message = exceptionResponse;
            }
            else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
                const responseMessage = exceptionResponse.message;
                message = Array.isArray(responseMessage) ? responseMessage.join(', ') : responseMessage ?? exception.message;
            }
        }
        else if (exception instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (exception.code === 'P2025') {
                status = common_1.HttpStatus.NOT_FOUND;
                message = 'Resource not found';
            }
            else if (exception.code === 'P2002') {
                status = common_1.HttpStatus.CONFLICT;
                message = 'A record with this value already exists';
            }
            else {
                status = common_1.HttpStatus.BAD_REQUEST;
                message = 'Database request error';
            }
        }
        else if (exception instanceof Error) {
            this.logger.error(exception.message, exception.stack);
            message = exception.message;
        }
        response.status(status).json({
            success: false,
            message,
            data: null,
        });
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = HttpExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], HttpExceptionFilter);
//# sourceMappingURL=http-exception.filter.js.map