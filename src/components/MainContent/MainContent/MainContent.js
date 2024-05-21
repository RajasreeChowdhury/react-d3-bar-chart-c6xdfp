import React from 'react';
import './MainContent.css';
import ManagerInfo from '../ManagerInfo/ManagerInfo';
import Employees from '../Employees/Employees';
import Reports from '../Reports/Reports';
import Analytics from '../Analytics/Analytics';
import Calendar from '../Calendar/Calendar'; // Import the Calendar component

function MainContent({ selectedItem }) {
  let content;
  switch (selectedItem) {
    case 'Employees':
      content = <Employees />;
      break;
    case 'Reports':
      content = <Reports />;
      break;
    case 'Analytics':
      content = <Analytics />;
      break;
    case 'Calendar':
      content = <Calendar />;
      break;
    case 'Dashboard':
      content = <div>Dashboard Content</div>;
      break;
    case 'ManagerInfo':
    default:
      content = <ManagerInfo />;
      break;
  }

  return (
    <div className="main-content">
      <div className="header">
        <div className="logo">
          {/* <img src={companyLogo} alt="Company Logo" /> */}
        </div>
        <input type="text" className="search-bar" placeholder="Search..." />
        <div className="profile-picture">
          {/* <img src={profilePicture} alt="Profile Picture" /> */}
        </div>
      </div>
      {content}
    </div>
  );
}

export default MainContent;
