// para iniciar nosso projeto node.js
// npm init ou npm init -y (sem o wizard)
// >package.json -> nosso arquivo de dependencias do node.js
// quando pegar um projeto node.js, rodar o npm install para restaurar
// dependencias a partir do package.json
// npm -> Node Package Manager 
// --save > para registrar a dependencia no package.json
// npm install --save request

// importamos a biblioteca para fazer requisicoes externas
// const request = require('request')

/**
 * 

 https://swapi.co/api/people/?search=luke&format=json

http://dontpad.com/resolvstudygroup

- Consumir API do swapi.co
- Obter Pessoas pelo nome
- A partir da pessoa recebida, pegar também Starship Instance

{
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
        "model": "T-65 X-wing", 
    }
}


 */

const util = require('util')
const request = require('request')

const requestAsync = util.promisify(request)

async function pesquisar(nome) {
    try {
        const result = await requestAsync(`https://swapi.co/api/people/?search=${nome}&format=json`)
        const { results: [pessoa] } = JSON.parse(result.body)
        const [starshipUrl] = pessoa.starships
        const resultStarship = await requestAsync(starshipUrl)
        const starship = JSON.parse(resultStarship.body)
        const resultadofinal = {
            gender: pessoa.gender,
            hair_color: pessoa.hair_color,
            height: pessoa.height,
            mass: pessoa.mass,
            name: pessoa.name,
            skin_color: pessoa.skin_color,
            created: pessoa.created,
            edited: pessoa.edited,
            starship: {
                name: starship.name,
                model: starship.model
            }
        }
        return resultadofinal
    }
    catch (error) {
        console.error('deu ruim', error)
        return null;
    }

}

// ; (async () => {
// })()


// exportamos nossa função
module.exports = {
    pesquisar: pesquisar
}


