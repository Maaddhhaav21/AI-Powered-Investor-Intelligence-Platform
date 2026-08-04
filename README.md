# 📊 AI Powered Investor Intelligence Platform

An AI-powered platform that enables investors to analyze annual reports using Retrieval-Augmented Generation (RAG), Large Language Models (LLMs), and semantic search.

The platform converts annual reports into searchable knowledge, allowing users to generate executive summaries, financial analyses, risk assessments, investment reports, extract key financial metrics, and ask natural language questions grounded in the uploaded report.

---

## 🚀 Features

### 📄 PDF Report Upload

- Upload annual reports in PDF format.
- Automatic document ingestion pipeline.
- Converts PDF to structured Markdown.
- Cleans and preprocesses extracted text.

---

### 🧠 AI-Powered Analysis

Generate comprehensive reports using Retrieval-Augmented Generation (RAG):

- Executive Summary
- Financial Analysis
- Risk Analysis
- Investment Report
- Financial Metrics Extraction

---

### 💬 AI Chat

Ask questions about the uploaded annual report.

Examples:

- What was the company's revenue?
- What are the major business risks?
- Summarize the annual report.
- What was the operating cash flow?
- How much debt does the company have?

All answers are generated from the uploaded document.

---

### 🔎 Semantic Search

The platform stores document embeddings inside ChromaDB and retrieves the most relevant document chunks before generating responses.

---

### 📈 Financial Metrics Extraction

Automatically extracts important financial metrics including:

- Revenue
- Net Income
- EPS
- Cash Flow
- Assets
- Liabilities
- Debt
- Equity
- Gross Margin
- Operating Margin
- Free Cash Flow
- Capital Expenditure

and many more.

---

### 📥 Export Reports

Generated reports can be

- Copied
- Downloaded as Markdown
- Printed

---

## 🏗️ Project Architecture

```
                    Annual Report (PDF)
                            │
                            ▼
                    PDF Validation
                            │
                            ▼
                 PDF → Markdown Conversion
                            │
                            ▼
                  Markdown Cleaning
                            │
                            ▼
                    Document Chunking
                            │
                            ▼
               Embedding Generation
                            │
                            ▼
                       ChromaDB
                            │
                ┌───────────┴───────────┐
                │                       │
                ▼                       ▼
          Semantic Search          AI Chat
                │
                ▼
        Retrieval Augmented Generation
                │
                ▼
      Executive Reports & Analysis
```

---

# 🛠 Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Query
- Axios
- React Markdown
- Framer Motion

---

## Backend

- FastAPI
- Python
- LangChain
- ChromaDB
- OpenAI API
- Docling
- Pydantic

---

## AI Stack

- Retrieval-Augmented Generation (RAG)
- Semantic Search
- Vector Embeddings
- Large Language Models
- Prompt Engineering

---

## 📂 Project Structure

```
AI_POWERED_INVESTOR_INTELLIGENCE
│
├── app
│   ├── api
│   ├── core
│   ├── ingestion
│   ├── llm
│   ├── processing
│   ├── schemas
│   ├── services
│   └── main.py
│
├── frontend
│   ├── src
│   ├── components
│   ├── hooks
│   ├── pages
│   ├── services
│   └── styles
│
├── chroma_db
├── data
├── requirements.txt
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/<your-username>/AI_POWERED_INVESTOR_INTELLIGENCE.git

cd AI_POWERED_INVESTOR_INTELLIGENCE
```

---

## Backend Setup

Create Virtual Environment

```bash
python -m venv .venv
```

Activate

### Windows

```bash
.venv\Scripts\activate
```

### macOS/Linux

```bash
source .venv/bin/activate
```

Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Environment Variables

Create a `.env` file.

```
OPENAI_API_KEY=your_api_key
MODEL_NAME=gpt-4.1-mini
```

---

## Run Backend

```bash
uvicorn app.main:app --reload
```

Backend runs at

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

Navigate to frontend

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# 📌 Workflow

1. Upload Annual Report
2. Document is converted to Markdown
3. Markdown is cleaned
4. Text is chunked
5. Embeddings are generated
6. Chunks are stored in ChromaDB
7. User requests analysis
8. Relevant chunks are retrieved
9. LLM generates grounded response
10. Results are displayed in the dashboard

---

# 📸 Screenshots

Add screenshots here.

Examples:

```
Dashboard

Upload Report

Chat

Executive Summary

Financial Analysis

Risk Analysis

Metrics

Investment Report
```

---

# 🔮 Future Enhancements

- Multi-document support
- Company comparison
- Financial ratio visualization
- Interactive charts
- PDF report export
- User authentication
- Cloud deployment
- Portfolio management
- Historical report comparison
- Source highlighting
- Multi-user support

---

# 📚 Concepts Used

- Retrieval-Augmented Generation (RAG)
- Vector Databases
- Embedding Models
- Semantic Search
- Prompt Engineering
- Large Language Models
- Markdown Processing
- FastAPI
- React
- TypeScript

---

# 👨‍💻 Author

**Madhav Manoj**

Computer Science Engineering

VIT-AP University
