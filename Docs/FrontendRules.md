# Reglas para Generación de Frontend

## Tecnologías Obligatorias

* Angular basado en NgModules.
* No utilizar componentes Standalone.
* Bootstrap 5 como framework principal de maquetación.
* Bootstrap Icons para iconografía.
* TypeScript estricto.
* RxJS para manejo reactivo de datos.
* Reactive Forms para formularios.

---

# Arquitectura

La aplicación deberá organizarse siguiendo una arquitectura modular y escalable.

```text
src/app

core/
├── services
├── guards
├── interceptors
├── models

shared/
├── components
├── pipes
├── directives
├── interfaces

features/
├── home
├── products
├── categories
├── banners
├── cart
├── admin
├── settings

layout/
├── navbar
├── sidebar
├── footer
```

---

# Componentes

Los componentes deberán ser reutilizables.

Se deberá hacer uso de:

* @Input()
* @Output()
* EventEmitter

Ejemplo:

```ts
@Input() product!: Product;

@Output() addToCart =
new EventEmitter<Product>();
```

Componentes sugeridos:

```text
shared/components/

product-card
category-card
banner-carousel
search-box
confirm-dialog
loading-spinner
```

---

# Servicios

Todo acceso a datos deberá realizarse mediante servicios.

Ejemplos:

```text
product.service.ts
category.service.ts
banner.service.ts
store.service.ts
cart.service.ts
auth.service.ts
```

No realizar llamadas HTTP directamente desde los componentes.

---

# Formularios

Utilizar exclusivamente Reactive Forms.

Ejemplo:

```ts
FormGroup
FormControl
Validators
```

Validaciones mínimas:

* Campos requeridos.
* Longitud mínima.
* Longitud máxima.
* Valores numéricos válidos.
* Correos electrónicos válidos.

---

# Routing

Utilizar Angular Router.

Rutas sugeridas:

```text
/
├── home
├── products
├── products/:id
├── categories
├── cart
├── admin
│
├── admin/products
├── admin/categories
├── admin/banners
└── admin/settings
```

Implementar Lazy Loading cuando sea posible.

---

# Diseño

La aplicación debe ser completamente responsive.

Se deberá utilizar:

* Bootstrap Grid System.
* Containers.
* Rows.
* Columns.
* Utility Classes.

Componentes visuales recomendados:

* Navbar Bootstrap.
* Cards Bootstrap.
* Tables Bootstrap.
* Forms Bootstrap.
* Modals Bootstrap.
* Alerts Bootstrap.
* Carousel Bootstrap.

---

# Diseño Responsivo

La aplicación deberá funcionar correctamente en:

## Móvil

* 320px+

## Tablet

* 768px+

## Escritorio

* 1200px+

Se debe seguir una estrategia Mobile First.

---

# Convenciones de Nombres

## Componentes

```text
product-list.component.ts
product-detail.component.ts
product-form.component.ts

category-list.component.ts
category-form.component.ts
```

## Servicios

```text
product.service.ts
category.service.ts
banner.service.ts
```

## Interfaces

```text
product.interface.ts
category.interface.ts
api-response.interface.ts
pagination.interface.ts
```

## Modelos

```text
product.model.ts
category.model.ts
store.model.ts
```

---

# Estado de la Aplicación

Mantener la lógica de negocio dentro de servicios.

Los componentes deberán enfocarse únicamente en:

* Mostrar información.
* Capturar eventos del usuario.
* Emitir eventos.

---

# Requisitos Académicos

El frontend debe demostrar claramente:

✅ Uso de Angular.

✅ Uso de Bootstrap como framework de maquetación.

✅ Implementación de componentes reutilizables.

✅ Uso de Inputs y Outputs.

✅ Uso de servicios.

✅ Implementación de al menos un CRUD completo.

✅ Routing y navegación.

✅ Layout responsivo.

✅ Código organizado mediante carpetas y módulos.

---

# Objetivo Comercial

La interfaz deberá ser reutilizable para distintos tipos de negocio.

Toda la información visual deberá ser configurable desde el panel administrativo:

* Nombre del negocio.
* Logo.
* Colores.
* Banners.
* Redes sociales.
* Información de contacto.

El objetivo es reutilizar la misma aplicación para múltiples clientes sin modificar el código fuente.
