# Reglas para Generación de API

Todos los endpoints deberán:

* Seguir REST.
* Utilizar DTOs.
* Utilizar validaciones con class-validator.
* Utilizar Prisma ORM.
* Retornar respuestas consistentes.
* Manejar excepciones mediante Exception Filters.

Formato de respuesta:

{
"success": true,
"message": "Operation completed",
"data": {}
}

Rutas ejemplo:

GET /products

GET /products/:id

POST /products

PUT /products/:id

DELETE /products/:id

Todas las entidades deberán estar asociadas a una Store.
