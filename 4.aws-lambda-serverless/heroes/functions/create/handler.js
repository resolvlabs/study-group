'use strict';
// instalamos o MONGODB
// npm i --save mongodb

// criamos uma conta na MLAB criamos uma database e um usuario
// para invocar nossa função localmente
// serverless invoke local -f heroes-create --data '{"body": {"nome": "Flash", "poder": "Velocidade"}}'

const { MongoClient } = require('mongodb');
const hello = async (event, context) => {
  console.log('EVENT***', event);
  try {
    const connection = await MongoClient.connect(
      'mongodb://erickwendel:Erick123@ds133262.mlab.com:33262/heroes-sls',
    );
    const collection = connection.db('heroes-sls').collection('heroes');

    const { nome, poder } = JSON.parse(event.body);

    const result = await collection.insert({
      nome,
      poder,
      dataInsercao: new Date(),
    });
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.log('error', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Erro interno do servidor',
        input: event,
      }),
    };
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

// movemos o module exposts, para baixo
// module.exports.hello = () => {}
// deixamos de uma forma mais bonitona
module.exports = { hello };
