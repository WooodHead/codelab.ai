import { Either } from 'fp-ts/Either'
import { Page } from '../../../domain/page'
import { CreatePageErrors } from './CreatePageErrors'
import { Result } from '@codelab/backend'

export type CreatePageResponse = Either<
  CreatePageErrors.AppNotFoundError,
  Result<Page>
>
