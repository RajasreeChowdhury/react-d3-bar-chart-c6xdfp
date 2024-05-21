import React, { useEffect, useState } from 'react';
import './Employees.css';
import employeesData from './employees.json'; // Import the JSON data

function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Since we're importing the JSON directly, we can set it directly.
    setEmployees(employeesData);
  }, []);

  return (
    <div className="employees">
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Reporting Manager</th>
            <th>Projects</th>
            <th>Experience</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.dob}</td>
              <td>{employee.phone}</td>
              <td>{employee.email}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>{employee.reportingManager}</td>
              <td>{employee.projects.join(', ')}</td>
              <td>{employee.experience}</td>
              <td>{employee.feedback}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employees;
