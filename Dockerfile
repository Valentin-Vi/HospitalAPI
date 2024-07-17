FROM node:20

WORKDIR /home/valentin/Programacion/hopital-api-v2

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]