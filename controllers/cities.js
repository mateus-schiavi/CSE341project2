const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const validateCityData = (data) => {
    const requiredFields = ['name', 'country', 'population', 'area', 'latitude', 'longitude'];
    for (const field of requiredFields) {
        if (data[field] === undefined || data[field] === null || data[field] === '') {
            return `Field '${field}' is required.`;
        }
    }
    return null;
};

const getAllCities = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().collection('cities').find();
        const cities = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(cities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCityById = async (req, res) => {
    try {
        const cityId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('cities').find({ _id: cityId });
        const cities = await result.toArray();

        if (cities.length === 0) {
            return res.status(404).json({ message: 'City not found' });
        }

        res.status(200).json(cities[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createCity = async (req, res) => {
    const validationError = validateCityData(req.body);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

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
        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId });
        } else {
            res.status(500).json({ message: 'Failed to insert city.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateCity = async (req, res) => {
    const validationError = validateCityData(req.body);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    try {
        const cityId = new ObjectId(req.params.id);
        const city = {
            name: req.body.name,
            country: req.body.country,
            population: req.body.population,
            area: req.body.area,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        };

        const response = await mongodb.getDatabase().collection('cities').replaceOne({ _id: cityId }, city);
        if (response.modifiedCount === 0) {
            res.status(404).json({ message: 'City not found or no changes made.' });
        } else {
            res.status(204).send();
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteCity = async (req, res) => {
    try {
        const cityId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().collection('cities').deleteOne({ _id: cityId });
        if (response.deletedCount === 0) {
            res.status(404).json({ message: 'City not found' });
        } else {
            res.status(204).send();
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllCities,
    getCityById,
    createCity,
    updateCity,
    deleteCity,
};
