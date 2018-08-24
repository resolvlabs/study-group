- Fomos na painel da AWS, selecionamos o serviço AWS LAMBDA
- Adicionamos uma TRIGGER (API Gateway)
- Criamos um evento de teste, clicando no botao teste, e selecionamos o template
  de API Gateway
- Em resources, no nosso API Gateway, ACTIONS, deploy API
- Pega a url base + o nome da sua função e joga no navegador

### Trabalhando com Serverless Framework

- INstalar o serverless -> npm i -g serverless
- Para criar um projeto com seu template
  `serverless create --template aws-nodejs --path nomeDaPasta`

  `serverless create --template aws-nodejs --path heroes`

- Alteramos o arquivo serverless adicionando o array de events
- Alteramos e adicionamos a rota http /heroes

- Por boa prática, geramos o template do nosso serviço, em seguida,
  fazemos deploy, para verificar se as credenciais estão corretas

- para configurar credenciais da AWS/AZURE/GCLOUD

AWS_KEY=MINHA_KEY
AWS_SECRET=MINHA_SECRET

```shell
serverless config credentials --provider aws \
--key $AWS_KEY \
--secret $AWS_SECRET
```

- Para fazer deploy de nossas funções existem duas formas

1. `serverless deploy` deploy de TODAS as funções
2. `serverless deploy -f heroes-create` deploy de UMA função
