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

  const [addId, setAddId] = useState("");
  const [addName, setAddName] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addRole, setAddRole] = useState("");

  const BASE_URL = "http://127.0.0.1:8000";


  // 1. GET ALL EMPLOYEES
  async function getEmployees() {
    const response = await fetch(`${BASE_URL}/employees`);
    const data = await response.json();

    setEmployees(data);
  }


  // 2. GET EMPLOYEE BY ID
  async function getEmployeeById() {
    const response = await fetch(
      `${BASE_URL}/employees/${employeeId}`
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


  // 3. ADD EMPLOYEE
  async function addEmployee() {
    const response = await fetch(
      `${BASE_URL}/api/employees`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Number(addId),
          name: addName,
          email: addEmail,
          role: addRole,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.detail);
      return;
    }

    alert(data.message);

    setAddId("");
    setAddName("");
    setAddEmail("");
    setAddRole("");

    getEmployees();
  }


  // 4. UPDATE EMPLOYEE
  async function updateEmployee() {
    const response = await fetch(
      `${BASE_URL}/employees/${employeeId}`,
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

    if (!response.ok) {
      setError("Employee ID not found");
      return;
    }

    const data = await response.json();

    setEmployee(data);
    setError("");

    getEmployees();
  }


  // 5. DELETE EMPLOYEE BY ID
  async function deleteEmployee() {
    const response = await fetch(
      `${BASE_URL}/api/employees/${employeeId}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.detail);
      return;
    }

    setEmployee(null);
    setError("");

    alert(data.message);

    getEmployees();
  }


  // 6. DELETE ALL EMPLOYEES
  async function deleteAllEmployees() {
    const response = await fetch(
      `${BASE_URL}/api/employees`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    alert(data.message);

    setEmployees([]);
    setEmployee(null);
  }


  return (
    <main>
      <h1>Employee Management</h1>


      {/* GET ALL EMPLOYEES */}
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


      {/* GET EMPLOYEE BY ID */}
      <section>
        <h2>Employee By ID</h2>

        <input
          type="number"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          onWheel={(e) => e.currentTarget.blur()}
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


      {/* ADD EMPLOYEE */}
      <section>
        <h2>Add Employee</h2>

        <input
          type="number"
          placeholder="Employee ID"
          value={addId}
          onChange={(e) => setAddId(e.target.value)}
          onWheel={(e) => e.currentTarget.blur()}
        />

        <input
          type="text"
          placeholder="Name"
          value={addName}
          onChange={(e) => setAddName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={addEmail}
          onChange={(e) => setAddEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Role"
          value={addRole}
          onChange={(e) => setAddRole(e.target.value)}
        />

        <button onClick={addEmployee}>
          Add Employee
        </button>
      </section>


      {/* UPDATE EMPLOYEE */}
      <section>
        <h2>Update Employee</h2>

        <input
          type="number"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          onWheel={(e) => e.currentTarget.blur()}
        />

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
          Update Employee
        </button>
      </section>


      {/* DELETE EMPLOYEE BY ID */}
      <section>
        <h2>Delete Employee</h2>

        <input
          type="number"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          onWheel={(e) => e.currentTarget.blur()}
        />

        <button onClick={deleteEmployee}>
          Delete Employee
        </button>
      </section>


      {/* DELETE ALL EMPLOYEES */}
      <section>
        <h2>Delete All Employees</h2>

        <button onClick={deleteAllEmployees}>
          Delete All Employees
        </button>
      </section>
    </main>
  );
}

export default App;