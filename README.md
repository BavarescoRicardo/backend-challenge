# Desafio de Backend

<img src="./img/logo-clubpetro.png" style="margin-left: 100px"
     alt="Clubpetro" width="300">

- [Descrição](#descrição)
  - [O Desafio](#o-desafio)
  - [Requisitos Obrigatórios](#requisitos-obrigatórios)
  - [Bônus](#bônus)
- [Submissão e Prazo de Entrega](#submissão-e-prazo-de-entrega)

## Descrição

Este desafio tem como objetivo avaliar as habilidades técnicas do candidato a vaga de desenvolvedor backend no Clubpetro.
Os dados a ser considerados são:

- País: O país escolhido;
- Local: O local dentro do país escolhido;
- Meta: O mês e o ano que o usuário pretende visitar o local;
- Url da bandeira do país;
- Data de criação do registro;
- Data de atualização do registro.


#### Bônus


- Utilização do framework [NestJS](https://nestjs.com/);
- Typescript;
- Testes automatizados;
- [TypeORM](https://typeorm.io/#/);
- [Docker](https://www.docker.com/);
- Deploy para [Google Cloud Platform](https://cloud.google.com/) (ao criar conta é possível receber um bonus para teste).

### Submissão e Prazo de entrega

- O canditado deverá realizar um fork deste repositório e submeter o código no mesmo;
- Em caso do deploy realizado, a url deverá ser adicionada no README;
- O prazo de entrega para este desafio é de 2 (duas) semanas, contando a partir do dia em que o candidato recebeu o email com o link do repositório;
- Ao finalizar o desafio, o candidato deverá submeter o desafio no questionário disponível na sua área de candidato na plataforma(https://menvievagas.com.br/vagas/fam%C3%8Dliapires/) do Processo Seletivo. É só clicar em RESPONDER no questionário e inserir o link do seu PR.
Em caso de dúvidas, enviar um e-mail para jobs@clubpetro.com.br


### Pasos para executar esta aplicação:
 * Necessário criação do arquivo  .env  na pasta raiz da aplicação com o seguinte texto:
   - DB_HOST='db'
   - DB_PORT=5432
   - DB_USERNAME='postgres'
   - DB_PASSWORD='postgres'
   - DB_NAME='postgres'

 *Executar o seguinte comando no terminal:
    docker-compose up -d
* Para executar os testes automatizados utiliza:
    npm run test
  

#  Estarão disponiveis as seguintes rotas:
 - GET http://localhost:3000/places
 - GET http://localhost:3000/places/{id}
 - PATCH http://localhost:3000/places/{id}
    corpo deve ser o json para atualizar lugar e a meta
      exemplo de corpo: {	"local": "",  "meta": "2023-06" }
 - POST http://localhost:3000/places
    corpo deve conter os dados para um novo local 
    exemplo de corpo { "country": "Brasil", "local": "Itapema", "meta": "2025-08", "flagUrl": "https://www.worldometers.info/img/flags/us-flag.gif" }