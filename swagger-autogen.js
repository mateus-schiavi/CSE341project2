// swagger-gen.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Countries and Cities API',
    description: 'API for managing countries and cities around the world'
  },
  host: 'localhost:3000',
  schemes: ['http', 'https'],
  tags: [
    {
      name: 'Countries',
      description: 'Operations related to countries'
    },
    {
      name: 'Cities',
      description: 'Operations related to cities'
    }
  ]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
