# 💜 E-Commerce Ignite Beauty Shop

SPA (Single Page Application) de e-commerce de productos de belleza (skincare, makeup, haircare, fragancias, cuidado corporal y herramientas). Una aplicación completamente funcional con autenticación, catálogo de productos, carrito persistente, órdenes reales y panel administrativo con gestión de productos e imágenes en AWS S3.

---

**Vercel Live Demo:**
👉 https://proyecto-m5-katy-tejada.vercel.app/

---

## 🛠️ Stack técnico

| Capa                              | Tecnologías                                                                |
| --------------------------------- | -------------------------------------------------------------------------- |
| **Frontend**                      | React 18 + TypeScript + Vite + React Router v7 + TailwindCSS + Context API |
| **Autenticación & Base de datos** | Firebase Authentication (email/password + Google OAuth) + Firestore        |
| **Almacenamiento de archivos**    | AWS S3 (imágenes de productos con presigned URLs)                          |
| **Backend Serverless**            | Vercel Serverless Functions (generación de presigned URLs)                 |
| **Testing**                       | Vitest + React Testing Library + jsdom                                     |
| **Linting & Formatting**          | ESLint + TypeScript strict mode                                            |
| **Deploy**                        | Vercel + GitHub Actions (CI/CD automático)                                 |

---

## 🏗️ Decisiones arquitectónicas

### Organización de archivos y responsabilidades

- **Separación de `App.tsx`, `AppRouter.tsx` y `AppProviders.tsx`**:
  - `App.tsx`: Solo monta el árbol de providers y rutas
  - `AppRouter.tsx`: Centraliza toda la configuración de navegación y rutas protegidas
  - `AppProviders.tsx`: Agrupa todos los contextos globales (Auth, Cart)
  - Cada archivo tiene una sola responsabilidad, facilitando testing y mantenimiento

- **`AppProviders` dentro de `contexts/`**:
  - En lugar de vivir en la raíz de `src/`, se ubicó junto a `AuthContext` y `CartContext`
  - Toda la lógica de estado global está centralizada en una sola carpeta
  - Mejora la colocación y escalabilidad

### Gestión de estado global

- **Context API + useReducer para el carrito**:
  - El carrito tiene múltiples acciones: agregar, quitar, actualizar cantidad, vaciar
  - Lógica centralizada en `cartReducer.ts` (reducer puro, sin side effects)
  - Separación clara entre reducers y contextos permite testing sin renderizar componentes
  - El carrito se persiste automáticamente en `localStorage` bajo la clave `ecommerce_cart`

- **AuthContext para autenticación**:
  - Gestiona el estado actual del usuario autenticado
  - Monitorea cambios de autenticación con `onAuthStateChanged`
  - Centraliza métodos de login, logout, registro y login con Google

### Servicios como capa de abstracción

- **Patrón de servicio único**:
  - Ningún componente llama directamente a Firestore, Firebase Auth o AWS
  - `services/` contiene toda la lógica de acceso a datos y APIs externas:
    - `auth.service.ts`: Manejo de registro, login, logout
    - `products.service.ts`: CRUD de productos, búsqueda, filtrado
    - `orders.service.ts`: Creación, lectura y actualización de órdenes
    - `storage.service.ts`: Subida de imágenes a S3 mediante presigned URLs
    - `firebase.ts`: Configuración e inicialización de Firebase
  - Ventajas:
    - Facilita el mockeo en tests (todo está en un lugar)
    - Centraliza cambios futuros de proveedor
    - Componentes desacoplados de implementación interna

### Estructura de testing

- **Tests separados del código fuente**:
  - En lugar de co-ubicar tests junto a cada archivo, están centralizados en `__tests__/`
  - Subcarpetas por tipo: `components/`, `hooks/`, `reducers/`, `integration/`, `services/`
  - Mantiene una clara separación entre lógica de negocio y verificación
  - Mejor legibilidad y organización en proyectos grandes

### Reutilización de componentes

- **Mismo componente para crear y editar productos**:
  - `ProductForm.tsx` maneja ambos casos según la presencia de un `id` en la URL
  - Evita duplicar lógica de formulario entre "crear" y "editar"
  - Utiliza `useParams()` para obtener el ID del producto a editar

---

## 📁 Estructura del proyecto

