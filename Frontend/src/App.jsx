import { useState } from "react";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  // GET ALL EMPLOYEES
  async function getEmployees() {
    const response = await fetch(
      "http://127.0.0.1:8000/employees"
    );

    const data = await response.json();
    setEmployees(data);
  }

  // GET EMPLOYEE BY ID
  async function getEmployeeById() {
    const response = await fetch(
      `http://127.0.0.1:8000/employees/${employeeId}`
    );

    if (!response.ok) {
      setEmployee(null);
      setError("Employee ID not found");
      return;
    }

    const data = await response.json();

    setEmployee(data);
    setError("");
  }

  // UPDATE EMPLOYEE
  async function updateEmployee() {
    const response = await fetch(
      `http://127.0.0.1:8000/employees/${employeeId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Number(employeeId),
          name: name,
          email: email,
          role: role,
        }),
      }
    );

    const data = await response.json();
    setEmployee(data);
  }

  return (
    <main>
      <h1>Employee Management</h1>

      {/* GET ALL */}
      <section>
        <h2>All Employees</h2>

        <button onClick={getEmployees}>
          Get All Employees
        </button>

        {employees.map((emp) => (
          <div className="employee-card" key={emp.id}>
            <strong>{emp.name}</strong>
            <p>ID: {emp.id}</p>
            <p>Email: {emp.email}</p>
            <p>Role: {emp.role}</p>
          </div>
        ))}
      </section>

      {/* GET BY ID */}
      <section>
        <h2>Find Employee</h2>

        <input
          type="number"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />

        <button onClick={getEmployeeById}>
          Search
        </button>

        {error && <p className="error">{error}</p>}

        {employee && (
          <div className="employee-card">
            <strong>{employee.name}</strong>
            <p>ID: {employee.id}</p>
            <p>Email: {employee.email}</p>
            <p>Role: {employee.role}</p>
          </div>
        )}
      </section>

      {/* UPDATE */}
      <section>
        <h2>Update Employee</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <button onClick={updateEmployee}>
          Update
        </button>
      </section>
    </main>
  );
}

export default App;