# PopcornTime Server
### Funcionalidades implementadas:
- Testes unitários;
- CRUD das principais features;
- Autenticação;
- Integração com o banco de dados e versionamento por migrations;

### Executar as migrações:
- npx sequelize-cli db:migrate

### Iniciar o servidor:
- Inserir as variáveis de ambiente em um .env semelhante ao exemplo (.env.example)
- nodemon server/server.js