```
src/
├── components/                # Componentes reutilizables
│   ├── admin/                # Componentes exclusivos del panel admin
│   ├── cart/                 # Componentes del carrito
│   │   └── CartItem.tsx      # Representa un item del carrito
│   ├── layout/               # Layouts de la aplicación
│   │   ├── AdminLayout.tsx   # Layout con navegación admin
│   │   ├── CustomerLayout.tsx # Layout público/customer
│   │   └── Navbar.tsx        # Barra de navegación
│   ├── orders/               # Componentes de órdenes
│   │   └── OrderCard.tsx     # Tarjeta de información de orden
│   ├── products/             # Componentes de productos
│   │   ├── ProductCard.tsx   # Tarjeta individual de producto
│   │   └── ProductGrid.tsx   # Grilla de productos
│   └── ui/                   # Componentes UI básicos
│       ├── Button.tsx        # Botón reutilizable
│       ├── Input.tsx         # Input reutilizable
│       └── ConfirmDialog.tsx # Diálogo de confirmación
│
├── contexts/                 # Contextos de estado global
│   ├── AppProviders.tsx      # Proveedor raíz que agrupa todos los contextos
│   ├── AuthContext.tsx       # Contexto de autenticación
│   ├── CartContext.tsx       # Contexto del carrito
│   ├── cartReducer.ts        # Reducer puro del carrito
│   └── index.ts              # Exports centralizados
│
├── hooks/                    # Hooks personalizados
│   ├── useAuth.ts            # Acceso simplificado al contexto de auth
│   ├── useCart.ts            # Acceso simplificado al contexto del carrito
│   ├── useDebounce.ts        # Hook genérico de debounce
│   └── useProducts.ts        # Fetch y filtrado de productos con debounce
│
├── pages/                    # Páginas/vistas (componentes de página)
│   ├── Home.tsx              # Landing page
│   ├── auth/                 # Páginas de autenticación
│   │   ├── Login.tsx         # Formulario de login
│   │   └── Register.tsx      # Formulario de registro
│   ├── products/             # Páginas de productos
│   │   ├── Catalog.tsx       # Catálogo con filtro y búsqueda
│   │   └── ProductDetail.tsx # Detalle de un producto
│   ├── cart/                 # Páginas del carrito
│   │   ├── Cart.tsx          # Visualización del carrito
│   │   └── Checkout.tsx      # Simulación de checkout y creación de orden
│   ├── orders/               # Páginas de órdenes
│   │   └── Orders.tsx        # Historial de órdenes del usuario
│   └── admin/                # Páginas del panel admin
│       ├── Dashboard.tsx      # Panel de bienvenida admin
│       ├── AdminProducts.tsx  # CRUD de productos
│       ├── ProductForm.tsx    # Formulario crear/editar producto
│       └── AdminOrders.tsx    # Gestión de órdenes
│
├── routes/                   # Configuración de enrutamiento
│   ├── AppRouter.tsx         # Definición de todas las rutas
│   └── ProtectedRoute.tsx    # Componente que protege rutas por rol
│
├── services/                 # Servicios (capa de acceso a datos)
│   ├── firebase.ts           # Inicialización de Firebase
│   ├── auth.service.ts       # Servicios de autenticación
│   ├── products.service.ts   # CRUD y búsqueda de productos
│   ├── orders.service.ts     # Manejo de órdenes
│   └── storage.service.ts    # Subida de imágenes a S3
│
├── types/                    # Tipos TypeScript
│   ├── product.types.ts      # Tipos de Product, ProductCategory
│   ├── order.types.ts        # Tipos de Order, CartItem, OrderStatus
│   └── user.types.ts         # Tipos de User, UserRole
│
├── utils/                    # Funciones utilitarias
│
├── __tests__/                # Suite de tests
│   ├── setup.ts              # Configuración global de tests
│   ├── components/           # Tests de componentes
│   ├── hooks/                # Tests de hooks
│   ├── reducers/             # Tests de reducers
│   ├── services/             # Tests de servicios
│   └── integration/          # Tests de integración
│
├── App.css                   # Estilos globales
├── App.tsx                   # Componente raíz
├── index.css                 # Estilos globales de CSS
├── main.tsx                  # Entry point
└── vite-env.d.ts             # Tipos de Vite
```

---

## 🖼️ Flujo de subida de imágenes a S3

Las imágenes de productos nunca pasan por el backend de la aplicación ni exponen credenciales de AWS en el navegador.

### Pasos del flujo

