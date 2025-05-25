const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Countries API',
    description: 'API para gerenciamento de países'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/countries.js']; // arquivos de rota que ele vai escanear

swaggerAutogen(outputFile, endpointsFiles, doc);
