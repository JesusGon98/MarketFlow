import { createParamDecorator } from '@nestjs/common';

export const StoreId = createParamDecorator((): string => {
  return process.env.DEFAULT_STORE_ID ?? '1';
});
