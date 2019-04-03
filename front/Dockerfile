FROM node:alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build
RUN npm prune --production


# multi-stage builds
FROM nginx:alpine

COPY --from=0 /usr/src/app/build /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/site-enabled/default.conf
