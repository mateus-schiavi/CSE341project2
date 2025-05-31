const router = require('express').Router();
const { ensureAuthenticated } = require('../middleware/auth');

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
  res.send('API is running');
});

router.use('/countries', ensureAuthenticated, require('./countries'));
router.use('/cities', ensureAuthenticated, require('./cities'));

module.exports = router;
