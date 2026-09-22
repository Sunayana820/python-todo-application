from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class Employee(BaseModel):
    id: int
    name: str
    email: str
    role: str


employees = [
    {
        "id": 1,
        "name": "Akhil",
        "email": "akhil@gmail.com",
        "role": "Software Engineer"
    },
    {
        "id": 2,
        "name": "Rohit",
        "email": "rohit@gmail.com",
        "role": "Data Scientist"
    },
    {
        "id": 3,
        "name": "Rahul",
        "email": "rahul@gmail.com",
        "role": "Product manager"
    },
    {
        "id": 4,
        "name": "Priya",
        "email": "priya@gmail.com",
        "role": "Electronics"
    }
]


# Get all employees
@app.get("/employees")
def get_employees():
    return employees


# Get employee by ID
@app.get("/employees/{employee_id}")
def get_employee_by_id(employee_id: int):
    for employee in employees:
        if employee["id"] == employee_id:
            return employee

    raise HTTPException(
        status_code=404,
        detail="Employee not found"
    )


# Update employee by ID
@app.put("/employees/{employee_id}")
def update_employee(employee_id: int, updated_employee: Employee):
    for employee in employees:
        if employee["id"] == employee_id:
            employee["name"] = updated_employee.name
            employee["email"] = updated_employee.email
            employee["role"] = updated_employee.role

            return employee

    raise HTTPException(
        status_code=404,
        detail="Employee not found"
    )