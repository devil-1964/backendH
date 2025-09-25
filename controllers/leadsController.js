const leadsService = require("../services/leadsService");
const fs = require("fs");
const csv = require("csv-parser");

const uploadLeads = (req, res) => {
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
      // Map row values to headers (ensures proper order and trims)
      const lead = {};
      headers.forEach((header) => {
        lead[header] = row[header] ? row[header].trim() : '';
      });

      leads.push(lead);
    })
    .on('end', () => {
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
    })
    .on('error', (err) => {
      fs.unlinkSync(req.file.path);
      res.status(500).json({ success: false, message: 'Error parsing CSV', error: err.message });
    });
};

module.exports = { uploadLeads };
