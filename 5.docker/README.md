## Docker

1o Passo -> Analisar os requirementos que nossa aplicação necessita

2o Mapear o que nossa aplicação tem fazer

--Steps

1o Instalar Node.js
2o Instalar o typescript
3o Instalar dependencias
4o Compilar o projeto
5o Rodar o projeto em uma porta especifica

### Docker

- Ter pequenos aplicações como sistemas operacionais (com suas proprias dependencias, seu proprio linux)
- Compartilhar informações entre containers, compartilhar rede e alguns casos, recursos

- Precisamos de um arquivo de receita, que define quem como será executado e instalado em nosso projeto (quem segue os steps) -> Dockerfile

- Após a criação do nosso Dockerfile, precisamos compilar nossa imagem

  `docker build -t heroes-api .`

- `-t` -> nome da imagem
- `.` -> caminho de onde está o dockerfile

- Após construir nossa imagem, precisamos rodar de fato nossa app
  `docker run -p 3000:3000 heroes-api`
- `p`
  1o parametro -> Porta que meu sistema vai visualizar
  2o parametro -> Porta de dentro do container
- `e`
  variaveis de ambiente do projeto

- Baixamos a imagem e colocamos para rodar o MongoDB
  `docker run -p 27017:27017 -d --name mongodb mongo:4`
  `d`- Roda em segundo plano

  - IMPORTANTE: Se voce estiver com uma imagem com o mesmo vai dar erro

- Para listar as Imagens:
  `docker image list`
- Para listar os containers:
  `docker ps`
- Para listar os containers e os containers parados:
  `docker ps -a`
- Para listar os containers e os containers parados e IDs:
  `docker ps -aq`
- Para parar um container
  `docker stop ID`

- Precisamos linkar nosso MongoDB à nossa Aplicação
  `--link`
- Passsamos o MONGO_URL o nome do nosso container, internamente ele vai converter essa string para o IP
  interno do MongoDB

```shell
docker run -p 3000:4000 \
-e PORT=4000 \
-e MONGO_URL=mongodb \
--link mongodb:mongodb \
heroes-api
```

- Podemos entrar no nosso container e visualizar seu código
  1. `docker ps` e pegar o ID
  2. `docker exec -it ID /bin/sh`
     `exec -it` -> executa um comando especifico e entra no container
- Outro exemplo
  `docker exec -it 326bd321b897 node --version`

## Subir nossa Imagem para o Docker Hub

1o passo -> Criar conta no dockerhub.com
2o passo -> logar no terminal
`docker login`

3o passo -> compilar nossa imagem, ou tag-a-la

1. colocamos o nome de usuario do docker hub, o nome do projeto
2. falamos a versão da nossa imagem
   `docker build -t erickwendel/heroes-api-erick:v1 .`

Ou podemos tag-a-la para uma nova imagem

`docker tag existente novoNome`

Criamos uma CÓPIA da imagem com um outro nome
NAO precisamos recompilar

`docker tag heroes-api erickwendel/heroes-api-erick:v1`

fazer upload

`docker push erickwendel/heroes-api-erick:v1`

Removemos a imagem localmente
`docker rmi erickwendel/heroes-api-erick:v1`
`docker rmi heroes-api -`

Neste momento, a imagem nao existe localmente e busca do Dockerhub

```shell
docker run -p 3000:4000 \
-e PORT=4000 \
-e MONGO_URL=mongodb \
--link mongodb:mongodb \
erickwendel/heroes-api-erick:v1
```

## --------

Para evitar rodar comandos bash o tempo inteiro, temos uma forma automatizada
de agregar serviços. Agrupar o mongodb, apis, eventos, serviços tudo em
um lugar, para que ao digitar um unico comando, subir nossa infra completa
Este arquivo é chamado `docker-compose.yml`

- Após a criação e serviços no docker-compose
- `docker-compose up` -> para levantar todos os serviços
- `docker-compose up --build` -> para levantar e reconstruir as imagens
- `docker-compose up -d heroes-api` -> para levantar apenas o heroes-api e rodar em segundo plano

- `docker-compose down` -> para matar todos os serviços, volumes e networks

- Matar o mongodb existente

- Para não perder as informações de dados de aplicações, criamos volumes. Informamos a pasta local que será espelhada para a pasta no container.
- Para começar a enchergar é necessario limpar as aplicações com `docker-compose down` e `docker-compose up`

```yaml
  - volumes:
    ./db:/data/db
```

- Podemos também criar volumes virtuais usando a aba volumes do docker-compose

```yml
volumes:
  mongo_data: {}
```

Desta forma, criamos um disco virtual na maquina local, para espelhar os dados

```yml
- volumes: mongo_data:/data/db
```

- Para visualizar onde nosso volume foi criado

1. `docker volume ls`
2. `docker volume inspect ID`

Para ganhar um painel bonitão, colocamos uma interface, para visualizar nossas instancias do docker
`PORTAINER`

## Rodando

- `docker-compose up`
- Ir para `localhost:9000` e visualizar os containers

## Participantes

- [Rodrigo Topan](https://github.com/rodrigotopan)
- [Vinicius Martins](https://github.com/viniciusmartinss)

#### Data:04/09/2018
