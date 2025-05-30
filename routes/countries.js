const router = require('express').Router();
const countriesController = require('../controllers/countries');

/**
 * @swagger
 * /countries:
 *   get:
 *     tags:
 *       - Countries
 *     summary: Get all countries
 *     responses:
 *       200:
 *         description: A list of countries
 */
router.get('/', countriesController.getAllCountries);

/**
 * @swagger
 * /countries/{id}:
 *   get:
 *     tags:
 *       - Countries
 *     summary: Get a country by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The country ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single country
 *       404:
 *         description: Country not found
 */
router.get('/:id', countriesController.getCountryById);

/**
 * @swagger
 * /countries:
 *   post:
 *     tags:
 *       - Countries
 *     summary: Create a new country
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               continent:
 *                 type: string
 *               capital:
 *                 type: string
 *               population:
 *                 type: number
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       201:
 *         description: Country created
 *       400:
 *         description: Bad request
 */
router.post('/', countriesController.createCountry);

/**
 * @swagger
 * /countries/{id}:
 *   put:
 *     tags:
 *       - Countries
 *     summary: Update a country by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Country ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               continent:
 *                 type: string
 *               capital:
 *                 type: string
 *               population:
 *                 type: number
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       204:
 *         description: Country updated
 *       400:
 *         description: Bad request
 */
router.put('/:id', countriesController.updateCountry);

/**
 * @swagger
 * /countries/{id}:
 *   delete:
 *     tags:
 *       - Countries
 *     summary: Delete a country by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Country ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Country deleted
 *       404:
 *         description: Country not found
 */
router.delete('/:id', countriesController.deleteCountry);

module.exports = router;
