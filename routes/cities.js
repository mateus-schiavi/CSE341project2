const router = require('express').Router();
const citiesController = require('../controllers/cities');

/**
 * @swagger
 * /cities:
 *   get:
 *     tags:
 *       - Cities
 *     summary: Get all cities
 *     responses:
 *       200:
 *         description: A list of cities
 */
router.get('/', citiesController.getAllCities);

/**
 * @swagger
 * /cities/{id}:
 *   get:
 *     tags:
 *       - Cities
 *     summary: Get a city by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The city ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single city
 *       404:
 *         description: City not found
 */
router.get('/:id', citiesController.getCityById);

/**
 * @swagger
 * /cities:
 *   post:
 *     tags:
 *       - Cities
 *     summary: Create a new city
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               country:
 *                 type: string
 *               population:
 *                 type: number
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       201:
 *         description: City created
 *       400:
 *         description: Bad request
 */
router.post('/', citiesController.createCity);

/**
 * @swagger
 * /cities/{id}:
 *   put:
 *     tags:
 *       - Cities
 *     summary: Update a city by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: City ID
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
 *               country:
 *                 type: string
 *               population:
 *                 type: number
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       204:
 *         description: City updated
 *       400:
 *         description: Bad request
 */
router.put('/:id', citiesController.updateCity);

/**
 * @swagger
 * /cities/{id}:
 *   delete:
 *     tags:
 *       - Cities
 *     summary: Delete a city by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: City ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: City deleted
 *       404:
 *         description: City not found
 */
router.delete('/:id', citiesController.deleteCity);

module.exports = router;
