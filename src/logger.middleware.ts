import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { resolve } from 'path'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('routerMiddleware', true)
  use(req: Request, res: Response, next: NextFunction) {
    const logMessage = resolve(req.baseUrl, req.url)
    this.logger.verbose(logMessage)
    next()
  }
}
