# Modelo de Base de Datos

## Store

Representa una tienda o negocio.

Campos:

* id
* name
* logoUrl
* phone
* email
* address
* primaryColor
* secondaryColor
* createdAt
* updatedAt

## Category

Representa categorías de productos.

Campos:

* id
* storeId
* name
* description
* createdAt
* updatedAt

## Product

Representa productos vendidos por la tienda.

Campos:

* id
* storeId
* categoryId
* name
* description
* price
* stock
* imageUrl
* active
* createdAt
* updatedAt

## Banner

Representa banners promocionales.

Campos:

* id
* storeId
* title
* imageUrl
* displayOrder
* active

## User

Usuarios administrativos.

Campos:

* id
* name
* email
* passwordHash
* role
* createdAt

## Relaciones

Store
├── Categories
├── Products
├── Banners
└── Users

Category
└── Products
