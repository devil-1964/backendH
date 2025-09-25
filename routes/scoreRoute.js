const express = require("express");
const router = express.Router();
const leadsService = require("../services/leadsService");
const offerService = require("../services/offerService");
const { calculateRuleScore } = require("../services/ruleScoring");
const { getLeadIntent } = require("../services/aiScoring");
const scoreService = require("../services/scoreService");

router.post("/score", async (req, res) => {
  const leads = leadsService.getAllLeads();
  const offers = offerService.getAllOffers();

  if (!leads.length || !offers.length) {
    return res
      .status(400)
      .json({ success: false, message: "Need both leads and offers" });
  }

  try {
    const scores = await Promise.all(
      leads.map(async (lead) => {
        const ruleS = calculateRuleScore(lead, offers[0]);
        const aiS = await getLeadIntent(lead, offers[0]);

        return {
          name: lead.name,
          role: lead.role,
          company: lead.company,
          industry: lead.industry,
          location: lead.location,
          ruleScore: ruleS.score,
          aiScore: aiS.aiScore,
          finalScore: ruleS.score + aiS.aiScore,
          intent: aiS.intent,
          reasoning: aiS.reasoning,
        };
      })
    );

    // store scores in memory
    scoreService.storeScores(scores);

    res.json({ success: true});
  } catch (error) {
    console.error("Error in scoring:", error);
    res.status(500).json({ success: false, message: "Error while scoring leads" });
  }
});

router.get('/result',(req,res)=>{
  const scores=scoreService.getScores()
  res.json({success:true, scores})
})

module.exports = router;
