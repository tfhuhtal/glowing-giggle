FROM docker.io/node:18-alpine

WORKDIR /opt/app-root/src 

COPY package* ./ 
RUN npm i

CMD ["npm", "run", "dev"]
