FROM node:16-alpine

RUN mkdir -p /app

WORKDIR /app

#copy from to
COPY ./ ./

RUN npm install

EXPOSE 3000

CMD ["npm",  "dev"]