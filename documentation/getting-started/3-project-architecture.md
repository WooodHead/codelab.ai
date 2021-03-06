# Project Structure

[Back](../../README.md)

We follow [Domain Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html) as the core principle. Many concepts are taken from the [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) as well as the [Ports & Adapters or Hexagonal Architecture](https://www.thinktocode.com/2018/07/19/ports-and-adapters-architecture).

On top of that, we utilize [CQRS](https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs) & [Event Sourcing](https://microservices.io/patterns/data/event-sourcing.html)

We follow [Exception or Result](https://enterprisecraftsmanship.com/posts/error-handling-exception-or-result) for validation.

> This one is required reading
>
> https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/

## Entities

Our domain entities contain fields, e.g. `User` contains `email`. We create a class for each field, and use `class-transformer` & `class-validator` for the mapping.

## Input vs Request

Our GraphQL Input type are named `[UseCase]Input.ts` and we use this to generate our forms.

Our GraphQL resolvers then process this input into `[UseCase]Request.ts`,, which is a dto for our use case services.

For example, when creating an app, we don't require the userId from the form. We get the id from the backend so we make sure the user is authorized.
