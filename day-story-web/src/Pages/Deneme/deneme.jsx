import { Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';

const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

const daysOfWeek = ['Pzr', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];

const monthNames = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
];

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth === 1 ? 12 : prevMonth - 1;
      if (newMonth === 12) {
        setCurrentYear((prevYear) => prevYear - 1);
      }
      return newMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth === 12 ? 1 : prevMonth + 1;
      if (newMonth === 1) {
        setCurrentYear((prevYear) => prevYear + 1);
      }
      return newMonth;
    });
  };

  const renderCalendar = () => {
    const calendar = [];

    for (let month = 1; month <= 12; month++) {
      const days = daysInMonth(month, currentYear);
      const firstDay = new Date(currentYear, month - 1, 1).getDay();

      const monthDays = [];

      for (let i = 0; i < firstDay; i++) {
        monthDays.push(<Grid item key={`empty-${i}`} />);
      }

      for (let day = 1; day <= days; day++) {
        monthDays.push(
          <Grid item key={`day-${day}`} xs={12} sm={4} md={3}>
            <Button variant="outlined" fullWidth>
              <Typography variant="h6">{day}</Typography>
              <Typography variant="caption">
                {daysOfWeek[(firstDay + day - 1) % 7]}
              </Typography>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: 'lightgray',
                  marginTop: '8px',
                }}
              />
            </Button>
          </Grid>
        );
      }

      calendar.push(
        <div key={`month-${month}`}>
          <Typography variant="h4" gutterBottom>
            {monthNames[month - 1]} {currentYear}
          </Typography>
          <Grid container spacing={2}>
            {monthDays}
          </Grid>
        </div>
      );
    }

    return calendar;
  };

  return (
    <div>
      <Grid container justifyContent="space-between" alignItems="center" mb={2}>
        <Grid item>
          <Button onClick={handlePrevMonth}></Button>
        </Grid>
        <Grid item>
          <Typography variant="h5">
            {currentYear}
          </Typography>
        </Grid>
        <Grid item>
          <Button onClick={handleNextMonth}></Button>
        </Grid>
      </Grid>
      {renderCalendar()}
    </div>
  );
};

export default Calendar;