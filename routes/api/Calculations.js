const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../auth');
const SavedCalculation = mongoose.model('SavedCalculation');

router.post('/calculations', auth, async (request, response) => {
    var userId = request.body.userId;
    if (userId != request.user.id) {
        return response.status(401).json({ error: "Unauthorized user. please log in again." });
    }

    var calculatorsData = request.body.calculatorsData;
    var customerData = request.body.customerData;
    var date = request.body.date || new Date();
    if (!calculatorsData || !customerData) {
        return response.status(403).json({ "error": "invalid data. please fill out all the fields and have at least 1 calculation" });
    }

    try {

        var newCalculation = new SavedCalculation({
            user: userId,
            customer: customerData.customer,
            facility: customerData.facility,
            remakers: customerData.remakers,
            date: date,
            calculations: calculatorsData,
        });
        await newCalculation.save();
        console.log("new calculation saved");
        return response.status(201).json({ success: true });
    }
    catch (err) {
        return response.status(400).json({ success: false, error: err });
    }
})

router.get('/calculations/:userId/', auth, async (request, response) => {
    var userId = request.params.userId
    if (userId != request.user.id) {
        return response.status(401).json({ error: "Unauthorized. please log in again." });
    }

    try {
        const calculations = await SavedCalculation.find({user: userId})
        return response.status(200).json({success: true, data: calculations});
    }
    catch (err) {
        return response.status(400).json({ success: false, error: err });
    }
})

router.get('/calculations/:userId/:calcId', auth, async (request, response) => {
    var calculationId = request.params.calcId

    try {
        const calculation = await SavedCalculation.findById(calculationId);
        if (calculation.user != request.user.id) {
            return response.status(401).json({ error: "Unauthorized. please log in again." });
        }
        return response.status(200).json({success: true, data: calculation});
    }
    catch (err) {
        return response.status(400).json({ success: false, error: err });
    }
})

module.exports = router;