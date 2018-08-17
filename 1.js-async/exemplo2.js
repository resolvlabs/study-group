// em momentos, precisamos converter bibliotecas de terceiros para
// promises -> NUNCA MAIS CALLBACKS
// importamos um módulo nativo do NODE, para converter 
// uma função callback (QUE SIGA OS PADROES (1o error, 2o resultado))
const util = require('util')

// precisamos converter uma função
// funcao a(callback) {}
// const aAsync = util.promisify(a)
// aAsync()
//  .then() .catch()


/*
 Vimos que trabalhar com CALLBACKS, 
 pode ser um processo dolorido!

 Precisamos sincronizar nossas funções mais 
 BONITAMENTE

 ---> PROMISES
 Objetos assincronos do javascript NATIVOS
 Agora trabalhamos com ESTADOS

 -> Quando nossa função terminar, nosso retorno
 estará com o estado FULLFILLED

 -> Quando nossa função der erro, nosso estado,
 será de REJECTED

 -> Quando estiver rodando, ou ainda não terminado
 será PENDING

 para Capturar os errors usamos a função
 .catch()

 para Capturar os resultados usamos a função
 .then()
*/


// removemos o argumento de Callback da nossa
// funcao
function obterTelefone(id) {

    // instanciamos um objeto assincrono
    // a classe Promise, passamos um callback, 
    // que recebe dois parametros
    // resolve => quando der tudo certo
    // reject => para EXPLODIR uma excessão 
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            // retornamos sucesso!
            return resolve({ ddd: 11, telefone: '2312312' })

            //para retornar um erro
            // return reject(new Error('erro interno no server'))
        }, 2000);

    })


}

// função para obter enderecoDaPessoa pelo id
function obterEndereco(id) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            return resolve({ rua: 'dos bobos', numero: 0 })
        }, 3000)
    })
}

// passamos uma função como segundo argumento
// para sincronizar o resultado de nossas funções 

function obterPessoa(id, callback) {
    // simulamos uma função assincrona
    setTimeout(() => {
        // quando a função terminar, deve chamar a função
        // seguir sempre o padrão
        // 1o paramentro para erro
        // 2o para resultado
        return callback(null, [{ id: 1, nome: 'Isabella', idade: 12, }])
    }, 2000);
}

//------- execução
// convertemos obterPessoa
const obterPessoaAsync = util.promisify(obterPessoa)


    // ---------- METODO 1
    // obterPessoaAsync(1)
    //     // para evitar ficar reescrevendo a keyword FUNCTION
    //     // passanmos uma ARROW FUNCTION
    //     // function nomeDaFuncao(param1) {console.log() }

    //     // param1 => { console.log() }
    //     // é um apelido, mas não pode esquecer do =>
    //     .then(pessoa => {
    //         const [primeiraPessoa] = pessoa
    //         return primeiraPessoa
    //     })
    //     // capturamos o resultado do .then anterior
    //     .then(pessoa => {
    //         return obterEndereco(pessoa.id).then(endereco => {
    //             //alteramos o retorno da promise MAE
    //             return {
    //                 pessoa: pessoa,
    //                 endereco: endereco
    //             }
    //         })

    //     })
    //     .then(pessoaEndereco => {
    //         return obterTelefone(pessoaEndereco.pessoa.id).then(telefone => {
    //             // da forma que estamos repassando os valores
    //             // nosso objeto está assim
    //             // { pessoa: {id, nome}, endereco: { id: rua }}
    //             // se retornar igual no .then anterior ficaria assim
    //             // telefone {numero, ddd}, 
    //             // pessoaEndereco: { pessoa: { id, nome }, endereco: {id, rua}}
    //             // nosso objetivo
    //             // { endereco: {rua, numero}, pessoa: {id, nome}, telefone: {numero}}

    //             // usamos a função rest/spread
    //             // destruimos o objeto anterior, juntando ao novo
    //             // o ... quebra o seu objeto em propriedades
    //             /*
    //             {
    //                 endereco: {},
    //                 pessoa: {},
    //                 telefone: {}
    //             }
    //             */
    //             return {
    //                 ...pessoaEndereco,
    //                 telefone
    //             }
    //         })
    //     })

    //     .then(resultado => console.log(`
    //         Nome: ${resultado.pessoa.nome}
    //         Endereco: ${resultado.endereco.rua}
    //         Telefone: ${resultado.telefone.numero}
    //     `))
    //     .catch(error => console.error('DEU  RUIM', error))




    // ------- METODO 2
    // para resolver mais de uma promise de uma vez

    // obterPessoaAsync(1)
    //     // extrair somente a primeira posição da função anterior
    //     .then(([primeiraPessoa]) => {
    //         // para executar duas promises ao mesmo tempo
    //         // o promise all, retorna um array ordenado de resultados
    //         // 1 posicao -> endereco
    //         // 2 posicao -> telefone
    //         return Promise.all([
    //             obterEndereco(primeiraPessoa.id),
    //             obterTelefone(primeiraPessoa.id)
    //         ])
    //             .then(([endereco, telefone]) => {
    //                 return {
    //                     pessoa: primeiraPessoa,
    //                     endereco,
    //                     telefone
    //                 }
    //             })
    //     })
    //     .then(resultados => {

    //         // para extrair objetos de objetos
    //         // DESTRUCTOR
    //         const { pessoa, endereco, telefone } = resultados

    //         console.log(`
    //             Nome: ${pessoa.nome}
    //             Endereco: ${endereco.rua}
    //             Telefone: ${telefone.numero}
    //         `)
    //     })
    //     .catch(error => {
    //         console.error('DEU RUIM', error)
    //     })

    // --------- METODO 3 

    // criamos uma função que se auto executa

    //iif
    // OSMANO do C# implementaram as palvrinhas async/await
    // na sua função voce coloca o async -> automaticamente, sua função
    // retorná uma PROMISE. Quando precisar mapear os resultados de uma
    // promise, usamos o AWAIT

    // iif, sempre colocar um ponto e virgula no inicio, para não
    // conflitar com o contexto anterior
    ; (async () => {
        // resolvemos nossa promise para mapear os resultados
        // capturamos os erros 
        try {
            const [primeiraPessoa] = await obterPessoaAsync(1)
            const [telefone, endereco] = await Promise.all([
                obterTelefone(primeiraPessoa.id),
                obterEndereco(primeiraPessoa.id)
            ])

            console.log(`
                Nome: ${primeiraPessoa.nome},
                Telefone: ${telefone.telefone},
                Endereco: ${endereco.rua}
            `)

        }
        catch (error) {
            console.error('DEU RUIM', error)
        }



    })()

// funcao declariva
// (function (angular) {

// })(angular)

// //metodo tradicional
// function a (angular) {

// }
// a (angular)

