function obterTelefone(id, callback) {
    setTimeout(() => {
        return callback(null, { ddd: 11, telefone: '2312312' })
    }, 2000);
}

// função para obter enderecoDaPessoa pelo id
function obterEndereco(id, callback) {
    setTimeout(() => {
        return callback(null, { rua: 'dos bobos', numero: 0 })
    }, 3000)
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

obterPessoa(1, function callback(error, sucesso) {
    // validar se existe erro
    // tudo que for vazio, 0, undefined, null === false
    // neste caso, verificamos se o error contem algum valor 
    if (error) {
        console.error('DEU RUIM')
        return;
    }
    // como sabemos que o resultado é um array, com somente
    // uma posição, podemos extrair somente a posição 0  do array
    // imaginar: [1,2,3,4,5]
    // const [primeiraPosicao, segundaPosicao] = imaginar
    const [pessoa] = sucesso;

    console.log(`Nome: ${pessoa.nome}`)
    obterEndereco(pessoa.id, function callback2(error2, resultado2) {
        if (error2) {
            console.error('error2', error2)
            return;
        }
        const endereco = resultado2;

        obterTelefone(pessoa.id, function callback3(error3, resultado3) {
            if (error3) {
                console.error('error3', error3)
                return;
            }
            const telefone = resultado3
            console.log(`
                Nome: ${pessoa.nome}.
                Endereco: ${endereco.rua}
                Telefone: ${telefone.telefone}
            `)

        })
    })

})