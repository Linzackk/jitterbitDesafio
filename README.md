# Desafio Técnico Jitterbit

## Overview

Este projeto consiste em uma API REST para gerenciamento de pedidos. A
aplicação permite realizar operações de **criação, consulta, atualização
e remoção de pedidos**, bem como a manipulação de seus respectivos
itens.

A API foi desenvolvida como parte de um **desafio técnico para um
processo seletivo**, tendo como objetivo demonstrar a capacidade de
projetar e implementar um serviço backend organizado, com validação de
dados, persistência em banco de dados e tratamento adequado de erros.

O sistema foi projetado seguindo uma **arquitetura em camadas**,
buscando facilitar a manutenção, organização do código e separação de
responsabilidades entre os diferentes componentes da aplicação.

------------------------------------------------------------------------

# Tecnologias Utilizadas

As seguintes tecnologias foram utilizadas no desenvolvimento do projeto:

-   **Node.js**
-   **Express**
-   **TypeScript**
-   **Express Validator**
-   **SQLite**
-   **sqlite3**

O desenvolvimento foi realizado em **TypeScript** para aproveitar
recursos de tipagem estática e melhor organização do código.
Posteriormente, o projeto foi compilado para **JavaScript**, conforme
exigência do desafio técnico.

------------------------------------------------------------------------

# Arquitetura do Projeto

O projeto foi estruturado utilizando uma arquitetura em camadas, com o
objetivo de manter uma clara separação de responsabilidades.

Estrutura principal:

    src
     ├─ controllers
     ├─ routes
     ├─ middleware
     ├─ models
     ├─ infrastructure
     ├─ util
     ├─ app.ts
     └─ server.ts

    dist
     └─ build da aplicação em JavaScript

### Controllers

Responsáveis por receber as requisições HTTP, validar os dados recebidos
e delegar a execução da lógica para as camadas responsáveis.

### Routes

Definem os endpoints da aplicação e conectam as rotas aos respectivos
controllers.

### Middleware

Contém middlewares utilizados na aplicação, incluindo tratamento global
de erros.

### Models

Define os tipos e estruturas de dados utilizadas na aplicação. Um
exemplo é o modelo de **Item**, utilizado para representar os itens
pertencentes a um pedido.

### Infrastructure

Camada responsável pela comunicação com o banco de dados SQLite. Nela
estão implementadas as operações de persistência como criação, leitura,
atualização e remoção de registros.

### Util

Contém utilidades compartilhadas no sistema. Um exemplo é a definição de
**status HTTP padronizados**, evitando o uso de *magic numbers* no
código.

------------------------------------------------------------------------

# Modelagem do Banco de Dados

O sistema utiliza **SQLite** como banco de dados relacional.

A escolha pelo SQLite foi motivada principalmente pelo **tempo limitado
para desenvolvimento do desafio (aproximadamente dois dias úteis)**,
pois permite rápida configuração e execução local sem dependência de
serviços externos.

## Relação entre entidades

A relação entre as entidades é:

    Orders 1 --- N Items

Ou seja, um pedido pode possuir múltiplos itens.

## Tabela Orders
```
  Campo          Tipo          Descrição
  -------------- ------------- -------------------------------
  orderId        VARCHAR(50)   Identificador único do pedido
  value          REAL          Valor total do pedido
  creationDate   TEXT          Data de criação do pedido
```
## Tabela Items
```
  Campo       Tipo          Descrição
  ----------- ------------- --------------------------------
  idItem      INTEGER       Chave primária autoincremental
  productId   INTEGER       Identificador do produto
  orderId     VARCHAR(50)   Pedido ao qual o item pertence
  quantity    INTEGER       Quantidade do item
  price       REAL          Valor unitário do item
```
Observação: o campo **idItem** é utilizado apenas como chave interna do
banco de dados. O identificador funcional do item é representado pelo
**productId**.

------------------------------------------------------------------------

# API Endpoints

## Listar todos os pedidos

    GET /order

Retorna todos os pedidos cadastrados no sistema.

------------------------------------------------------------------------

## Buscar pedido por ID

    GET /order/:id

Retorna um pedido específico com base em seu identificador.

