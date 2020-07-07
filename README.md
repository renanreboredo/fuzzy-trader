# Fuzzy Trader
## Especificação

Requisitos:

   Você está responsável por desenvolver uma ferramenta de apoio a decisão de investimento. Uma pessoa precisa não apenas acompanhar quanto custa seus investimentos (carteira) como precisa de apoio antes de fazê-lo.
   Para isso queremos construir uma aplicação que permita ao usuário:
Informar um valor (em dólar) que deseja aplicar.
Com base neste valor, devemos apresentar um conjunto de ativos sugeridos (entre criptomoedas e ações) com informações de apoio a esta decisão.
Então o usuário deve escolher qual ativo investirá o montante. Este fará parte da sua carteira.
Deve-se então consolidar a sua carteira mostrando a quantidade total de cada ativo e o valor atual do mesmo (e a soma da carteira)
  Para a escolher dos ativos, pode-se usar um subconjunto limitado de criptomoedas e ações a sua escolha. Para consultar seus valores se pode usar a API a sua escolha e que te deixa mais confortável. Minha sugestão é utilizar algo como https://www.blockchain.com/api/exchange_rates_api , https://apiv2.bitcoinaverage.com/#price-data , https://www.alphavantage.co/documentation/ , https://www.worldtradingdata.com/ .

Critérios:

   Minha avaliação é baseada na escrita do seu código e na forma como você desenvolve a solução. Use seu código para me apresentar como você desenvolve seu raciocínio e resolve o problema apresentado.
   Não está sendo avaliada a extensão do seu conhecimento sobre bibliotecas, sintaxe ou da tecnologia utilizada. Dessa forma, não se preocupe em me mostrar quanto você conhece a ferramenta, mas sim como você a utiliza.
   A solução pode ser desenvolvida na plataforma ou linguagem em que se sentir mais confortável. Na bx a maior parte da nossa stack é Ruby on Rails, React.js e MongoDB. Mas isso não deve guiar seu exercício. Pois, caso não tenha familiaridade com a plataforma, teremos espaço para seu aprendizado e desenvolvimento durante o trabalho.

## Solução

Ela apenas sugere 3 opções de investimento para um determinado valor, com três classificações: conservador, moderado e agressivo. Na modalidade conservadora, a API escolhe entre duas ações com índice Beta de variação baixo, IBM e ABEV, e determina através de um cálculo baseado nos dez últimos valores de máximo e mínimo das duas ações qual vale mais a pena ser escolhida. Na modalidade moderada, escolhe de duas ações com Índice Beta mediano, VALE e ITUB. Na modalidade agressiva, a API considera a Bitcoin como valor de investimento, mas apenas se o "Crypto Rating", conforme dado pela [Alpha Advantage](https://www.alphavantage.co/documentation/#crypto-ratings) está acima de Atrativo.

Nas três, o investimento é ignorado se o valor não é suficiente ou é negativo.

### Rodando a aplicação

Para poder rodar a aplicação, é necessário ter o nodejs e o npm instalados na máquina, e dispor de uma chave para acesso à API da Alpha Advantage, que pode ser encontrada [aqui](https://www.alphavantage.co/support/#api-key)

Para rodar a aplicação basta rodar o comando:
```
   DATABASE_PASSWORD=root ALPHA_ADVANTAGE_KEY=<SUA_ALPHA_ADVANTAGE_KEY> npm run start:dev
```

O comando vai gerar uma build do frontend e depois rodar o backend em modo watch. Caso uma modificação seja feita no frontend, é necessário rodar o comando novamente.

### Tecnologias utilizadas:

- NestJS para a API
- Angular para o frontend

#### Motivação
Como estou afastado do backend voltado para Web APIs tem um tempo, eu tentei ir pela rota Rails inicialmente por já ter trabalhado com e ser a forma mais fácil teoricamente de construir uma aplicação MVC completa do zero. Porém, com pouco tempo mexendo na nova versão do rails, percebi que a tecnologia estava diferente o suficiente do tempo que eu mexia para ser muito complexo aprender em tão pouco tempo. Portanto, eu optei pelo NestJS por se assemelhar ao Angular, que é a ferramenta que trabalho hoje. Embora ainda não foi a melhor das experiências, tenho certeza que foi a melhor decisão para o momento, pois consegui entender a aplicação e desenvolver parte dela.

Embora não implementado, o banco escolhido foi o MongoDB por dois motivos principais: a aplicação não demandaria muitas operações de relacionamento, então um banco não relacional seria uma boa escolha. Além disso, a velocidade do banco foi considerada pois a ideia inicial era manter uma busca em realtime na api para poder atualizar os dados do usuario, mas logo a API da Alpha Advantage se mostrou aversa a essa possibilidade por suas limitações de requisições, e eu já estava investido demais nela para poder trocar para alguma outra.

### Limitações

Pelo limite na quantidade de requisições, foi criado um módulo de simulação para poder demonstrar a lógica da aplicação. As chamadas ainda são realizadas com a API mas é bastante frequente não conseguir concluir por limite nas requisições. 

### Próximos passos

Adicionar mais fontes de consumo

## Agradeço pela oportunidade desde já