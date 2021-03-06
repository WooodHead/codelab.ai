import { Inject } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { PageCreateErrorEvent } from '../../../../../page/src/core/application/useCases/createPage/PageCreateErrorEvent'
import { GraphDITokens } from '../../../framework/GraphDITokens'
import { GraphRepositoryPort } from '../../adapters/GraphRepositoryPort'

@EventsHandler(PageCreateErrorEvent)
export class GraphPageCreateErrorEventHandler
  implements IEventHandler<PageCreateErrorEvent> {
  constructor(
    @Inject(GraphDITokens.GraphRepository)
    private readonly graphRepository: GraphRepositoryPort,
  ) {}

  async handle(event: PageCreateErrorEvent) {
    if (event?.graph?.id) {
      await this.graphRepository.delete({ graphId: event.graph.id })
    }
  }
}
