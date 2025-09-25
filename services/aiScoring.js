const { GoogleGenAI } = require("@google/genai");
require("dotenv").config(); 

// initialize Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});



/**
 * Ask Gemini to classify lead intent.
 * @param {Object} lead - { name, role, company, industry, location, linkedin_bio }
 * @param {Object} offer - { name, value_props, ideal_use_cases }
 * @returns {Object} { intent, aiScore, reasoning }
 */
async function getLeadIntent(lead, offer) {
  const prompt = `
You are a B2B sales assistant.
Classify this lead's intent (High, Medium, Low) for the given offer.
Explain your reasoning in 1–2 sentences.

Offer:
Name: ${offer.name}
Value Props: ${offer.value_props.join(", ")}
Ideal Use Cases: ${offer.ideal_use_cases.join(", ")}

Lead:
Name: ${lead.name}
Role: ${lead.role}
Company: ${lead.company}
Industry: ${lead.industry}
Location: ${lead.location}
LinkedIn Bio: ${lead.linkedin_bio}

Return JSON with keys: intent, reasoning
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  console.log(response.text)

  const text = response.text.trim();

  let intent = "Low";
  let reasoning = text; 

  try {
    const parsed = JSON.parse(text);
    intent = parsed.intent || "Low";
    reasoning = parsed.reasoning || text;
  } catch {
    if (/high/i.test(text)) intent = "High";
    else if (/medium/i.test(text)) intent = "Medium";
    else intent = "Low";
  }

  const scoreMap = { High: 50, Medium: 30, Low: 10 };

  return {
    intent,
    aiScore: scoreMap[intent] ?? 10,
    reasoning,
  };
}

module.exports = { getLeadIntent };
