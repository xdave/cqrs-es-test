# cqrs-es-test

Test repo with example code for doing CQRS+Event Sourcing
using @nestjs/microservices instead of the @nestjs/cqrs package.

## Install/run
- git clone git@github.com:xdave/cqrs-es-test.git
- cd cqrs-es-test
- docker-compose up --build

## What
- Starts an API service with a built-in microservice connected to NATS running in docker
- See the `tests.http` file for some HTTP tests you can send the server (install the Visual Studio Code [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension)

## Thoughts
This is configured as a single-project repo, however it can be converted to a monorepo, wherein the various folders:
- core,
- user,
- notifications

could become their own libraries & services.