```
1. Admin selecciona archivo en ProductForm.tsx
                ↓
2. Frontend llama uploadProductImage() en storage.service.ts
                ↓
3. POST a /api/upload-image (función serverless Vercel)
                ↓
4. Serverless genera presigned URL temporal (válida 60s)
                ↓
5. Frontend recibe URL y hace PUT directo a S3
                ↓
6. S3 devuelve URL pública del archivo
                ↓
7. URL se guarda en Firestore como imageUrl del producto
```

### Ventajas de este patrón

- ✅ **Seguridad**: Credenciales AWS nunca llegan al navegador
- ✅ **Eficiencia**: Archivos se suben directo a S3, sin pasar por tu backend
- ✅ **Escalabilidad**: S3 maneja uploads de forma más confiable que un servidor propio
- ✅ **Costo**: No gastás ancho de banda de tu servidor en subidas

### Presigned URL

- URL temporal firmada que autoriza un PUT específico a un archivo S3
- Válida por 60 segundos
- No requiere credenciales en el navegador
- Configuración de CORS del bucket permite origen del frontend

---

## ✨ Funcionalidades principales

### ✅ Autenticación

- Registro con email/password
- Login con email/password
- Login con Google OAuth (creación automática de usuario en Firestore)
- Logout
- Recuperación automática de sesión al recargar

### ✅ Catálogo de productos

- Listado de todos los productos
- Búsqueda por nombre (con debounce de 500ms)
- Filtrado por categoría
- Vista de detalle de producto
- Información completa: precio, descripción, stock, categoría

### ✅ Carrito de compras

- Agregar/quitar productos
- Actualizar cantidad
- Cálculo automático de total
- Persistencia en localStorage
- Visualización clara de items y precios

### ✅ Checkout y órdenes

- Simulación de checkout
- Creación de órdenes reales en Firestore
- Historial de órdenes del usuario
- Estados de orden (pending, processing, completed, cancelled)

### ✅ Panel de administración

- **Dashboard**: Estadísticas y navegación
- **CRUD de productos**:
  - Crear nuevo producto con upload de imagen
  - Editar producto existente
  - Eliminar producto
  - Descripción, precio, categoría, stock
- **Gestión de órdenes**:
  - Visualizar todas las órdenes
  - Cambiar estado de orden
  - Ver detalles de cada orden

### ✅ Seguridad

- Autenticación con Firebase
- Rutas protegidas por rol (customer/admin)
- Reglas de seguridad en Firestore basadas en roles
- Validación en cliente y servidor
- No expone credenciales AWS

### ✅ Testing

- Tests unitarios de componentes
- Tests de hooks personalizados
- Tests de reducers puros
- Tests de servicios (con mocks)
- Tests de integración
- Mocks de Firebase y AWS

---

## 🚀 Instalación y configuración

### Requisitos previos

- **Node.js 18 o superior**
- **npm** (viene con Node.js)
- **Cuenta Firebase**: Proyecto con Authentication + Firestore habilitados
- **Cuenta AWS**: S3 bucket configurado
- **Cuenta Vercel**: Para deploying (opcional, pero recomendado para la parte serverless)

### Pasos de instalación

#### 1. Clonar el repositorio

```bash
git clone https://github.com/Katy-T20/ProyectoM5_KatyTejada.git
cd ProyectoM5_KatyTejada
```

#### 2. Instalar dependencias

```bash
npm install
```

#### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

**Variables de Firebase (prefijo `VITE_` = expuestas al frontend):**

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

