# cqrs-es-test

Test repo with example code for doing CQRS+Event Sourcing
using @nestjs/microservices instead of the @nestjs/cqrs package.

## Install/run
- `git clone git@github.com:xdave/cqrs-es-test.git`
- `cd cqrs-es-test`
- `npm i`
- `docker-compose up --build`
- hot-reloading is enabled for development inside `docker` :)

## What does that do?
- Starts several services that communicate using the `NATS` Transport:
  - `NATS` server
  - `postgresql` database server
  - REST api gateway
  - `Auth` service
  - `User` service
  - `Notifications` service
- See the `tests.http` file for some HTTP tests you can send the `api` (install the Visual Studio Code [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension)

## Features/TODO
- [x] `postgres` support through [MikroORM](https://mikro-orm.io/)
- [x] process manager/sagas that work like @nestjs/cqrs
- [ ] optimistic concurrency
- [ ] event sequence numbers, versioning
- [ ] add `JWT` auth
- [ ] multi-tenancy
- [ ] event-sourced view models
- [ ] snapshots
- [ ] offset table for continuing long-running processes after restarts
- [ ] unit/integration/end-to-end testing
- [ ] kubernetes/helm support
