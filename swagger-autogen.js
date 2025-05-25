const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Countries API',
    description: 'API for countries management'
  },
  host: 'localhost:3000',
  schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/countries.js']; // arquivos de rota que ele vai escanear

swaggerAutogen(outputFile, endpointsFiles, doc);
