# seguindo nossos steps, precisamos instalar o Node.js
# esta imagem será procurada localmente, caso não encontrada
# nosso projeto será baixado do dockerhub.com
# o repositorio de imagens publicas de Docker
# por padrão usamos o nomeDaImagem : TAG
# a tag serão suas versões, em nosso caso uma distro ALPINE
FROM node:10-alpine

# Mapeamos nosso repositorio local para dentro do HOST
# HOST -> CONTAINER

#COPIAMOS todo nossa pasta local, para dentro de uma pasta
# no docker chamada Src (caso nao exista, será criada)
ADD . /src

# precisamos entrar na pasta que criamos
WORKDIR /src

# Instalamos o typescript globalmente
# IMPORTATE: não existe SUDO no docker

RUN npm i -g typescript

# instalamos as dependencias
RUN npm install

#compilamos o projeto
RUN npm run build

# para a Execução final 
# utilizamos o comando CMD
# A diferença do CMD é que ele só será rodado
# de fato quando o container ser executado
# E este comando pode ser substituido 
CMD npm start

# expomos a porta 3000
EXPOSE 3000