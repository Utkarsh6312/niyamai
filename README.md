# Niyamai - Regulatory Intelligence & Compliance Dashboard

Niyamai is an advanced AI-driven Regulatory Intelligence and Compliance Dashboard designed for enterprise risk and impact analytics. It provides comprehensive tools for monitoring compliance, policy management, regulatory document ingestion, and actionable intelligence to streamline regulatory operations.

## Features

- **AI Compliance Assistant:** Interactive intelligence for real-time compliance queries.
- **Risk & Impact Analytics:** Deep analytical insights into organizational risks.
- **Enterprise Workspace:** Centralized management of settings, SSO, and user roles.
- **Policy Library & Impact Mapping:** Trace policies against compliance requirements.
- **Regulatory Document Ingestion:** Automated ingestion and tracking of new regulatory documents.

## Project Structure

The project is structured into modular components:

- `web/`: Next.js frontend application containing the dashboards, built with React, Tailwind CSS, Framer Motion, and Recharts.
- `images/`: Design assets and reference screenshots of the dashboards.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Python](https://www.python.org/) (3.9 or higher) (for backend services)

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd web
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup (Python)

To run the Python AI services or backend API:

1. Create a virtual environment (optional but recommended):
   ```bash
   # On macOS/Linux
   python -m venv venv
   source venv/bin/activate
   
   # On Windows
   python -m venv venv
   venv\Scripts\activate
   ```
2. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```

## Technologies Used

- **Frontend:** Next.js, React, Tailwind CSS, shadcn/ui
- **Visuals:** Recharts, Framer Motion
- **Backend/AI:** Python (FastAPI, LLM APIs) *[Backend integration in progress]*


