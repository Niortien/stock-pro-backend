FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Générer Prisma client DANS le container
RUN npx prisma generate

# Build NestJS
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]