[ ![Codeship Status for ErickWendel/tdd-study-group](https://app.codeship.com/projects/f134bba0-86d2-0136-d478-3e27c1ec70f0/status?branch=master)](https://app.codeship.com/projects/302557)

## Desafio

1. Criar um projeto node.js do zero.
2. Criar uma pasta chamada ‘temp’ na raiz do seu projeto
3. Criar um arquivo ‘items.json’ e colar a resposta do json de qualquer API do starwars.
3. Criar uma função que irá ler um arquivo ‘items.json’ na pasta ‘temp’ do seu projeto usando o método de callbacks com o metodo readFile do modulo fs
4. Criar um teste automatizado que irá chamar seu metodo de callback da index
5. Criar um metodo na index.js que irá ler o arquivo items.json usando o metodo 2 com promises usando .then/.catch 
6. Criar o teste automatizado para resolver esta promise e validar o resultado.
7. Na index criar um método para ler o arquivo items.json usando o metodo 3 com promises e resolução com (async/await).
8. Criar um teste automatizado para validar o resultado desta função.
9. Subir no `codeship.com` para validar o código se os testes estão passando.
10. Adicionar badge do `codeship` no `README.md` do projeto.

## Importante:

- Ler arquivos usando o metodo readFile do modulo Fs

- Para converter o metodo readFile pra promise usamos o metodo promisify do modulo útil 

- Para que os testes consigam enchergar seus metodos e necessario exportar com module.exports 

- Para rodar seus testes e necessario rodar com o mocha

### Rodando

```
npm install && npm i -g mocha
npm test
```

## Participantes
 - [Rodrigo Topan](https://github.com/rodrigotopan)
 - [Vinicius Martins](https://github.com/viniciusmartinss)
 - [Vinicius Strauss](https://github.com/vinistrauss)
 - [Danilo Pelozone](https://github.com/daniloplima)

 #### Data: 20/08/2019


