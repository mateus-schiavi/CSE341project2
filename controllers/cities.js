const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().collection('cities').find();
    result.toArray().then((cities) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(cities);
    });
};

const getSingle = async (req, res) => {
    const cityId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('cities').find({ _id: cityId });
    result.toArray().then((cities) => {
        if (cities.length === 0) {
            res.status(404).json({ message: 'City not found ' });
        } else {
            res.status(200).json(cities[0]);
        }
    });
};

const createCity = async (req, res) => {
    const city = {
        name: req.body.name,
        country: req.body.country,
        population: req.body.population,
        area: req.body.area,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    };

    try {
        const response = await mongodb.getDatabase().collection('cities').insertOne(city);
        res.status(201).json(response);
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateCity = async (req, res) => {
    const cityId = new ObjectId(req.params.id);
    const city = {
        name: req.body.name,
        country: req.body.country,
        population: req.body.population,
        area: req.body.area,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    };

    try {
        const responde = await mongodb.getDatabase().collection('cities').replaceOne({ _id: cityId }, city);
        if (response.modifiedCount === 0) {
            res.status(404).json({ message: 'City not found' });
        } else {
            res.status(204).send();
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteCity = async (req, res) => {
    const cityId = new ObjectId(req.params.id);

    try {
        const response = await mongodb.getDatabase.collection('cities').deleteOne({ _id: cityId });
        if (response.deletedCount === 0) {
            res.status(404).json({ message: 'City not found' });
        } else {
            res.status(204).send();
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getAll,
    getSingle,
    createCity,
    updateCity,
    deleteCity,
};