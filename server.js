const express = require('express');
const app = express();
require('dotenv').config();

const mongodb = require('./data/database'); // importe o módulo de conexão

app.use(express.json()); // IMPORTANTE para pegar JSON no body

const routes = require('./routes/index'); // seu arquivo index das rotas

// Inicialize a conexão com o banco antes de usar as rotas e iniciar o servidor
mongodb.initDb((err) => {
  if (err) {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  }

  // Só após conectar, usa as rotas e inicia o servidor
  app.use('/', routes);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
