import { plainToClass } from 'class-transformer'
import * as O from 'fp-ts/lib/Option'
import { Option } from 'fp-ts/lib/Option'
import { AbstractRepository, EntityRepository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'
import { ByPageConditions, ByPageId } from '../../common/QueryConditions'
import { PageRepositoryPort } from '../../core/adapters/PageRepositoryPort'
import { Page } from '../../core/domain/page'
import { PageDto } from '../../presentation/PageDto'
import { TypeOrmPage } from '@codelab/backend'

@EntityRepository(TypeOrmPage)
export class TypeOrmPageRepositoryAdapter
  extends AbstractRepository<TypeOrmPage>
  implements PageRepositoryPort {
  constructor(public readonly baseRepository: BaseRepository<TypeOrmPage>) {
    super()
  }

  async delete(pageId?: string): Promise<Option<Page>> {
    if (!pageId) {
      return O.none
    }

    const page = await this.findOne({ pageId })

    if (O.isNone(page)) {
      return O.none
    }

    const typeOrmPage = page.value.toPersistence()

    await this.repository.remove(typeOrmPage)

    return page
  }

  async findOne(page: ByPageId): Promise<Option<Page>> {
    let where: object = {}

    where = {
      ...where,
      id: page.pageId,
    }

    const foundPage = await this.repository.findOne({
      where,
    })

    return foundPage ? O.some(Page.hydrate(Page, foundPage)) : O.none
  }

  async findMany({ appId }: ByPageConditions): Promise<Array<Page>> {
    const foundPages = await this.repository.find({
      relations: ['app'],
      where: {
        app: {
          id: appId,
        },
      },
    })

    return plainToClass(Page, foundPages)
  }

  async create(page: PageDto): Promise<Page> {
    const savedPageTypeOrm = await this.repository.save(page)

    return plainToClass(Page, savedPageTypeOrm)
  }
}
