# Arquitectura del Sistema

## Frontend

Tecnologías:

* Angular
* Angular Material
* RxJS

Estructura:

src/app

core/

* services
* guards
* interceptors
* models

shared/

* components
* pipes
* directives

features/

* home
* products
* categories
* banners
* cart
* admin
* settings

layout/

* navbar
* sidebar
* footer

## Backend

Tecnologías:

* NestJS
* Prisma
* PostgreSQL

Estructura:

src/

modules/

* auth
* users
* stores
* categories
* products
* banners

common/

* decorators
* guards
* interceptors

prisma/

## Flujo General

Angular → API REST → Prisma → PostgreSQL

## Principios

* Código desacoplado.
* Componentes reutilizables.
* Servicios especializados.
* DTOs para entrada y salida de datos.
* Interfaces compartidas.
