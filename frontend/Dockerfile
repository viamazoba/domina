# ---------- BUILD (Vite) ----------
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_API_AUTH
ARG VITE_API_TASK
ENV VITE_API_AUTH=${VITE_API_AUTH}
ENV VITE_API_TASK=${VITE_API_TASK}

RUN npm run build

# ---------- SERVE (Nginx) ----------
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
