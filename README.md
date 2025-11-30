# E-commerce Mueblería Hermanos Jota
Aplicación e-commerce desarrollada con **React (Frontend)** y **Express.js (Backend)**.

---

## Descripción
Proyecto fullstack que implementa una tienda online con catálogo de productos, vista de detalle, carrito de compras y formulario de contacto.  
La aplicación incluye persistencia de datos en **MongoDB Atlas**, endpoints REST para gestión de productos, usuarios y carrito, y autenticación con **JWT**.

---

## Actualizaciones
- Migración de datos estáticos a persistencia real en MongoDB Atlas.
- Implementación de `seed.js` para cargar productos iniciales en la base.
- Refactorización del frontend hacia arquitectura basada en rutas con React Router.
- Validación de formularios con **Formik** y **Yup**.
- Separación clara entre componentes y páginas para escalabilidad.
- Integración completa entre frontend y backend para gestión dinámica de productos.

---

## Enlaces de despliegue
- **Repositorio GitHub**: [hermanos-jota-sprint7-8-](https://github.com/mariacristinazerdanalzogaraiz-alt/hermanos-jota-sprint7-8-)  
- **Frontend (Vercel)**: [_Vercel-HermanosJota_ ](https://hermanos-jota-sprint7-8.vercel.app/) 
- **Backend (Render)**: _[Render-HermanosJota](https://hermanos-jota-sprint7-8.onrender.com)_  

---

## Arquitectura del Proyecto

```
proyecto/
├── backend/                  # API REST Express
│   ├── models/               # Modelos Mongoose (Producto, User, Carrito)
│   ├── routes/               # Rutas CRUD y autenticación
│   ├── controllers/          # Lógica de negocio
│   ├── middleware/           # Middlewares de autenticación y errores
│   ├── data/productos.js     # Array de productos iniciales
│   ├── seed.js               # Script para poblar la base
│   ├── server.js             # Servidor principal
│   └── .env.example          # Variables de entorno de referencia
│
├── client/                   # Aplicación React
│   ├── public/               # Archivos estáticos
│   ├── src/components/       # Componentes reutilizables
│   ├── src/pages/            # Páginas con React Router
│   ├── App.jsx               # Configuración principal
│   └── index.js              # Punto de entrada
│
└── README.md                 # Documentación principal
```


---

## Tecnologías
**Backend**  
- Node.js  
- Express.js  
- MongoDB Atlas + Mongoose  
- JWT (autenticación)  
- dotenv  

**Frontend**  
- React (Vite)  
- React Router  
- Formik + Yup  
- CSS  

---

## Instalación
### Backend
```bash
cd backend
npm install
# crear archivo .env basado en .env.example (MONGO_URI, JWT_SECRET, PORT, etc.)
```

### Frontend
```bash
cd client
npm install
```

## Ejecución

1. Iniciar el backend:
```bash
cd backend
npm run dev
   ```

2. Iniciar el frontend
```bash
cd client
npm run dev
```

---

## API Endpoints (resumen)

GET /api/productos → Listar productos

GET /api/productos/:id → Obtener producto por ID

POST /api/productos → Crear producto

PUT /api/productos/:id → Actualizar producto

DELETE /api/productos/:id → Eliminar producto

POST /api/usuarios/register → Registro de usuario

POST /api/usuarios/login → Login y obtención de token JWT

GET /api/carrito → Ver carrito del usuario

POST /api/carrito → Agregar producto al carrito

DELETE /api/carrito/:id → Eliminar producto del carrito

---

## Funcionalidades del Frontend
Catálogo de productos con carga dinámica desde la API.

Vista de detalle de producto.

Carrito de compras con persistencia.

Formulario de contacto validado.

Panel admin para crear productos.
