import React, { useState } from 'react';
import './Analytics.css';
import analyticsData from './analyticsData.json';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

function Analytics() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleEmployeeClick = (id) => {
    setSelectedEmployee(analyticsData.find((employee) => employee.id === id));
  };

  const pieData = (taskPriorityDistribution) => ({
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        label: 'Task Priority Distribution',
        data: [
          taskPriorityDistribution.high,
          taskPriorityDistribution.medium,
          taskPriorityDistribution.low,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  });

  const barData = (tasksCompletedPerMonth) => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Tasks Completed',
        data: tasksCompletedPerMonth,
        backgroundColor: '#36A2EB',
      },
    ],
  });

  const lineData = (hoursLogged) => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Hours Logged',
        data: hoursLogged,
        borderColor: '#36A2EB',
        fill: false,
      },
    ],
  });

  return (
    <div className="analytics">
      <h2>Analytics</h2>
      <div className="employee-list">
        {analyticsData.map((employee) => (
          <button
            key={employee.id}
            onClick={() => handleEmployeeClick(employee.id)}
          >
            {employee.id}
          </button>
        ))}
      </div>

      {selectedEmployee && (
        <div className="analytics-details">
          <h3>Employee Performance Report</h3>
          <p>Task Completion Rate: {selectedEmployee.taskCompletionRate}</p>
          <p>
            Average Task Completion Time:{' '}
            {selectedEmployee.avgTaskCompletionTime}
          </p>
          <p>Task Overdue Rate: {selectedEmployee.taskOverdueRate}</p>

          <h3>Workload Distribution Report</h3>
          <p>Current Task Load: {selectedEmployee.currentTaskLoad}</p>
          <div className="chart">
            <Pie data={pieData(selectedEmployee.taskPriorityDistribution)} />
          </div>

          <h3>Productivity Report</h3>
          <div className="chart">
            <Bar data={barData(selectedEmployee.tasksCompletedPerMonth)} />
          </div>
          <div className="chart">
            <Line data={lineData(selectedEmployee.hoursLogged)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Analytics;
