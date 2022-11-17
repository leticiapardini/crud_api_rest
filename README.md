
## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **Frontend** 
- HTML, TypeScript, CSS, ReactJS, Axios
- https://github.com/leticiapardini/postgram

#### **Back-end**
- NodeJS, Express, Typescript, TypeORM, JsonWebToken
- Este repositório

#### **Banco-de-Dados**
- MySql

# 👷 Como rodar

```bash

# Clonar os seguintes repositórios
git clone https://github.com/leticiapardini/crud_api_rest

# Entrar numa IDE de sua preferência e executar o comando:
yarn install

#Configurar o banco de dados utilizando os seguintes dados

  OBS: vc precisará definir a senha do seu usuário "root" como "mysql" e criar seu schema com o nome de "app", todas as informações a baixo:


  HOST= "localhost"
  PORT= "3306"
  USERNAME= "root"
  PASSWORD= "mysql"
  DATABASE= "app"

  OBS: Para criação do banco de dados você precisa ter instalado no seu computador o mysql e o workbench, segue os links a baixo para instalação

  mysql : https://www.mysql.com/
  workbench : https://dev.mysql.com/downloads/workbench/

# Executar o comando para rodar as migrations
  yarn migration:create

  # Executar o comando para rodar a aplicação
  yarn dev

```

Feito isso, abra o seu navegador e acesse `http://localhost:8080/`
ou em uma porta de sua preferência.

Outras rotas para acessar também é as rotas de posts e users, basta apenas acrescentar os nomes a frente do link.


<br>

## :mortar_board: Autores

<table>
    <tr>
        <td align="center">
            <a href="https://github.com/leticiapardini">
                <img src="https://avatars.githubusercontent.com/u/97961576?v=4.png" width="150px;" alt="Imagem de Letícia Pardini" />
                <br />
                <sub><b>Letícia Pardini</b></sub>
            </a>
        </td>
    </tr>
</table>

