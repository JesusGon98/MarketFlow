# Explicación del Frontend — MarketFlow

Este documento explica **qué es cada cosa, para qué sirve, cómo se usa y dónde está** dentro de `MarketFlow/FrontEnd`. Está pensado como material de repaso para la exposición.

Tecnología base: **Angular con NgModules** (sin standalone components), **Bootstrap 5**, **RxJS**, **SSR (Angular Universal) con Hydration**.

---

## 1. Arranque de la aplicación

| Archivo | Para qué sirve |
|---|---|
| `src/main.ts` | Punto de entrada en el **navegador**. Llama `bootstrapApplication`/`bootstrapModule` con `AppModule`. Es lo primero que ejecuta el navegador. |
| `src/main.server.ts` | Punto de entrada cuando la app corre **en el servidor** (Node) para generar el HTML inicial (SSR). |
| `src/server.ts` | Servidor Express/Node que sirve la app: recibe la petición HTTP, ejecuta Angular en modo servidor (`main.server.ts`) y devuelve el HTML ya renderizado. |
| `src/app/app.module.ts` | **Módulo raíz** de la app. Aquí se declara `AppComponent`, se importan `LayoutModule` y `AppRoutingModule`, y se registran los providers globales: `provideClientHydration(withEventReplay())` (hidratación SSR), `provideHttpClient(...)` y los **interceptores HTTP** (`StoreInterceptor`, `AuthInterceptor`). |
| `src/app/app.module.server.ts` | Variante del módulo raíz específica para el entorno servidor (SSR). |
| `src/app/app.component.ts/.html` | Componente raíz. Su plantilla normalmente solo tiene `<router-outlet>`, que es donde Angular Router inyecta la vista de la ruta activa. |
| `src/environments/environment*.ts` | Variables de entorno (URL de la API, `storeId`, etc.), diferentes para desarrollo y producción. `environment.interface.ts` define el tipo `IEnvironment`. |

**Cómo se usa en la práctica:** el usuario pide una URL → el servidor (Node/`server.ts`) ejecuta Angular en modo SSR y devuelve HTML ya armado → el navegador descarga el JS y Angular "hidrata" ese HTML (lo reutiliza sin volver a pintarlo) gracias a `provideClientHydration`.

---

## 2. Routing — `app-routing.module.ts`

Es el **mapa de navegación** de toda la app. Define qué componente/módulo se carga para cada URL.

```ts
const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,      // navbar + footer públicos
    children: [
      { path: '', loadChildren: () => import('./features/home/home.module')... },
      { path: 'products', loadChildren: () => import('./features/products/products.module')... },
      { path: 'categories', loadChildren: () => ... },
      { path: 'cart', loadChildren: () => ... },
      { path: 'contact', loadChildren: () => ... },
    ],
  },
  { path: 'admin/login', loadChildren: () => import('./features/auth/auth.module')... },
  {
    path: 'admin',
    component: AdminLayoutComponent,        // sidebar admin
    canActivate: [authGuard],               // protegido
    loadChildren: () => import('./features/admin/admin.module')...
  },
  { path: '**', redirectTo: '' },
];
```

Conceptos clave para la expo:
- **Lazy loading** (`loadChildren`): cada feature se descarga como un *chunk* JS separado solo cuando el usuario navega ahí (lo vimos en el build: `products-module`, `admin-module`, etc.). Mejora el tiempo de carga inicial.
- **Layouts anidados**: las rutas públicas son hijas de `PublicLayoutComponent`, las de admin son hijas de `AdminLayoutComponent`. Así cada zona tiene su propio navbar/sidebar sin repetir código.
- **Guard** (`canActivate: [authGuard]`): impide entrar a `/admin` sin sesión.

Cada feature tiene además su propio `*-routing.module.ts` con las rutas internas (ejemplo `products-routing.module.ts`: `''` → lista, `:id` → detalle).

---

## 3. `core/` — cosas que existen una sola vez en toda la app

### `core/services/` — acceso a datos (HTTP)

| Servicio | Para qué sirve |
|---|---|
| `product.service.ts` | CRUD de productos contra la API (`GET/POST/PUT/DELETE /products`). |
| `category.service.ts` | CRUD de categorías. |
| `banner.service.ts` | CRUD de banners promocionales. |
| `cart.service.ts` | Lógica del carrito de compras (agregar, quitar, calcular total). Normalmente guarda el estado en memoria/localStorage, no llama a la API. |
| `auth.service.ts` | Login y manejo del token JWT (guardarlo, leerlo, cerrar sesión). |
| `store.service.ts` | Datos de la tienda actual (nombre, logo, colores, redes sociales) — soporta el modelo "multi-tienda". |

