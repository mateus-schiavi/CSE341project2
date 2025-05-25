const router = require('express').Router();
router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    res.send('API is running');
});

// Rotas específicas de países
router.use('/countries', require('./countries'));

module.exports = router;
