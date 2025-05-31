const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const validateCountryData = (data) => {
    const requiredFields = ['name', 'continent', 'capital', 'population', 'latitude', 'longitude'];
    for (const field of requiredFields) {
        if (data[field] === undefined || data[field] === null || data[field] === '') {
            return `Field '${field}' is required.`;
        }
    }
    return null;
};

const getAllCountries = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().collection('countries').find();
        const countries = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(countries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCountryById = async (req, res) => {
    try {
        const countryId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('countries').find({ _id: countryId });
        const countries = await result.toArray();

        if (countries.length === 0) {
            return res.status(404).json({ message: 'Country not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(countries[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createCountry = async (req, res) => {
    const validationError = validateCountryData(req.body);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    const country = {
        name: req.body.name,
        continent: req.body.continent,
        capital: req.body.capital,
        population: req.body.population,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
    };

    try {
        const response = await mongodb.getDatabase().collection('countries').insertOne(country);
        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId });
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the country.');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCountry = async (req, res) => {
    const validationError = validateCountryData(req.body);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    try {
        const countryId = new ObjectId(req.params.id);
        const country = {
            name: req.body.name,
            continent: req.body.continent,
            capital: req.body.capital,
            population: req.body.population,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
        };

        const response = await mongodb.getDatabase().collection('countries').replaceOne({ _id: countryId }, country);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Country not found or no changes made.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCountry = async (req, res) => {
    try {
        const countryId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().collection('countries').deleteOne({ _id: countryId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Country not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllCountries,
    getCountryById,
    createCountry,
    updateCountry,
    deleteCountry,
};
