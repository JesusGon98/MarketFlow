"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreId = void 0;
const common_1 = require("@nestjs/common");
exports.StoreId = (0, common_1.createParamDecorator)(() => {
    return process.env.DEFAULT_STORE_ID ?? '1';
});
//# sourceMappingURL=store-id.decorator.js.map