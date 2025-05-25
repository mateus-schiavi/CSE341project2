const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Countries API',
    description: 'API to manage countries'
  },
  host: 'localhost:3000',
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json';  // arquivo que será gerado
const endpointsFiles = ['./server.js', './routes/countries.js']; // arquivos onde suas rotas estão

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger JSON generated!');
  // Opcional: pode rodar seu servidor aqui depois da geração
  // require('./server');
});
