import React, { useState } from 'react';
import './Reports.css';
import reportsData from './ReportsData.json';
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

function Reports() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleEmployeeClick = (id) => {
    setSelectedEmployee(reportsData.find((report) => report.id === id));
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
    <div className="reports">
      <h2>Reports</h2>
      <div className="employee-list">
        {reportsData.map((employee) => (
          <button
            key={employee.id}
            onClick={() => handleEmployeeClick(employee.id)}
          >
            {employee.id}
          </button>
        ))}
      </div>

      {selectedEmployee && (
        <div className="report-details">
          <h3>Employee Performance Report</h3>
          <p>
            Task Completion Rate:{' '}
            {selectedEmployee.performanceReport.taskCompletionRate}
          </p>
          <p>
            Average Task Completion Time:{' '}
            {selectedEmployee.performanceReport.avgTaskCompletionTime}
          </p>
          <p>
            Task Overdue Rate:{' '}
            {selectedEmployee.performanceReport.taskOverdueRate}
          </p>

          <h3>Workload Distribution Report</h3>
          <p>
            Current Task Load: {selectedEmployee.workloadReport.currentTaskLoad}
          </p>
          <div className="chart">
            <Pie
              data={pieData(
                selectedEmployee.workloadReport.taskPriorityDistribution
              )}
            />
          </div>

          <h3>Productivity Report</h3>
          <div className="chart">
            <Bar
              data={barData(
                selectedEmployee.productivityReport.tasksCompletedPerMonth
              )}
            />
          </div>
          <div className="chart">
            <Line
              data={lineData(selectedEmployee.productivityReport.hoursLogged)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Reports;
