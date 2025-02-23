FROM node:18.20.6

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --force

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]