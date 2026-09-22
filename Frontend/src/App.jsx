import { useEffect, useState } from "react";


// FastAPI backend address
const API_URL = "http://127.0.0.1:8000/api/employees";


function App() {
  // Employee list
  const [employees, setEmployees] = useState([]);

  // Form data
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    role: ""
  });

  // Success or error message
  const [message, setMessage] = useState("");

  // Message type: success or error
  const [messageType, setMessageType] = useState("success");


  // Load employees when page opens
  useEffect(() => {
    getEmployees();
  }, []);


  // Get all employees from backend
  async function getEmployees() {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Could not load employees");
      }

      const data = await response.json();

      setEmployees(data);
    } catch (error) {
      showMessage(error.message, "error");
    }
  }


  // Display success or error message
  function showMessage(text, type) {
    setMessage(text);
    setMessageType(type);
  }


  // Update form whenever the user types
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }


  // Add employee
  async function addEmployee(event) {
    event.preventDefault();

    const newEmployee = {
      id: Number(formData.id),
      name: formData.name.trim(),
      email: formData.email.trim(),
      role: formData.role.trim()
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newEmployee)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Could not add employee");
      }

      showMessage(data.message, "success");

      // Clear form
      setFormData({
        id: "",
        name: "",
        email: "",
        role: ""
      });

      // Refresh employee list
      await getEmployees();
    } catch (error) {
      showMessage(error.message, "error");
    }
  }


  // Delete employee by ID
  async function deleteEmployee(employeeId) {
    const confirmed = window.confirm(
      `Are you sure you want to delete employee ${employeeId}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${employeeId}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Could not delete employee");
      }

      showMessage(data.message, "success");

      // Refresh employee list
      await getEmployees();
    } catch (error) {
      showMessage(error.message, "error");
    }
  }


  // Delete all employees
  async function deleteAllEmployees() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all employees?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Could not delete employees");
      }

      showMessage(data.message, "success");
      setEmployees([]);
    } catch (error) {
      showMessage(error.message, "error");
    }
  }


  return (
    <main style={styles.page}>
      <section style={styles.container}>
        <h1 style={styles.title}>Employee Management System</h1>

        {message && (
          <p
            style={
              messageType === "error"
                ? styles.errorMessage
                : styles.successMessage
            }
          >
            {message}
          </p>
        )}

        {/* Add employee form */}
        <form onSubmit={addEmployee} style={styles.form}>
          <h2 style={styles.sectionTitle}>Add Employee</h2>

          <input
            style={styles.input}
            type="number"
            name="id"
            placeholder="Employee ID"
            value={formData.id}
            onChange={handleChange}
            min="1"
            required
          />

          <input
            style={styles.input}
            type="text"
            name="name"
            placeholder="Employee name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="Employee email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            type="text"
            name="role"
            placeholder="Employee role"
            value={formData.role}
            onChange={handleChange}
            required
          />

          <button type="submit" style={styles.addButton}>
            Add Employee
          </button>
        </form>

        {/* Employee list */}
        <section style={styles.employeeSection}>
          <div style={styles.headingRow}>
            <h2 style={styles.sectionTitle}>Employees</h2>

            <button
              type="button"
              onClick={deleteAllEmployees}
              style={styles.deleteAllButton}
              disabled={employees.length === 0}
            >
              Delete All
            </button>
          </div>

          {employees.length === 0 ? (
            <p style={styles.emptyMessage}>No employees found.</p>
          ) : (
            <div style={styles.cards}>
              {employees.map((employee) => (
                <article key={employee.id} style={styles.card}>
                  <h3 style={styles.employeeName}>{employee.name}</h3>

                  <p>
                    <strong>ID:</strong> {employee.id}
                  </p>

                  <p>
                    <strong>Email:</strong> {employee.email}
                  </p>

                  <p>
                    <strong>Role:</strong> {employee.role}
                  </p>

                  <button
                    type="button"
                    onClick={() => deleteEmployee(employee.id)}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}


// Basic frontend styling
const styles = {
  page: {
    minHeight: "100vh",
    padding: "30px",
    backgroundColor: "#f3f4f6",
    fontFamily: "Arial, sans-serif"
  },

  container: {
    maxWidth: "950px",
    margin: "0 auto"
  },

  title: {
    textAlign: "center",
    color: "#1f2937"
  },

  sectionTitle: {
    marginTop: 0,
    color: "#1f2937"
  },

  successMessage: {
    padding: "12px",
    color: "#166534",
    backgroundColor: "#dcfce7",
    borderRadius: "6px"
  },

  errorMessage: {
    padding: "12px",
    color: "#991b1b",
    backgroundColor: "#fee2e2",
    borderRadius: "6px"
  },

  form: {
    display: "grid",
    gap: "12px",
    padding: "24px",
    marginTop: "25px",
    marginBottom: "30px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)"
  },

  input: {
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #d1d5db",
    borderRadius: "6px"
  },

  addButton: {
    padding: "12px",
    color: "white",
    fontSize: "16px",
    backgroundColor: "#2563eb",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },

  employeeSection: {
    padding: "24px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)"
  },

  headingRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "16px"
  },

  card: {
    padding: "18px",
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "8px"
  },

  employeeName: {
    marginTop: 0,
    color: "#111827"
  },

  deleteButton: {
    padding: "9px 16px",
    color: "white",
    backgroundColor: "#dc2626",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },

  deleteAllButton: {
    padding: "10px 16px",
    color: "white",
    backgroundColor: "#991b1b",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },

  emptyMessage: {
    color: "#6b7280"
  }
};


export default App;