------------------------------------------------------------------------

## Criar pedido

    POST /order

### Exemplo de Body

``` json
{
  "numeroPedido": "v10089015vdb-01",
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "valorTotal": 10000,
  "items": [
    {
      "idItem": 2434,
      "quantidadeItem": 2,
      "valorItem": 1000
    }
  ]
}
```

Regras importantes:

-   Um pedido **deve possuir ao menos um item**
-   Os itens são armazenados na tabela `Items` vinculados ao pedido

------------------------------------------------------------------------

## Atualizar pedido

    PUT /order/:id

Permite atualizar:

-   valor total do pedido
-   itens do pedido
-   ou ambos

### Exemplo de Body

``` json
{
  "valorTotal": 10000,
  "items": [
    {
      "idItem": 2434,
      "quantidadeItem": 10,
      "valorItem": 1000
    }
  ]
}
```

------------------------------------------------------------------------

## Remover pedido

    DELETE /order/:id

Ao remover um pedido, **todos os itens associados também são
removidos**.

------------------------------------------------------------------------

# Regras de Negócio

-   Um pedido deve ser criado com **pelo menos um item**
-   Um pedido pode possuir **múltiplos itens**
-   Ao remover um pedido, todos os seus itens também são removidos
-   É possível atualizar **valor total**, **itens** ou ambos

------------------------------------------------------------------------

# Lógica de Atualização de Itens

A atualização dos itens de um pedido segue a seguinte lógica:

1.  Os itens recebidos no input são comparados com os itens existentes
    no banco de dados.
2.  Dois conjuntos são criados:
    -   **Itens iguais** (presentes no banco e no input)
    -   **Itens diferentes**
3.  A partir dessa separação:

-   Itens iguais são **atualizados**
-   Itens presentes no input mas não no banco são **criados**
-   Itens presentes no banco mas ausentes no input são **removidos**

Essa abordagem permite manter o estado do pedido sincronizado com os
dados enviados pelo cliente.

------------------------------------------------------------------------

# Validação de Dados

O projeto utiliza **express-validator** para validação das entradas da
API.

As validações garantem que os dados enviados pelo usuário estejam em
formato adequado antes de serem processados pelo sistema.

------------------------------------------------------------------------

# Tratamento de Erros

A aplicação possui um mecanismo centralizado de tratamento de erros
utilizando uma classe personalizada:

    AppError

Essa abordagem permite:

-   padronizar as respostas de erro
-   simplificar o fluxo de controle
-   delegar o tratamento final para um **middleware global**

------------------------------------------------------------------------

# Status Codes

Os códigos HTTP utilizados na aplicação são definidos por meio de um
enum para evitar o uso de valores mágicos no código:

    export enum StatusCode {
        OK = 200,
        CREATED = 201,
        BAD_REQUEST = 400,
        NOT_FOUND = 404,
        SERVER_ERROR = 500
    }

------------------------------------------------------------------------

# Decisões Técnicas

## Uso de TypeScript

O projeto foi inicialmente desenvolvido em **TypeScript** para:

-   maior segurança de tipos
-   melhor organização do código
-   redução de erros durante o desenvolvimento

Posteriormente foi gerada uma **build em JavaScript** para atender ao
requisito do desafio.

## Uso de SQLite

SQLite foi escolhido devido ao **tempo limitado de desenvolvimento**,
permitindo rápida configuração e execução local sem necessidade de
infraestrutura adicional.

## Ausência de ORM

A aplicação utiliza **SQL direto** ao invés de um ORM.

Essa decisão foi tomada para:

-   reduzir complexidade
-   acelerar o desenvolvimento
-   manter maior controle sobre as queries executadas

## Arquitetura em Camadas

A organização em camadas foi adotada para facilitar:

-   manutenção do código
-   separação de responsabilidades
-   evolução futura da aplicação

------------------------------------------------------------------------

# Execução do Projeto

Instalar dependências:

    npm install

Executar o projeto em TypeScript:

    npm run dev

Gerar build:

    npm run build

Executar o projeto em JavaScript após build:

    npm run start

Após iniciar o servidor, a API estará disponível em:

    http://localhost:3000
