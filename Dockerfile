FROM node:21-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN chown -R node:node /app && chmod -R 755 /app

RUN npm run build

USER node

CMD ["npm", "start"]