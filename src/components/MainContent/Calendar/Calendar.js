import React, { useState } from 'react';
import {
  Calendar as AntdCalendar,
  Modal,
  Button,
  Radio,
  Select,
  Badge,
} from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import moment from 'moment';
import './Calendar.css';

const { Option } = Select;

const dummyData = [
  {
    date: moment('2023-05-20'),
    tasks: [
      { name: 'Task 1', assignee: 'John Doe', status: 'Pending' },
      { name: 'Task 2', assignee: 'Jane Smith', status: 'Completed' },
    ],
    events: [
      {
        name: 'Event 1',
        time: '10:00 AM',
        attendees: ['John Doe', 'Jane Smith'],
      },
    ],
  },
  // Add more dummy data as needed
];

function Calendar() {
  const [view, setView] = useState('month');
  const [selectedDate, setSelectedDate] = useState(moment());
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handlePanelChange = (date, mode) => {
    setSelectedDate(date);
    setView(mode);
  };

  const handleViewChange = (e) => {
    setView(e.target.value);
  };

  const handleModalOpen = (data) => {
    setModalData(data);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setModalData(null);
  };

  const dateCellRender = (date) => {
    const dayData = dummyData.find((item) => item.date.isSame(date, 'day'));
    if (dayData) {
      return (
        <div>
          {dayData.tasks.map((task, index) => (
            <Badge
              key={index}
              status={task.status === 'Completed' ? 'success' : 'warning'}
              text={task.name}
            />
          ))}
          {dayData.events.map((event, index) => (
            <Badge key={index} color="blue" text={event.name} />
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-navigation">
        <Button
          icon={<LeftOutlined />}
          onClick={() =>
            handleDateChange(selectedDate.clone().subtract(1, view))
          }
        />
        <Select value={view} onChange={handleViewChange} style={{ width: 120 }}>
          <Option value="month">Month</Option>
          <Option value="week">Week</Option>
          <Option value="day">Day</Option>
        </Select>
        <Button
          icon={<RightOutlined />}
          onClick={() => handleDateChange(selectedDate.clone().add(1, view))}
        />
        <Button onClick={() => handleDateChange(moment())}>Today</Button>
      </div>
      <AntdCalendar
        value={selectedDate}
        onPanelChange={handlePanelChange}
        dateCellRender={dateCellRender}
        mode={view}
      />
      <Modal visible={modalVisible} onCancel={handleModalClose} footer={null}>
        {modalData && (
          <div>
            <h3>{modalData.name}</h3>
            <p>Assignee: {modalData.assignee}</p>
            <p>Status: {modalData.status}</p>
            <p>Time: {modalData.time}</p>
            <p>Attendees: {modalData.attendees?.join(', ')}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Calendar;
