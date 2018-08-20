
// 5o passo, criamos somente  a estrutura
// function lerComCallback(callback) {
//     callback(null, null)
// }

// 7o passo -> objetivo
const { readFile } = require('fs')
// para nao dar problema de path (caminho de arquvi)
// usamos a função JOIN
const { join } = require('path')

// importamos o modulo, para conversao de callback para Promise
const { promisify } = require('util')

function lerComCallback(callback) {
    // quando usamos o join
    // pega o caminho de onde foo executado
    // __dirname (diretorio corrente) + o arquivo
    readFile(join(__dirname, 'items.json'), (error, result) => {
        // validamos o erro, e caso ele exista, retornamos
        // seguindo a convenção para erros
        if (error) {
            return callback(error);
        }
        const resultado = JSON.parse(result)
        return callback(null, resultado)
    })
}

function lerComPromise() {
    // convertemos para caso de função que não segue o padrão
    // de callback ( 1o arg erro, 2o sucesso)
    // nestes casos, o promisify não vai funcionar

    // instanciar uma promise
    // 5p passo - estrutura
    // resolve -> sucesso
    // reject -> deu merda (exception)
    // return new Promise((resolve, reject) => {
    //     return resolve(null)
    // })

    return new Promise((resolve, reject) => {
        readFile(join(__dirname, 'items.json'), (error, resultado) => {
            // fazemos um ternário para retornar a função
            // se o error estiver com algum valor, ele joga uma exceção
            // se não tiver valor no error, ele resolve com sucesso
            const resultadoJson = JSON.parse(resultado)


            // ternario
            // if(error) {
            //     return reject()
            // }
            // else {
            //     resolve()
            // }

            return error ? reject(error) : resolve(resultadoJson)
        })


    })
}

function convertendoParaPromise() {
    const lerComCallbackAsync = promisify(lerComCallback)
    return lerComCallbackAsync();
}
// 5o passo
module.exports = {
    lerComCallback,
    lerComPromise,
    convertendoParaPromise
}