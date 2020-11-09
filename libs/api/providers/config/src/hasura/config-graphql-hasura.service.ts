import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql'
import { HttpLink } from 'apollo-link-http'
import {
  GraphQLError,
  GraphQLSchema,
  buildSchema as buildSchemaGraphql,
  printSchema,
} from 'graphql'
import {
  introspectSchema,
  makeRemoteExecutableSchema,
  mergeSchemas,
  // eslint-disable-next-line import/no-extraneous-dependencies
} from 'graphql-tools'
import nodeFetch from 'node-fetch'
import { ApiConfig, ApiConfigTypes } from '@codelab/api/providers/config'

const CONSTRUCTOR_NAME = 'HasuraService'

@Injectable()
export class ConfigGraphqlHasuraService implements GqlOptionsFactory {
  constructor(private readonly config: ConfigService<ApiConfig>) {}

  async createGqlOptions(): Promise<GqlModuleOptions> {
    let remoteExecutableSchema: any = null

    try {
      remoteExecutableSchema = await this.createRemoteSchema()
    } catch (e) {
      console.log(e)
    }

    return {
      autoSchemaFile: true,
      installSubscriptionHandlers: false,
      transformSchema: async (schema: GraphQLSchema) => {
        return mergeSchemas({
          schemas: [schema, remoteExecutableSchema],
        })
      },
      transformAutoSchemaFile: true,
      path: '/graphql',
      debug: true,
      tracing: true,
      playground: true,
      formatError: (err: GraphQLError) => {
        // Don't give the specific errors to the client.
        // const a = err;
        // if (err.message.startsWith("Nothing was")) {
        //
        // }
        // return new Error('Internal server error');
        // Otherwise return the original error.  The error can also
        // be manipulated in other ways, so long as it's returned.
        return err
      },
    }
  }

  private async createRemoteSchema(): Promise<GraphQLSchema> {
    try {
      const httpLink = new HttpLink({
        uri: this.config.get(ApiConfigTypes.HASURA_GRAPHQL_URI),
        fetch: nodeFetch as any,
        headers: {
          'X-Hasura-Admin-Secret': this.config.get(
            ApiConfigTypes.HASURA_GRAPHQL_ADMIN_SECRET,
          ),
        },
      })

      const remoteIntrospectedSchema = await introspectSchema(httpLink)
      const remoteSchema = printSchema(remoteIntrospectedSchema)
      const builtHasuraSchema = buildSchemaGraphql(remoteSchema)

      /**
       * Need to be using graphql-tools@4 for stitching
       */
      const remoteExecutableSchema = makeRemoteExecutableSchema({
        schema: builtHasuraSchema,
        link: httpLink,
      })

      return Promise.resolve(remoteExecutableSchema)
    } catch (err) {
      console.log(err)

      return Promise.reject(err)
    }
  }
}