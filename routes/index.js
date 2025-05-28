const router = require('express').Router();
router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    res.send('API is running');
});

// Rotas específicas de países
router.use('/countries', require('./countries'));
router.use('/cities', require('./cities'));
module.exports = router;

