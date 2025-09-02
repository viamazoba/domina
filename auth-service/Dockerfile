FROM 22.19.0-bullseye

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /index.ts

# Copia los archivos de configuración de dependencias
COPY package*.json ./
COPY tsconfig.json ./

# Instala las dependencias (incluyendo TypeScript)
RUN npm install

# Copia TODO el código fuente
COPY . .