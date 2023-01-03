FROM node:16-alpine

RUN mkdir -p /app

# create the working directory for your application which stores your code
WORKDIR /app

# wildcard is used to ensure both package.json and package-lock.json are copied 
COPY package*.json ./

# Install app dependencies 
RUN npm install

#copy from to copying all files not in .dockerignore file
COPY . .


EXPOSE 3000

CMD ["npm",  "dev"]