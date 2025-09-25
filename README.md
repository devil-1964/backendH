# Backend API

## Visit this link for better experience
https://backendh-ezl1.onrender.com/

A backend service that processes offers and leads using rule-based logic combined with AI reasoning to generate lead scores and intent classifications.

## Setup Steps


### 1. Clone Repository
```bash
git clone https://github.com/devil-1964/backendH.git
cd backendH
```

### 2. Install Dependencies
```bash
cd server
npm install
```

### 3. Environment Configuration
Create `.env` file in the server directory:
```
PORT=3000
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run Server
```bash
npm start
# or for development
npm run dev
```

Server will start at `http://localhost:3000`

## API Usage Examples

### 1. Store Offer
```bash
curl -X POST http://localhost:3000/offer \
  -H "Content-Type: application/json" \
  -d '{
    "name": "AI Outreach Automation",
    "value_props": ["24/7 outreach", "6x more meetings"],
    "ideal_use_cases": ["B2B SaaS mid-market"]
  }'
```

### 2. Upload Leads CSV
```bash
curl -X POST http://localhost:3000/leads/upload \
  -F "leads=@leads.csv"
```

**Required CSV format:**
```csv
name,role,company,industry,location,linkedin_bio
John Doe,CEO,TechCorp,Technology,San Francisco,Tech entrepreneur with 10+ years
Jane Smith,VP Sales,SalesForce,Software,New York,Sales leader specializing in B2B
```

### 3. Process & Score Leads
```bash
curl -X POST http://localhost:3000/score
```

### 4. Get Results
```bash
curl -X GET http://localhost:3000/result
```

### 5. Download CSV Results
```bash
curl -X GET http://localhost:3000/download -o results.csv
```

## Project Structure

```
server/
├── controllers/          # Request handlers
│   ├── offerController.js
│   ├── leadsController.js
│   ├── scoreController.js
│   └── downloadController.js
├── routes/              # API routes
│   ├── offerRoute.js
│   ├── leadsRoute.js
│   ├── scoreRoute.js
│   └── downloadRoute.js
├── services/            # Business logic
│   ├── scoringService.js
│   └── aiService.js
├── utils/              # Helper functions
│   └── csvParser.js
├── views/              # EJS templates
│   ├── index.ejs
│   └── test.ejs
├── uploads/            # Temporary file storage
├── package.json
└── index.js            # Server entry point
```

## Technologies Used

- **Node.js & Express.js** - Backend framework
- **Google Gemini API** - AI integration for intent classification
- **Multer** - File upload handling
- **CSV Parser** - CSV file processing
- **EJS** - Template engine for documentation

## Features

- RESTful API design with proper error handling
- Rule-based scoring with configurable weights
- AI-powered intent classification using Google Gemini
- CSV upload and download functionality
- In-memory data storage (easily replaceable with database)
- Interactive web interface for testing
- Comprehensive API documentation

## Testing

Visit `http://localhost:3000/test` for an interactive interface to test all endpoints step by step.

## Deployment


## Area of Improvement

- Can do much better error handling
- Forget to commit while I did go according to steps and requirements according to the google docs
- Rule logic can be much better with keywords that are more similar to each other or similar roles but didn't get any api for it
- In future can use linkedin link and webscraper to generate which is better candidate for this role.
