// controllers/downloadController.js
const { Parser } = require("json2csv");
const scoreService = require("../services/scoreService");

const downloadScores = (req, res) => {
  const scores = scoreService.getScores();

  if (!scores.length) {
    return res
      .status(400)
      .json({ success: false, message: "No scores available. Run scoring first." });
  }

  const fields = [
    "name",
    "role",
    "company",
    "industry",
    "location",
    "ruleScore",
    "aiScore",
    "finalScore",
    "intent",
    "reasoning",
  ];
  const parser = new Parser({ fields });
  const csv = parser.parse(scores);

  res.header("Content-Type", "text/csv");
  res.attachment("results.csv");
  return res.send(csv);
};

module.exports = { downloadScores };