**Variables de AWS (SIN prefijo = solo en serverless):**

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_S3_BUCKET_NAME`
- `AWS_REGION`

> **Nota**: Las variables sin prefijo `VITE_` no se exponen al cliente. Solo la función serverless `/api/upload-image` puede accederlas.

#### 4. Correr en desarrollo

**Opción A: Modo desarrollo (sin función serverless)**

```bash
npm run dev
```

- No puede probar subida de imágenes a S3
- Ideal para desarrollo de features que no usan S3

**Opción B: Modo desarrollo completo (con función serverless)**

```bash
npm run dev:full
```

- Requiere instalar Vercel CLI: `npm install -g vercel`
- Ejecuta función serverless localmente
- Puedes probar subida de imágenes

#### 5. Correr tests

```bash
npm run test
```

Ver tests en modo UI:

```bash
npm run test:ui
```

Generar reporte de cobertura:

```bash
npm run coverage
```

#### 6. Build para producción

```bash
npm run build
```

Esto genera:

- `dist/` con el bundle optimizado del frontend
- Funciones serverless compiladas para Vercel

---

## 🔍 Decisiones de seguridad

### Firestore Rules

- **Lectura de productos**: Pública (cualquiera puede listar/buscar)
- **Escritura de productos**: Solo admins (validado por Firestore Rules)
- **Lectura de órdenes**: Solo el propietario o admins
- **Escritura de órdenes**: Solo el cliente propietario (crear orden)
- **Actualización de órdenes**: Solo admins (cambiar estado)

### Firebase Authentication

- Email/password: Validación de contraseña fuerte recomendada
- Google Auth: Delegado a Google, más seguro
- Session storage: Manejado por Firebase automáticamente

### AWS S3

- Presigned URLs: Válidas solo por 60 segundos
- CORS configurado: Solo el dominio del frontend puede hacer requests
- Permisos mínimos: Bucket solo permite lectura pública y uploads vía presigned URL

---

## 🌍 Deployment

### Deploy en Vercel (recomendado)

1. Push a GitHub
2. Conecta repo en https://vercel.com
3. Vercel detecta `vite.config.ts` y `api/` automáticamente
4. Configura variables de entorno en Vercel dashboard
5. Deploy automático en cada push a `main`

---

## 🎓 Uso de la IA en el desarrollo

A lo largo del desarrollo de la app usé Claude como asistente técnico para planificar arquitectura y decisiones de diseño, resolver bugs de configuración complejos, validar decisiones de seguridad y generacion de tests. La siguiente documentacion explica mas en detalle la asistencia de la AI.

#### 1. Decisión de arquitectura: separar rutas, providers y App.tsx

Al iniciar el proyecto, discutí cómo organizar la raíz de `src/`. La IA me sugirió que cada archivo tenga una responsabilidad clara: `App.tsx` (monta providers), `AppRouter.tsx` (define rutas), `AppProviders.tsx` (agrupa contextos). También decidimos que `AppProviders` debería vivir en `contexts/` junto con los demás contextos, no en la raíz. **Aprendí**: El principio de responsabilidad única aplica no solo a componentes, sino a la organización de carpetas.

#### 2. Resolución de bug: el alias `@` en TypeScript

Configuré el alias `@` en `vite.config.ts` y `tsconfig.json`, pero VS Code seguía marcando error. La IA me explicó que mi proyecto usa configuración de TypeScript "compuesta" (project references): `tsconfig.app.json` es el que realmente compila `src/`. El alias debía declararse ahí específicamente. **Aprendí**: En proyectos con múltiples `tsconfig.json`, hay que identificar cuál aplica a cada parte del código.

#### 3. Decisión de seguridad: Firestore Rules basadas en roles

Diseñé junto con la IA una función `isAdmin()` que consulta el propio documento del usuario en Firestore para verificar su rol, en lugar de confiar en información del cliente. Agregamos restricciones con `diff().affectedKeys().hasOnly([...])` para que un admin no pueda alterar items u totales de una orden. **Aprendí**: Las reglas de seguridad deben reflejar la lógica de negocio, pero sin depender de que el frontend la respete.

#### 4. Integración de AWS S3 con presigned URLs

No tenía experiencia subiendo archivos a S3 desde un frontend. La IA me explicó el patrón: una función serverless (con credenciales de AWS) genera una URL temporal y firmada, el navegador sube directo a S3 usando esa URL, sin pasar por tu backend. Esto me obligó a entender CORS en S3 y por qué las variables de entorno sin prefijo `VITE_` no se exponen al cliente. **Aprendí**: La arquitectura de seguridad en uploads es crucial; hay patrones estándar que evitan exponer credenciales.

#### 5. Testing: mockear Firebase y AWS

Para testear hooks sin depender de servicios reales, usé `vi.mock()` para sustituir tanto mis servicios como el SDK de Firestore. La IA me explicó la diferencia entre mockear "mi código" (verificar que mi lógica funciona) versus mockear "la librería externa" (verificar que uso correctamente lo que devuelve Firestore). También aprendí a usar `renderHook` con `wrapper` para aislar hooks que dependen de Context API. **Aprendí**: Testing requiere dos perspectivas: verificar tu lógica Y verificar que tu código maneja bien datos externos.

---

## 👤 Author

**Katy Tejada** - [@Katy-T20](https://github.com/Katy-T20)

**Version**: 1.0.0 | **Status**: ✅ Production Ready | **Last Updated**: June 2026
