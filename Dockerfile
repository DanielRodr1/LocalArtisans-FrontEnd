# Etapa 1: Construcción de la aplicación Angular
FROM node:18 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración y dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación Angular
RUN npm run build -- --configuration production --project local-artisans-front

# Etapa 2: Servir la aplicación
FROM node:18-alpine

# Instalar http-server
RUN npm install -g http-server

# Crear el directorio donde se almacenarán los archivos de la aplicación
WORKDIR /usr/src/app

# Copiar los archivos construidos desde la etapa de construcción
COPY --from=build /app/dist/local-artisans-front/browser .

# Exponer el puerto
EXPOSE 8080

# Comando de arranque
CMD ["http-server", "-p", "8080", "-c-1"]
