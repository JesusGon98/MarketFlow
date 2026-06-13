import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const StoreId = createParamDecorator((_data: unknown, ctx: ExecutionContext): string => {
  const request = ctx.switchToHttp().getRequest<Request>();
  const storeId = request.query.storeId as string | undefined;

  return storeId ?? process.env.DEFAULT_STORE_ID ?? '1';
});
