from fastapi import FastAPI, Request
import weaviate
import uvicorn

app = FastAPI(title="Weaviate Search API")

client = weaviate.Client("http://localhost:8080")

@app.get("/kb")
def query_kb(q: str):
    response = client.query.get("AnomalyEvent", ["text"])\
        .with_near_text({"concepts": [q]})\
        .with_limit(1)\
        .do()
    
    retrieved_text = response['data']['Get']['AnomalyEvent'][0]['text']
    return {"answer": retrieved_text}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
