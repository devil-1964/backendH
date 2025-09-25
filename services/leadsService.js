let storedLeads = [];

const storeLeads = (leads) => {
    storedLeads = leads;
    return storedLeads;
};

const getAllLeads = () => {
    return storedLeads;
};


module.exports = { storeLeads,getAllLeads  };
