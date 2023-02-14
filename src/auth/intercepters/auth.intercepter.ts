import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDocument } from 'src/users/schemas/user.schema';

export interface Response<T> {
  data: T;
}

@Injectable()
export class AuthTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Response<T>>> {
    return next.handle().pipe(
      map((data) => {
        if (data.data && Array.isArray(data.data)) {
          data.data = data.data.map((item) => {
            return this.transform(item);
          });
          return data;
        }
        return this.transform(data);
      }),
    );
  }

  transform(product: UserDocument): UserDocument {
    return product;
  }
}
