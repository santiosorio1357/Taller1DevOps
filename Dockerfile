# Utiliza la imagen oficial de Node.js 16
FROM node:16

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos package.json y package-lock.json al contenedor
COPY package.json .
COPY package-lock.json .

# Instala las dependencias del proyecto
RUN npm install

# Copia el código fuente del proyecto al contenedor
COPY src .

# Construye la aplicación
RUN npm run build

# Expone el puerto 3000 en el contenedor
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
