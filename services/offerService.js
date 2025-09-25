let currentOffer = null;

const storeOffer = (offerData) => {
    currentOffer = { ...offerData, storedAt: new Date().toISOString() };
    return currentOffer;
};

const getAllOffers = () => {
    return currentOffer ? [currentOffer] : [];
};

module.exports = { storeOffer,getAllOffers };