**Cómo se usan:** se inyectan por constructor en los componentes (Inyección de Dependencias de Angular):
```ts
constructor(private readonly productService: ProductService) {}
```
y se llaman sus métodos, que regresan `Observable` (RxJS) porque usan `HttpClient`.

Regla del proyecto (ver `FrontendRules.md`): **los componentes nunca llaman `HttpClient` directamente**, siempre pasan por un servicio.

### `core/interceptors/` — middlewares de las peticiones HTTP

| Interceptor | Para qué sirve |
|---|---|
| `auth.interceptor.ts` | Añade el header `Authorization: Bearer <token>` a las peticiones que lo necesitan. |
| `store.interceptor.ts` | Añade automáticamente el `storeId` (u otro dato de la tienda) a cada request, para que la API sepa de qué negocio es la petición. |

Se registran una sola vez en `app.module.ts` con `HTTP_INTERCEPTORS` y a partir de ahí actúan sobre **todas** las llamadas HTTP de la app, sin que cada componente tenga que hacer nada extra.

### `core/guards/auth.guard.ts`

Función que Angular Router ejecuta antes de activar una ruta protegida. Si no hay token/sesión válida, redirige (normalmente a `/admin/login`) y bloquea el acceso a `/admin`.

### `core/models/`

Clases/interfaces TypeScript que representan las entidades de negocio: `product.model.ts`, `category.model.ts`, `banner.model.ts`, `cart-item.model.ts`, `store.model.ts`, `user.model.ts`, `auth.model.ts`. Se usan para tipar lo que devuelven los servicios y lo que reciben los componentes — así TypeScript avisa en compilación si algo no coincide.

---

## 4. `shared/` — reutilizable entre features

Todo lo que importan **dos o más** features pasa por aquí, vía `SharedModule` (`shared/shared.module.ts`).

### `shared/components/`

| Componente | Para qué sirve | Dónde se usa |
|---|---|---|
| `product-card` | Tarjeta visual de un producto (imagen, nombre, precio, botón "Agregar"). Usa `@Input() product` para recibir el producto y `@Output() addToCart` (EventEmitter) para avisar al padre cuando se da clic. | Listado de productos, home (destacados). |
| `category-card` | Tarjeta de una categoría. | Listado de categorías, home. |
| `banner-carousel` | Carrusel de banners promocionales (Bootstrap Carousel). | Home. |
| `search-box` | Input de búsqueda reutilizable, emite el término buscado por `@Output()`. | Listado de productos. |
| `confirm-dialog` | Modal de confirmación genérico ("¿Seguro que deseas eliminar?"). | Pantallas admin (eliminar producto/categoría/banner). |
| `loading-spinner` | Indicador visual de carga. | Cualquier pantalla mientras `loading = true`. |

Este bloque es el ejemplo más claro para la exposición de **`@Input()` / `@Output()` / `EventEmitter`** y **componentes reutilizables**, requisitos académicos explícitos del proyecto.

### `shared/interfaces/`
- `api-response.interface.ts`: forma estándar de la respuesta de la API (ej. `{ data, meta }`).
- `pagination.interface.ts`: forma de los metadatos de paginación (página actual, total, etc.).

### `shared/pipes/currency-mxn.pipe.ts`
Pipe personalizado de Angular para formatear números como moneda mexicana (ej. `150` → `$150.00 MXN`). Se usa en plantillas HTML así: `{{ product.price | currencyMxn }}`.

---

## 5. `layout/` — estructura visual de cada zona

| Componente | Para qué sirve |
|---|---|
| `navbar` | Barra de navegación superior del sitio público (logo, enlaces, carrito). |
| `footer` | Pie de página del sitio público. |
| `public-layout` | Envuelve `navbar` + `<router-outlet>` + `footer`. Es el componente padre de todas las rutas públicas. |
| `sidebar` | Menú lateral del panel administrativo. |
| `admin-layout` | Envuelve `sidebar` + `<router-outlet>`. Es el padre de todas las rutas `/admin/*`. |

`layout.module.ts` agrupa y declara todos estos componentes para que `AppModule` los pueda usar.

---

## 6. `features/` — un módulo por sección de negocio

Cada carpeta es un **módulo lazy-loaded** independiente: tiene su propio `*.module.ts` (declara componentes e importa `SharedModule`) y su propio `*-routing.module.ts` (rutas internas).

