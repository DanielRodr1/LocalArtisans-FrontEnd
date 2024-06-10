# Etapa 1: Construcción de la aplicación Angular
FROM node:18.17.1 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración y dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación Angular
RUN npm run build --prod

# Etapa 2: Configuración del servidor web
FROM nginx:alpine

# Copiar los archivos construidos al directorio de nginx
COPY --from=build /app/dist/local-artisans-front /usr/share/nginx/html

# Exponer el puerto
EXPOSE 80

# Comando de arranque
CMD ["nginx", "-g", "daemon off;"]
