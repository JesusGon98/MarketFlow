# Retail Template

## Descripción General

Retail Template es una plataforma web de comercio electrónico desarrollada como una solución reutilizable para pequeños y medianos negocios que venden productos al por menor.

El objetivo es construir una única aplicación capaz de adaptarse a distintos tipos de negocio mediante configuración, sin necesidad de modificar el código fuente.

La plataforma permitirá administrar productos, categorías, promociones, banners e información del negocio desde un panel administrativo.

Inicialmente será desarrollada como proyecto académico, pero la arquitectura deberá permitir su evolución a un producto comercial que pueda ser vendido a múltiples clientes.

---

# Objetivos del Proyecto

## Objetivo Académico

Cumplir con los requisitos establecidos para la entrega final:

* Aplicación desarrollada con Angular.
* Uso de framework de maquetación.
* Creación de componentes reutilizables.
* Uso de Inputs y Outputs.
* Uso de servicios.
* Implementación de al menos un CRUD completo.
* Routing y navegación.
* Layout responsive.
* Código organizado por carpetas y responsabilidades.

## Objetivo Comercial

Construir una plataforma reutilizable que pueda comercializarse posteriormente para distintos negocios.

La personalización deberá realizarse desde configuración y no mediante cambios en código.

---

# Tipos de Negocio Soportados

La plataforma deberá poder adaptarse a:

* Tiendas de saldos
* Papelerías
* Ferreterías
* Tiendas de ropa
* Electrónicos
* Refaccionarias
* Abarrotes
* Tiendas de conveniencia
* Negocios locales

---

# Arquitectura Tecnológica

## Frontend

Tecnologías principales:

* Angular
* Bootstrap 5
* Bootstrap Icons
* RxJS
* TypeScript

## Backend

Tecnologías principales:

* NestJS
* Prisma ORM
* JWT Authentication

## Base de Datos

* PostgreSQL

## Infraestructura

* Docker
* Docker Compose

---

# Restricciones Técnicas

## Angular

* Utilizar NgModules.
* No utilizar componentes Standalone.
* Utilizar Lazy Loading cuando sea posible.
* Utilizar Reactive Forms.

## Código

* Aplicar principios SOLID.
* Mantener separación de responsabilidades.
* Utilizar interfaces para tipado.
* Mantener una estructura escalable y mantenible.

---

# Requisitos Académicos

## Aplicación Angular

Toda la interfaz deberá desarrollarse utilizando Angular.

## Framework de Maquetación

Utilizar Bootstrap 5 como framework principal de maquetación.

## Componentes

Se deberá demostrar claramente el uso de:

* @Input()
* @Output()
* EventEmitter

mediante componentes reutilizables.

## Servicios

Toda la comunicación con datos deberá realizarse mediante servicios.

## CRUD

Implementar al menos un CRUD completo.

Se implementarán:

* CRUD de Productos
* CRUD de Categorías
* CRUD de Banners

## Routing

Implementar navegación mediante Angular Router.

## Layout

Implementar layout consistente para:

* Área pública
* Área administrativa

## Responsive

La aplicación deberá funcionar correctamente en:

* Celulares
* Tablets
* Equipos de escritorio

## Organización

El código deberá estar organizado mediante:

* Módulos
* Componentes
* Servicios
* Interfaces
* Modelos
* Carpetas especializadas

---

# Funcionalidades Principales

## Tienda Pública

### Inicio

* Banner principal
* Productos destacados
* Categorías destacadas
* Información del negocio

### Catálogo

* Visualización de productos
* Búsqueda por nombre
* Filtrado por categoría

### Detalle de Producto

* Imagen
* Descripción
* Precio
* Existencias

### Carrito

* Agregar productos
* Eliminar productos
* Modificar cantidades
* Calcular total

### Contacto

* Información del negocio
* Redes sociales
* WhatsApp

---

# Panel Administrativo

## Dashboard

Mostrar información general:

* Total de productos
* Total de categorías
* Productos sin stock
* Últimos productos agregados

## Productos

CRUD completo de productos.

Campos:

* Nombre
* Descripción
* Precio
* Existencias
* Categoría
* Imagen
* Estado

## Categorías

CRUD completo de categorías.

Campos:

* Nombre
* Descripción
* Estado

## Banners

CRUD completo de banners.

Campos:

* Título
* Imagen
* Orden
* Estado

## Configuración

Configuración general de la tienda.

---

# Configuración Dinámica

La plataforma deberá permitir modificar:

## Información General

* Nombre del negocio
* Teléfono
* Correo electrónico
* Dirección
* Horarios

## Imagen Corporativa

* Logo
* Colores principales
* Colores secundarios

## Redes Sociales

* Facebook
* Instagram
* TikTok
* WhatsApp

## Apariencia

* Banners promocionales
* Productos destacados
* Configuraciones visuales

---

# Arquitectura Multi-Tienda

La aplicación deberá diseñarse desde el inicio para soportar múltiples negocios.

Todas las entidades comerciales deberán estar asociadas a una tienda.

Ejemplos:

Store
├── Products
├── Categories
├── Banners
└── Users

Esto permitirá reutilizar la misma plataforma para distintos clientes en el futuro.

---

# Manejo de Imágenes

Las imágenes no deberán almacenarse dentro de la base de datos.

La base de datos únicamente almacenará la URL de cada imagen.

La arquitectura deberá ser compatible con:

* Cloudflare R2
* Supabase Storage
* AWS S3

---

# Persistencia

Durante el desarrollo podrán utilizarse datos simulados.

La versión final deberá utilizar PostgreSQL mediante Prisma ORM.

---

# Despliegue

La aplicación deberá ser compatible con:

* Railway
* Render
* VPS Linux
* AWS

La configuración deberá realizarse mediante variables de entorno.

---

# Visión a Futuro

El proyecto deberá mantenerse preparado para evolucionar a una plataforma SaaS.

Objetivos futuros:

* Múltiples tiendas.
* Administración de pedidos.
* Administración de clientes.
* Inventario avanzado.
* Reportes.
* Integración con pagos en línea.
* Integración con Mercado Pago.
* Integración con Stripe.
* Integración con WhatsApp Business.

---

# Objetivo Final

Desarrollar una plataforma moderna, escalable y reutilizable que cumpla los requisitos académicos actuales y que pueda convertirse posteriormente en un producto comercial listo para ser vendido a múltiples negocios.
