const decisionMakerKeywords = [
  "CEO",
  "Founder",
  "Co-Founder",
  "VP",
  "Head",
  "Director",
  "President",
  "Chief",
  "Owner",
];
const influencerKeywords = [
  "Manager",
  "Lead",
  "Supervisor",
  "Coordinator",
  "Specialist",
  "Analyst",
];

const adjacentIndustries = [
  "saas",
  "software",
  "tech",
  "b2b software",
  "technology",
  "it services",
  "cloud",
];

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .sort()
    .join(" ");
}

function getRolePoints(role) {
  if (!role) return 0;
  const r = role.toLowerCase();
  if (decisionMakerKeywords.some((k) => r.includes(k.toLowerCase()))) return 20;
  if (influencerKeywords.some((k) => r.includes(k.toLowerCase()))) return 10;
  return 0;
}

function getIndustryPoints(industry, offer) {
  if (!industry || !offer?.ideal_use_cases) return 0;

  const normalizedLead = normalizeText(industry);
  const icpNormalized = offer.ideal_use_cases.map((icp) => normalizeText(icp));

  if (icpNormalized.includes(normalizedLead)) return 20;

  if (adjacentIndustries.some((adj) => normalizedLead.includes(adj))) return 10;

  return 0;
}

function getCompletenessPoints(lead) {
    const requiredFields = ['name', 'role', 'company', 'industry', 'location', 'linkedin_bio'];
    const isComplete = requiredFields.every(field => lead[field] && lead[field].trim() !== '');
    return isComplete ? 10 : 0;
}

function calculateRuleScore(lead, offer) {
  const rolePoints = getRolePoints(lead.role);
  const industryPoints = getIndustryPoints(lead.industry, offer);
  const completenessPoints = getCompletenessPoints(lead);

  const ruleScore = rolePoints + industryPoints + completenessPoints;

  let intentLabel = "Low";
  if (ruleScore >= 40) intentLabel = "High";
  else if (ruleScore >= 20) intentLabel = "Medium";

  return {
    score: ruleScore,
    intent: intentLabel,
    breakdown: {
      rolePoints,
      industryPoints,
      completenessPoints,
    },
  };
}

module.exports = { calculateRuleScore };
