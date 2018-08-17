// instalamos o MOCHA para testar nossas funções
// npm i -g mocha && npm i --save-dev mocha
// save-dev -> não vai para produção, somente fica em desenvolvimento
// quando for rodar os testes
// mocha *test.js -> um padrão para pegar tudo que contenha test no fim

// modulo interno do node
const assert = require('assert')
// importamos nosso modulo
//sempre que for importar, passar ./ para falar que é arquivo
const { pesquisar } = require('./index')

describe('Testando o desafio', function () {
    this.timeout(Infinity)
    //inicializamos um test
    it('deve enviar a palavra luke e mapear sua nave', async () => {
        const expected = { "gender": "male", "hair_color": "brown", "height": "180", "mass": "80", "name": "Han Solo", "skin_color": "fair", "created": "2014-12-10T16:49:14.582000Z", "edited": "2014-12-20T21:17:50.334000Z", "starship": { "name": "Millennium Falcon", "model": "YT-1300 light freighter" } }
        const result = await pesquisar('Han')
        assert.deepEqual(result, expected)
    })
})