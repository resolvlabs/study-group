## Node.js with MongoDB Example

<img src=https://i.imgur.com/eDNZeqh.png alt='Swagger Page of that application' title='Swagger Page of that application'/>

### Requirements

- Node.js v7+
- MongoDB running on local instance

### Running

- Install dependencies - `npm i`
- Build typescript - `npm run build`
- Run project - `npm start`
- Go to swagger page - `localhost:3000/documentation`

### Development with Watch Compiler

- Run project - `npm run dev`

### On Dockerhub

- [erickwendel/heroes-api-erick](https://hub.docker.com/r/erickwendel/heroes-api-erick/)

```shell
docker run -p 27017:27017 -d --name mongodb mongo:4
```

```shell
docker run -p 3000:4000 \
-e PORT=4000 \
-e MONGO_URL=mongodb \
--link mongodb:mongodb \
erickwendel/heroes-api-erick:v1
```
