const mongodb = require('../data/database');  // caminho do seu módulo de conexão com o Mongo
const ObjectId = require('mongodb').ObjectId;

const getAllCountries = async (req, res) => {
    const result = await mongodb.getDatabase().collection('countries').find();
    result.toArray()
        .then((countries) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(countries);
        })
}

const getCountryById = async (req, res) => {
    const countryId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('countries').find({ _id: countryId });
    result.toArray()
        .then((countries) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(countries[0]);
        })
};

const createCountry = async (req, res) => {
    const country = {
        name: req.body.name,
        continent: req.body.continent,
        capital: req.body.capital,
        population: req.body.population,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
    };
    try {
        const response = await mongodb.getDatabase().db().collection('countries').insertOne(country);
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
    const countryId = new ObjectId(req.params.id);
    const country = {
        name: req.body.name,
        continent: req.body.continent,
        capital: req.body.capital,
        population: req.body.population,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
    };
    const response = await mongodb.getDatabase().db().collection('countries').replaceOne({ _id: countryId }, country);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the country.');
    }
}

const deleteCountry = async (req, res) => {
    const countryId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDatabase().db().collection('countries').deleteOne({ _id: countryId });
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


