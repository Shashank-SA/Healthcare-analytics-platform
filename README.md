# Enterprise Healthcare Analytics Platform (EMR Integration Module)

A modular, highly secure, and HIPAA-compliant **Healthcare Analytics Platform** designed to be seamlessly integrated as an embedded module within an existing Electronic Medical Record (EMR) system.

This platform allows clinicians and hospital administrators to generate high-fidelity analytical reports, cohort studies, and trend graphs using natural language prompts (e.g., *"Show patient visits today"*, *"Top diagnoses this month"*).

---

## 🏗️ Enterprise Architecture & Repository Layout

This project follows a professional, completely separated two-tier architecture tailored for high-volume healthcare environments (100,000+ active patients, multiple hospital facilities):

```text
healthcare-analytics-platform/
├── README.md                      # Platform main manual and configuration guide
├── ARCHITECTURE.md                # Comprehensive system topology and data-flow map
│
├── frontend/                      # CLIENT-SIDE WORKSPACE (React, Vite, Tailwind CSS)
│   ├── src/
│   │   ├── components/            # Reusable components (Charts, Filters, Tables, Common UI)
│   │   ├── pages/                 # Container pages (Dashboard, GenerateReport, SavedReports, History)
│   │   ├── services/              # API Client (Axios configuration, token-forwarding interceptors)
│   │   ├── data/                  # Clinical mock structures and local query caches
│   │   └── main.tsx               # Client entry point
│   ├── package.json                   # React and layout dependencies configuration
│   └── vite.config.ts                 # Dev server setups & reverse-proxies
│
└── backend/                       # SERVER-SIDE WORKSPACE (Node.js, Express, Prisma ORM, Google Gemini)
    ├── src/
    │   ├── config/                # Environment managers and database pool configs
    │   ├── controllers/           # Slim routing layers (Receives payloads, invokes business services)
    │   ├── routes/                # Endpoint mapping registries
    │   ├── middlewares/           # Structured audit logging (HIPAA), security headers, error shields
    │   ├── repositories/          # Isolated SQL transaction layer (Prisma bound, programmatically secure)
    │   └── services/              # Strict business logic capsules:
    │       ├── analytics-engine/  # Calculates KPIs, ratios, averages, and clinical trend coefficients
    │       ├── prompt-parser/     # Safely utilizes Google Gemini to parse NL clinical questions to JSON
    │       ├── query-builder/     # Programmatically builds safe Prisma queries (No AI-SQL execution!)
    │       ├── privacy/           # Masking proxy redacting names and MRNs before external API processing
    │       └── summary-service/   # Feeds aggregated statistics (no PHI) to Gemini for doctor-ready outlines
    ├── package.json               # Backend dependencies (express, @google/genai, exceljs, pdfkit, winston)
    └── server.ts                  # Server entry point and cluster manager
```

---

## 🔒 Security & HIPAA Compliance Safeguards

1. **Strict Separation of Concerns:** Core business logic is isolated inside Services. Database interactions are encapsulated inside Repositories. Controllers only route inputs/outputs.
2. **Zero PHI Leakage to Models:** The **Privacy Service** redacts patient identifiers (Names, Dates of Birth, MRNs, Phone Numbers) *before* clinical prompts are forwarded to third-party endpoints.
3. **No Direct SQL Generation:** Google Gemini is strictly forbidden from generating SQL. It only parses unstructured queries into structured intent configurations (JSON schemas). The server's programmatic **Query Builder** then translates the JSON schema into parameterized queries using Prisma. This completely eliminates SQL injection vectors.
4. **Anonymized Summarization:** The platform sends only high-level statistical aggregates (counts, trends) to Google Gemini to formulate written diagnostic outlines, ensuring no clinical identifiers are exposed.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer)
- PostgreSQL database instance

### Frontend Deployment
1. Navigate to the client directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server (configured on Port `3000` with HMR):
   ```bash
   npm run dev
   ```

### Backend Deployment
1. Navigate to the server directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your environmental values in a `.env` file matching this template:
   ```env
   PORT=3000
   NODE_ENV=production
   DATABASE_URL="postgresql://username:password@localhost:5432/emr_analytics?schema=public"
   GEMINI_API_KEY="your-google-gemini-api-key"
   ```
4. Perform Prisma schema generation:
   ```bash
   npm run prisma:generate
   ```
5. Boot the server:
   ```bash
   npm run dev
   ```

---

## 🛠️ Extensibility for Future Modules

The modular service pattern allows for effortless expansion. Future analysts can introduce modules such as:
- **Billing Analytics** (`src/services/analytics/billing/`)
- **Pharmacy Analytics** (`src/services/analytics/pharmacy/`)
- **Laboratory Analytics** (`src/services/analytics/laboratory/`)

Simply by attaching specialized repositories and mounting new routes in the `routes/analytics/` index.
