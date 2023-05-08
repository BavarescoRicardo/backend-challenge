# Desafio de Backend


#### Este código utiliza as seguintes tecnologias ..

- framework [NestJS] :thumbsup:
- Typescript :thumbsup:
- Testes automatizados :thumbsup:
- [TypeORM] :thumbsup:
- [Docker] :thumbsup:

### Submissão e Prazo de entrega

- O canditado deverá realizar um fork deste repositório e submeter o código no mesmo;
- Em caso do deploy realizado, a url deverá ser adicionada no README;
- O prazo de entrega para este desafio é de 2 (duas) semanas, contando a partir do dia em que o candidato recebeu o email com o link do repositório;
- Ao finalizar o desafio, o candidato deverá submeter o desafio no questionário disponível na sua área de candidato na plataforma(https://menvievagas.com.br/vagas/fam%C3%8Dliapires/) do Processo Seletivo. É só clicar em RESPONDER no questionário e inserir o link do seu PR.
Em caso de dúvidas, enviar um e-mail para jobs@clubpetro.com.br


### Pasos para executar esta aplicação:
 * Para instalar todas as dependencias da aplicação. Executar o comando 
      $ npm install 
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
