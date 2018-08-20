// para subir para o github da forma correta
// 1o git init
// 2o -> criar arquivo para ignorar lixos do projeto
// -> .gitignore > node_modules
// node_modules corresponde ao seu sistema operacional
// -> Linux é de um jeito
// -> Windows é de outro
// toda vez que alguem for executar seu projeto em outra plataforma
// precisa instalar as dependencias conforme o sistema dele
// -> nossas dependencias ficam no PACKAGE.JSON
// para restaurar -> rodamos o npm install

// git init -> inicializa
// cria o .gitignore - echo node_modules > .gitignore
// git add .
// git commit -m "mensagem"


// 3o passo, fazer a asserção = verificar o valor esperado e o valor corrente
const { deepEqual } = require('assert')

// 4o passo é rodar o teste no terminal - mocha -w test.js

// 5o montar a implentação estrutural da função no index.js

// 6o passo, chamar a função

// 7o passo, implementar a função objetiva

const { lerComCallback, lerComPromise, convertendoParaPromise } = require('./index')

// 1o passo, criar a suite de testes
describe('Vai executar funções assincronas', () => {

    //2o passo, criar o teste que vai falhar
    // recebemos o done
    it('deve receber valores de arquivo, resolvendo com callback', (done) => {
        const expected = {
            "gender": "Male",
            "hair_color": "Blond",
            "height": "172",
            "homeworld": "https://swapi.co/api/planets/1/",
            "mass": "77",
            "name": "Luke Skywalker",
            "skin_color": "Fair",
            "created": "2014-12-09T13:50:51.644000Z",
            "edited": "2014-12-10T13:52:43.172000Z",
            "starship": {
                "name": "X-wing",
                "model": "T-65 X-wing"
            }
        }
        // 6o passo, chamar a função
        lerComCallback((error, result) => {
            // passamos o valor que recebemos da função
            deepEqual(result, expected)
            //  no caso de callback functions, devemos receber
            // o done do mocha, da função it, para informar
            // que nossa funcao terminou
            done()
        })

        // // 3o passo = asserção
        // deepEqual(null, expected)

    })

    it('deve receber valores de arquivo, resolvendo com .then/catch', () => {
        const expected = {
            "gender": "Male",
            "hair_color": "Blond",
            "height": "172",
            "homeworld": "https://swapi.co/api/planets/1/",
            "mass": "77",
            "name": "Luke Skywalker",
            "skin_color": "Fair",
            "created": "2014-12-09T13:50:51.644000Z",
            "edited": "2014-12-10T13:52:43.172000Z",
            "starship": {
                "name": "X-wing",
                "model": "T-65 X-wing"
            }
        }
        // no caso de promises, o mocha, resolve somente
        // retornando a função, sem precisar do done
        return lerComPromise().then(resultado => {
            deepEqual(resultado, expected)
        })
    })
    // para usar o await, para guardar o valor em uma variavel
    // precisamos adicionar o async

    it('resolvendo com async/await, e convertendo para promise', async () => {
        const expected = {
            "gender": "Male",
            "hair_color": "Blond",
            "height": "172",
            "homeworld": "https://swapi.co/api/planets/1/",
            "mass": "77",
            "name": "Luke Skywalker",
            "skin_color": "Fair",
            "created": "2014-12-09T13:50:51.644000Z",
            "edited": "2014-12-10T13:52:43.172000Z",
            "starship": {
                "name": "X-wing",
                "model": "T-65 X-wing"
            }
        }
        const resultado = await convertendoParaPromise()
        deepEqual(resultado, expected)
    })

})