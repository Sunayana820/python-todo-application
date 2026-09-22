from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


# Create FastAPI application
app = FastAPI()


# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# Employee structure
class Employee(BaseModel):
    id: int
    name: str
    email: str
    role: str


# Temporary employee data
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


# Add a new employee
@app.post("/api/employees", status_code=201)
def add_employee(employee: Employee):

    # Check whether employee ID already exists
    for existing_employee in employees:
        if existing_employee["id"] == employee.id:
            raise HTTPException(
                status_code=400,
                detail="Employee ID already exists"
            )

    # Convert Employee object into a dictionary
    new_employee = employee.model_dump()

    # Add employee to the list
    employees.append(new_employee)

    return {
        "message": "Employee added successfully",
        "employee": new_employee
    }


# Delete one employee using ID
@app.delete("/api/employees/{employee_id}")
def delete_employee_by_id(employee_id: int):

    for employee in employees:
        if employee["id"] == employee_id:
            employees.remove(employee)

            return {
                "message": f"Employee {employee_id} deleted successfully"
            }

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


# Delete all employees
@app.delete("/api/employees")
def delete_all_employees():

    employees.clear()

    return {
        "message": "All employees deleted successfully"
    }