import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { TransformInterceptor } from './wanders/interceptors/transform.interceptor';
import {
  BadRequestExceptionFilter,
  ForbiddenExceptionFilter,
  UnauthorizedExceptionFilter,
} from './wanders/filters/filter';

export const customProvider: Array<any> = [
  {
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor,
  },
  {
    provide: APP_FILTER,
    useClass: BadRequestExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: ForbiddenExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: UnauthorizedExceptionFilter,
  },
];