### Tienda pública

| Feature | Componentes | Qué hace |
|---|---|---|
| `home/` | `home.component` | Página de inicio: banner principal, productos/categorías destacadas. |
| `products/` | `product-list`, `product-detail` | Catálogo con búsqueda y filtro por categoría (`product-list`), ficha de un producto (`product-detail`). |
| `categories/` | `category-list` | Listado de categorías disponibles. |
| `cart/` | `cart` | Carrito de compras: ver/quitar productos, modificar cantidad, total. |
| `contact/` | `contact` | Información de contacto, redes sociales, WhatsApp. |

### Autenticación y administración

| Feature | Componentes | Qué hace |
|---|---|---|
| `auth/` | `login` | Formulario de login (Reactive Forms) para acceder al panel admin. |
| `admin/` | `dashboard`, `settings` + submódulos `products/`, `categories/`, `banners/` | Panel administrativo. `dashboard` muestra totales (productos, categorías, sin stock). `settings` configura datos de la tienda. Cada submódulo (`products`, `categories`, `banners`) tiene su **CRUD completo**: `*-list` (tabla con datos) + `*-form` (alta/edición). |

**Ejemplo de flujo real — `product-list.component.ts` (features/products):**
```ts
ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    this.selectedCategoryId = params['categoryId'] ?? '';
    this.loadData();
  });
}

private loadData(): void {
  this.loading = true;
  forkJoin({ products: ..., categories: ... }).subscribe(...) // pide ambos a la vez
}
```
Esto es un buen ejemplo para explicar: suscripción a `queryParams` (la URL maneja el filtro de categoría), `forkJoin` de RxJS (combina dos peticiones HTTP en paralelo), y la bandera `loading` que controla el `loading-spinner`.

---

## 7. SSR + Hydration (tema importante, y donde está el bug pendiente)

- La app se renderiza primero en el servidor (`main.server.ts` + `server.ts`) → mejor SEO y primera carga más rápida.
- `provideClientHydration(withEventReplay())` en `app.module.ts` hace que el navegador **reutilice** ese HTML en vez de volver a pintarlo desde cero, y además "reproduce" (`withEventReplay`) los eventos (clics, etc.) que el usuario hizo mientras la app terminaba de cargar en el cliente.
- **Bug conocido, aún sin resolver:** después de la hidratación inicial, al navegar por SPA (clic en un `routerLink`) a veces la vista nueva se queda en "Cargando..." aunque los datos ya llegaron — y se "destraba" si se vuelve a hacer clic en el mismo enlace. Se investigó a fondo (interceptores de zona, `ApplicationRef.tick()`, builds de producción) sin encontrar la causa raíz todavía. Es útil mencionarlo en la expo como un reto técnico real encontrado al usar SSR + hydration, no necesariamente intentar resolverlo en vivo.

---

## 8. Mapa rápido "¿dónde toco si quiero...?"

| Quiero... | Voy a... |
|---|---|
| Agregar un campo nuevo a "Producto" | `core/models/product.model.ts` + `core/services/product.service.ts` + el form en `features/admin/products/product-form/` |
| Cambiar el diseño del navbar | `layout/navbar/` |
| Agregar una tarjeta reutilizable nueva | `shared/components/` + declararla en `shared/shared.module.ts` |
| Agregar una página pública nueva | nueva carpeta en `features/` con su `*.module.ts` y `*-routing.module.ts`, y registrar el `loadChildren` en `app-routing.module.ts` |
| Proteger una ruta nueva | usar `canActivate: [authGuard]` en su definición de ruta |
| Cambiar qué se manda en cada petición HTTP | `core/interceptors/` |

---

## 9. Checklist de requisitos académicos cubiertos (para mencionarlo explícitamente en la expo)

- ✅ Angular con NgModules — toda la app.
- ✅ Bootstrap 5 — maquetación general.
- ✅ Componentes reutilizables con `@Input()`/`@Output()`/`EventEmitter` — `shared/components/*`.
- ✅ Servicios para todo acceso a datos — `core/services/*`.
- ✅ CRUD completo — Productos, Categorías y Banners en `features/admin/*`.
- ✅ Routing y navegación — `app-routing.module.ts` + routing por feature.
- ✅ Layout responsivo — `layout/public-layout`, `layout/admin-layout`.
- ✅ Código organizado por módulos/carpetas — `core/`, `shared/`, `layout/`, `features/`.
