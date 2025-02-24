# 🚖 Taxi24 API - Guía de Ejecución

## 📌 Requisitos Previos
Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes programas:

- [Docker](https://www.docker.com/) 🐳
- (Opcional) [Postman](https://www.postman.com/) para probar los endpoints.

---

## 🚀 Pasos para Ejecutar el Proyecto

### 1️⃣ Clonar el Repositorio
```bash
git clone https://github.com/EricMota04/taxi24.git
cd taxi24-api
```

### 2️⃣ Crear el Archivo `.env`
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
PORT=3000
MONGO_URI=mongodb://root:example@mongo:27017/taxi24?authSource=admin
```

---

## 🐳 Ejecutar con Docker Compose

### 3️⃣ Levantar la API y la Base de Datos
Para iniciar el **backend y la base de datos en Docker**, ejecuta:

```bash
docker-compose up --build
```

Esto realizará lo siguiente:
✅ **Levanta un contenedor con MongoDB** (`mongo`).  
✅ **Levanta un contenedor con la API en NestJS** (`taxi24-api`).  
✅ **Instala todas las dependencias automáticamente**.  
✅ **Expone la API en `http://localhost:3000`**.  

### 4️⃣ Verificar que los contenedores están corriendo
```bash
docker ps
```
Deberías ver los contenedores `taxi24-api` y `taxi24-mongo` en ejecución.

### 5️⃣ Probar la API en Swagger
Abre en tu navegador:
```
http://localhost:3000/api
```
Aquí puedes ver la documentación de la API y probar los endpoints.

---

## 🛠 Comandos Útiles

### 📌 Apagar los contenedores sin eliminar datos:
```bash
docker-compose down
```

### 📌 Apagar los contenedores y eliminar caché de Docker:
```bash
docker-compose down --remove-orphans -v
```

### 📌 Limpiar Docker y volver a compilar todo:
```bash
docker system prune -a
```
```bash
docker-compose up --build
```

### 📌 Ver logs en tiempo real:
```bash
docker logs -f taxi24-api
```

---

## ✅ Notas Importantes
- **Si necesitas cambiar la base de datos**, actualiza la variable `MONGO_URI` en el archivo `.env`.
- **Si encuentras errores de dependencias**, prueba reinstalarlas manualmente:
  ```bash
  docker-compose down --remove-orphans
  docker-compose up --build
  ```
- **Si los cambios en el código no se reflejan en Docker**, borra la caché y reconstruye con:
  ```bash
  docker system prune -a
  docker-compose up --build
  ```

---

🚀 **¡Listo! Ahora puedes usar la API de Taxi24 en NestJS con MongoDB.**

