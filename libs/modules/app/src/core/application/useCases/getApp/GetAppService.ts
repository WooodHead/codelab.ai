import { isNone } from 'fp-ts/Option'
import { left, right } from 'fp-ts/lib/Either'
import { AppRepositoryPort } from '../../../adapters/AppRepositoryPort'
import { GetAppErrors } from './GetAppErrors'
import { GetAppRequest } from './GetAppRequest'
import { GetAppResponse } from './GetAppResponse'
import { Result } from '@codelab/backend'

export class GetAppService {
  constructor(private readonly appRepository: AppRepositoryPort) {}

  async execute({ appId, user }: GetAppRequest): Promise<GetAppResponse> {
    const app = await this.appRepository.findOne({ id: appId }, user.id)

    if (isNone(app)) {
      return left(new GetAppErrors.NotFound(appId))
    }

    return right(Result.ok(app))
  }
}
