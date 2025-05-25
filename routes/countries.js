const router = require('express').Router();
const countriesController = require('../controllers/countries');

router.get('/', countriesController.getAllCountries);
router.get('/:id', countriesController.getCountryById);
router.post('/', countriesController.createCountry);
router.put('/:id', countriesController.updateCountry);
router.delete('/:id', countriesController.deleteCountry);

module.exports = router;
