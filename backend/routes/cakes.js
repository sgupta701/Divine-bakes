// Import required modules
const express = require('express');
const Cake = require('../models/cake'); 
const router = express.Router();

// POST: Create a new cake
router.post('/', async (req, res) => {
    const { name, price, description } = req.body;
    const cake = new Cake({
        name,
        price,
        description
    });
    
    try {
        const savedCake = await cake.save();
        res.status(201).json(savedCake);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET: Fetch all cakes
router.get('/list', async (req, res) => {
    try {
        const cakes = await Cake.find();
        res.json(cakes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET: Fetch a specific cake by ID
router.get('/:id', async (req, res) => {
    try {
        const cake = await Cake.findById(req.params.id);
        if (!cake) return res.status(404).json({ message: "Cake not found" });
        res.json(cake);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT: Update a cake by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedCake = await Cake.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } 
        );
        if (!updatedCake) return res.status(404).json({ message: "Cake not found" });
        res.json(updatedCake);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE: Delete a cake by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedCake = await Cake.findByIdAndDelete(req.params.id);
        if (!deletedCake) return res.status(404).json({ message: "Cake not found" });
        res.json({ message: "Cake deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
