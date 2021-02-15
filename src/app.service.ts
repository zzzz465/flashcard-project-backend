import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  returnOk(): string {
    return 'Ok'
  }
}
