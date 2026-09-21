Backend Setup

Open a terminal inside the Backend folder.

1. Create a Virtual Environment
python -m venv todo_env
2. Activate the Virtual Environment
.\todo_env\Scripts\Activate.ps1
3. Install Dependencies
pip install -r requirements.txt
4. Run the Backend
uvicorn main:app --reload

Backend:

http://127.0.0.1:8000

FastAPI documentation:

http://127.0.0.1:8000/docs