# TASK MANAGER API
API desenvolvida para  uma aplicação que gerencia tarefas. Contém um CRUD completo de usuários e tarefas.

<img src= "https://img.shields.io/badge/Node-v16.15.0-blue">  <img src="https://img.shields.io/badge/license-MIT-green"> <img src= "https://img.shields.io/badge/PRs-welcome-green">

Tabela de conteúdos
=================
<!--ts-->
   * [Instalação](#installation)
   * [Configuração local](#local-files-config)
   * [Como usar](#usage)
   * [Endpoints](#endpoints)
      * [users](#users)
        * [registrar](#create-account)
        * [solicitar dados básicos do usuário](#read-info)
        * [login](#login)
        * [atualizar dados](#update-info)
        * [excluir conta](#delete-account)
      * [tasks](#tasks)
        * [criar](#create-task)
        * [ler](#read-task)
        * [atualizar](#update-task)
        * [deletar](#delete-task)
   * [Tests](#tests)
      * [users](#users-tests)
      * [tasks](#tasks-tests)
      * [cobertura total](#coverage)
   * [Tecnologias](#technologies)
<!--te-->

Installation
=================

Clone o repositório do projeto na sua máquina rodando o seguinte comando:
```
git clone git@github.com:alexdemenezes/project-task-manager.git
```
Entre na pasta `backend` do projeto:
```
cd project-task-manager && cd backend
```
instale as dependências rodando o seguinte comando:
```
npm install
```


Local files config
=================
É necessário ter o mysql instalado e configurado.

Renomeie o arquivo `.env.example` para `.env`

Configure o arquivo `.env`

```
SERVER_PORT=   
DB_USER= 
DB_PASS=
DB_NAME=
DB_HOST=
DB_PORT=
JWT_SECRET=
```

`SERVER_PORT=` Porta que você quer que o servidor escute.

`DB_USER=` Seu nome de usuário no mysql.

`DB_PASS=` Sua senha no mysql (caso tenha).

`DB_NAME=` Nome do banco de dados.

`DB_HOST=` Local onde seu banco está hospedado. (caso esteja apenas na sua máquina local coloque `localhost` ou `127.0. 0.1` ambos significam a mesma coisa).

`DB_PORT=` Porta do seu banco mysql (por padrão a porta do mysql é `3306`).

`JWT_SECRET=` Sua chave secreta que será usada para gerar e validar o token de autenticação do usuário.



Usage
=================

Rode o comando abaixo dentro do diretório `backend`.
```
npm start
```


Endpoints
=================

## Users

### Read info

### GET `/api/users/:id`
Enpoint responsável por retornar um usuário baseado no id passado pela rota.
#### Parâmetros
id: espera receber o id do usuário pela rota

Exemplo: 
`http://localhost:3001/api/users/1`
#### Respostas
##### OK! 200
Caso encontre o usuário.

Exemplo: 
```
{
  "id": 1,
  "username": "developer",
  "email": "dev.emailtest404@gmail.com",
  "password": ""
}

```

##### Não Encontrado! 404
Irá retornar uma mensagem informando que o usuário não foi encontrado.

Exemplo:
```
{
  "message": "user not found"
}
```

##### Erro interno no servidor! 500
Caso o endpoint apresente algum problema inesperado.

Exemplo:
```
{
  "message": "internal error"
}
```

### Create account

### POST `/api/users`
Endpoint responsável por criar usuário no banco de dados.
#### Parâmetros:
o endpoint espera receber os seguintes valores no corpo da requisição:

username: o nome do usuário.

email: email válido.

password: senha do usuário.

Exemplo:
```
{
    "username": "adriano234",
    "email": "adriano234@gmail.com",
    "password": "12345678"
}
```
#### Respostas
##### OK! 201
Caso o usuário seja cadastrado com sucesso.

Exemplo:
```
{
  "id": 1,
  "adriano234",
  "email": "adriano234@gmail.com"
}
```
##### Campos não preenchidos! 400
Caso algum dos campos esperados não seja preenchido.

Exemplo:
```
{ "message": "All fields must be filled" }
```
##### username inválido! 400 
Caso o nome de usuário não  tenha o tamanho mínimo.
Exemplo:
```
{
  "message": "\"username\" length must be equal or greater than 6"
}
```
##### email inválido! 400 
Caso o e-mail não  tenha o formato válido `email@email.com`.

Exemplo:
```
{
  "message": "Please provide a valid email address"
}
```
##### senha inválida! 400 
Caso a senha não tenha tamanho mínimo.

Exemplo:
```
{
  "message": "\"password\" length must be equal or greater than 8"
}
```
##### Conflito! 409
Caso o e-mail já esteja em uso.

Exemplo:
```
{
  "message": "email already used"
}
```
##### Erro interno no servidor! 500
Caso o endpoint apresente algum problema inesperado.

Exemplo:
```
{
  "message": "internal error"
}
```

### Login

### POST `/api/login`
Endpoint responsável por validar o usuário e retornar o token de autenticação.
#### Parâmetros:
O endpoint espera receber dois parâmetros no corpo da requisição:

email: email cadastrado do usuário.

password: senha do usuário.

Exemplo:
```
{
    "email": "dev.emailtest404@gmail.com",
     "password": "12345678"
}
```
#### Respostas
##### Ok! 200
login feito com sucesso.

Exemplo:
```
{
  "user": {
    "id": 1,
    "username": "developer",
    "email": "dev.emailtest404@gmail.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldi5lbWFpbHRlc3Q0MDRAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsImlhdCI6MTY1NjQyMjE0MSwiZXhwIjoxNjU2NDI5MzQxfQ.2nX3qrw8U25MwkmDGTgPGr7_hTTTtkGLwJHrb-t5RF8"
}
```
##### Credenciais inválidas! 401
email ou senha não correspondem ao que foi cadastrado.

Exemplo:
```
{
  "message": "Incorrect email or password"
}
```
##### Campos não preenchidos! 400
Caso o email ou a senha não sejam enviados:

Exemplo:
```
{
  "message": "All fields must be filled"
}
```
##### Erro interno no servidor! 500
Caso o endpoint apresente algum problema inesperado.

Exemplo:
```
{
  "message": "internal error"
}
```



### Update info

### PATCH `/api/users/{ campo que será atualizado }`
Endpoint responsável por atualizar dados do usuário

campos disponíveis = username  |  email   |  password

#### Autenticação:
O endpoint espera receber o token de autenticação no header em uma chave chamada `authorization`.

Exemplo: 
```
{
authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldi5lbWFpbHRlc3Q0MDRAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsImlhdCI6MTY1NjQyMjkwOSwiZXhwIjoxNjU2NDMwMTA5fQ.V07-pNP1KGgoaj6Bp0QoVXsge98KkunrMqjRVGgduBc
}
```
#### Parâmetros:
O endpoint espera receber o valor do campo que será atualizado.

Exemplo:

atualizar username
- endpoint: `/api/users/username`.

corpo da requisição:
```
{
  "username": "novoNomeUsuario"
}
```

atualizar email
- endpoint: `/api/users/email`.

corpo da requisição:
```
{
  "email": "emailnovo@gmail.com"
}
```

atualizar senha
- endpoint: `/api/users/password`.

corpo da requisição:
```
{
  "password": "novaSenha123"
}
```
#### Respostas
##### OK! 200
dados atualizados com sucesso.
##### Sem autorização! 401
Token  inválido ou  expirado

Exemplo:
```
{
  "message": "Token is invalid or expired"
}
```

##### Sem autorização! 401
Token não enviado

Exemplo:
```
{
  "message": "Authorization token is required"
}
```
##### Erro interno no servidor! 500
Caso o endpoint apresente algum problema inesperado.

Exemplo:
```
{
  "message": "internal error"
}
```

### delete-account

### DELETE `/api/users`
Endpoint responsável por excluir conta do usuário.

#### Autenticação:
O endpoint espera receber o token de autenticação no header em uma chave chamada `authorization`.

Exemplo: 
```
{
authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldi5lbWFpbHRlc3Q0MDRAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsImlhdCI6MTY1NjQyMjkwOSwiZXhwIjoxNjU2NDMwMTA5fQ.V07-pNP1KGgoaj6Bp0QoVXsge98KkunrMqjRVGgduBc
}
```
#### Parâmetros:
Nenhum
#### Retornos:
##### OK! 200
Conta excluída com sucesso.
##### Erro interno no servidor! 500
Caso o endpoint apresente algum problema inesperado.

Exemplo:
```
{
  "message": "internal error"
}
```


## Tasks

### Create task

### POST `/api/tasks`
Endpoint responsável por criar tarefas.
#### Autenticação:
O endpoint espera receber o token de autenticação no header em uma chave chamada `authorization`.

Exemplo: 
```
{
authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldi5lbWFpbHRlc3Q0MDRAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsImlhdCI6MTY1NjQyMjkwOSwiZXhwIjoxNjU2NDMwMTA5fQ.V07-pNP1KGgoaj6Bp0QoVXsge98KkunrMqjRVGgduBc
}
```
#### Parâmetros:
Obrigatório:

title: título da tarefa

status: "pendente" | "em andamento" | "pronto"

Opcional:

description: descrição da tarefa

Exemplo: 
```
{
  title: "finalizar projeto pessoal",
  description: "finalizar o projeto task manager antes do dia 05 para poder viajar!"
  status: "pendente"
}
```
#### Retornos: 
##### Criada! 201
tarefa registrada com sucesso.

Exemplo:
```
{
   id: 1
   title: "finalizar projeto pessoal"
   description: "finalizar o projeto task manager antes do dia 05 para poder viajar!"
   status: "pendente"
   userId: 1,
};
```
##### Campos não preenchidos! 400
Titulo não preenchido

Exemplo:
```
{ "message": "title field must be filled" }
```
##### Campos não preenchidos! 400
status não preenchido

Exemplo:
```
{ "message": "status field must be filled" }
```
##### Erro interno no servidor! 500
Caso o endpoint apresente algum problema inesperado.

Exemplo:
```
{
  "message": "internal error"
}
```

### Read task

### GET `/api/tasks`
Endpoint responsável por retornar todas as tarefas do usuário.
#### Autenticação:
O endpoint espera receber o token de autenticação no header em uma chave chamada `authorization`.

Exemplo: 
```
{
authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldi5lbWFpbHRlc3Q0MDRAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsImlhdCI6MTY1NjQyMjkwOSwiZXhwIjoxNjU2NDMwMTA5fQ.V07-pNP1KGgoaj6Bp0QoVXsge98KkunrMqjRVGgduBc
}
```
#### Parâmetros:
Nenhum
#### Respostas: 
##### OK! 200
retorna todas as tarefas

Exemplo:
```
[
  {
    "id": 1,
    "title": "finalizar projeto Udemy",
    "description": "",
    "status": "pendente",
    "userId": 1
  },
  {
    "id": 2,
    "title": "estudar JS",
    "description": "estudar javascript este final de semana",
    "status": "pendente",
    "userId": 1
  },
  {
    "id": 3,
    "title": "correr domingo",
    "description": "correr 10 km no parque do ibira",
    "status": "pendente",
    "userId": 1
  }
]

```
##### Erro interno no servidor! 500
Caso o endpoint apresente algum problema inesperado.

Exemplo:
```
{
  "message": "internal error"
}
```

### GET `/api/tasks/:id`
Endpoint responsável por retornar uma tarefa específica
#### Autenticação:
O endpoint espera receber o token de autenticação no header em uma chave chamada `authorization`.

Exemplo: 
```
{
authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldi5lbWFpbHRlc3Q0MDRAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsImlhdCI6MTY1NjQyMjkwOSwiZXhwIjoxNjU2NDMwMTA5fQ.V07-pNP1KGgoaj6Bp0QoVXsge98KkunrMqjRVGgduBc
}
```
#### Parâmetros:
id: espera receber o id do usuário pelo endpoint.

Exemplo:

`/api/tasks/1`
#### Retornos:
##### OK! 200
quando encontrar a tarefa

Exemplo:
```
{
  "id": 1,
  "title": "finalizar projeto Udemy",
  "description": "",
  "status": "pendente",
  "userId": 1
}
```
##### Tarefa Não encontrada! 404

Exemplo:
```
{
  "message": "task not found"
}
```
##### Erro interno no servidor! 500
Caso o endpoint apresente algum problema inesperado.

Exemplo:
```
{
  "message": "internal error"
}
```

### Update task

###  POST `/api/tasks/update`
Endpoint responsável por atualizar uma tarefa.
#### Autenticação:
O endpoint espera receber o token de autenticação no header em uma chave chamada `authorization`.

Exemplo: 
```
{
authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldi5lbWFpbHRlc3Q0MDRAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsImlhdCI6MTY1NjQyMjkwOSwiZXhwIjoxNjU2NDMwMTA5fQ.V07-pNP1KGgoaj6Bp0QoVXsge98KkunrMqjRVGgduBc
}
```
#### Parâmetros:
O endpoint espera receber os seguintes dados no corpo da requisição:

id: id da tarefa

title: o título 

description: a descrição

status: o status

Exemplo: 
```
{
    "id": 1,
    "title": "finalizar projeto Udemy até domingo",
    "description": "",
    "status": "em andamento"
}
```
#### Retornos:
##### OK! 200
tarefa atualizada com sucesso.
##### Erro interno no servidor! 500
Caso o endpoint apresente algum problema inesperado.

Exemplo:
```
{
  "message": "internal error"
}
```

### Delete task

### DELETE `/api/task/:id`
Endpoint responsável por apagar uma tarefa.
#### Autenticação:
O endpoint espera receber o token de autenticação no header em uma chave chamada `authorization`.

Exemplo: 
```
{
authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldi5lbWFpbHRlc3Q0MDRAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsImlhdCI6MTY1NjQyMjkwOSwiZXhwIjoxNjU2NDMwMTA5fQ.V07-pNP1KGgoaj6Bp0QoVXsge98KkunrMqjRVGgduBc
}
```
#### Parâmetros:

id: espera receber o id do usuário pelo endpoint.

Exemplo:

`/api/tasks/1`
#### Respostas:
##### OK! 200
tarefa apagada com sucesso.
##### Erro interno no servidor! 500
Caso o endpoint apresente algum problema inesperado.

Exemplo:
```
{
  "message": "internal error"
}
```


### tests
para rodar todos os testes.

comando:
```
npm test
```

### Users tests
para rodar todos os testes apenas relacionados à usuários.

comando:
```
npm run test:users:only
```

para rodar apenas um test relacionado à usuários.

comando:
```
NAME={nome do teste} npm run test:users
```

Exemplo: 
```
NAME=delete npm run test:users
```

### Tasks tests
para rodar todos os testes apenas relacionados à tarefas.

comando:
```
npm run test:tasks:only
```

para rodar apenas um test relacionado à tarefas.

comando:
```
NAME={nome do teste} npm run test:tasks
```

Exemplo: 
```
NAME=create npm run test:tasks
```

### Coverage
para ver a porcentagem de cobertura dos testes na aplicação:

comando: 
```
npm run test:coverage
```

*Obs: rode todos esses comando dentro do diretório `backend`.


### Technologies

- Node
- Mysql
- Express
- Sequelize
- Email-validator
- Bcrypt.js
- Jsonwebtoken
- Mocha
- Chai
- Sinon
- Eslint / airbnb
- NYC
- Cors

Arquitetura utilizada:

 MSC e POO:
 - model
 - service
 - controller
 
 
 










