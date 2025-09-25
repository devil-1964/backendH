const offerService = require('../services/offerService');

const createOffer = (req, res) => {
    const offer = offerService.storeOffer(req.body);
    res.status(201).json({
        success: true,
        message: 'Offer stored successfully',
        data: offer
    });
};

module.exports = { createOffer };
