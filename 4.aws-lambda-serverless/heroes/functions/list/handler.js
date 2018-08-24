'use strict';
// serverless invoke local -f heroes-list

const { MongoClient } = require('mongodb');
const hello = async (event, context) => {
  try {
    const connection = await MongoClient.connect(
      'mongodb://erickwendel:Erick123@ds133262.mlab.com:33262/heroes-sls',
    );
    const collection = connection.db('heroes-sls').collection('heroes');
    const result = await collection.find().toArray();

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error('DEU RUIM***', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Erro Interno do Servidor!!',
        input: event,
      }),
    };
  }
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports = { hello };
