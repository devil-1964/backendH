const leadsService = require("../services/leadsService");
const fs = require("fs");
const csv = require("csv-parser");

const uploadLeads = (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No CSV file uploaded" });
    }

    const leads = [];
    const headers = ['name', 'role', 'company', 'industry', 'location', 'linkedin_bio'];

    fs.createReadStream(req.file.path)
      .pipe(csv()) // automatically uses first row as headers
      .on('data', (row) => {
        try {
          // Map row values to headers (ensures proper order and trims)
          const lead = {};
          headers.forEach((header) => {
            lead[header] = row[header] ? row[header].trim() : '';
          });

          leads.push(lead);
        } catch (rowError) {
          console.error('Error processing row:', rowError);
        }
      })
      .on('end', () => {
        try {
          fs.unlinkSync(req.file.path); // delete uploaded CSV
          leadsService.storeLeads(leads); // store leads

          res.status(201).json({
            success: true,
            message: `${leads.length} leads uploaded successfully`,
            data: leads
          });

          console.log({
            success: true,
            message: `${leads.length} leads uploaded successfully`,
            data: leads
          });
        } catch (endError) {
          console.error('Error in end handler:', endError);
          res.status(500).json({ 
            success: false, 
            message: 'Error processing results',
            error: endError.message 
          });
        }
      })
      .on('error', (err) => {
        try {
          console.error('CSV parsing error:', err);
          if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
          }
          res.status(500).json({ 
            success: false, 
            message: 'Error parsing CSV', 
            error: err.message 
          });
        } catch (errorHandlingError) {
          console.error('Error in error handler:', errorHandlingError);
          res.status(500).json({ 
            success: false, 
            message: 'Critical error occurred'
          });
        }
      });
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
};

module.exports = { uploadLeads };
