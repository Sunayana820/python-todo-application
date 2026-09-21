from fastapi import FastAPI

app = FastAPI()

@app.post("/tasks")
def add_task(task: str):
    print(task)
    return {"task": task}