# Weaviate Search API

A simple FastAPI application that interfaces with Weaviate for semantic search.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Make sure Weaviate is running on http://localhost:8080

3. Run the API:
```bash
python main.py
```

The API will be available at http://localhost:8000

## Endpoints

- GET `/kb?q={query}` - Search the knowledge base with a query string
