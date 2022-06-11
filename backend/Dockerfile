FROM strapi/base:14

WORKDIR /app

COPY . .

#ENV NODE_ENV production 
ENV NODE_ENV development 

RUN npm install
RUN npm run build

EXPOSE 1337

#CMD ["npm", "run", "docker"]
CMD ["npm", "run", "dev"]

