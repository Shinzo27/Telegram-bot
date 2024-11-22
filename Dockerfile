FROM node:21-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN chown -R node:node /app && chmod -R 755 /app

RUN npm install -g typescript

RUN npm run build

EXPOSE 3001

USER node

CMD ["npm", "start"]