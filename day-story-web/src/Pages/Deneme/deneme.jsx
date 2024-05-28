import React, { useState } from 'react';
import './css/deneme.css'; // SCSS dosyanızı buraya import edin

const Calendar = () => {
    const [date, setDate] = useState(new Date(2024, 4, 1));

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const daysOfWeek = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

    const daysInMonth = getDaysInMonth(date.getFullYear(), date.getMonth());
    const firstDayOfMonth = getFirstDayOfMonth(date.getFullYear(), date.getMonth());

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`empty-${i}`}></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const day = new Date(date.getFullYear(), date.getMonth(), i);
        const dayOfWeek = daysOfWeek[day.getDay()];

        days.push(
            <div
                className={'calendar' + (day.getDate() === date.getDate() ? ' today' : '')}
                key={i}
                onClick={() => setDate(day)}
            >
                <div className="calendar__header">
                    <p className="calendar__header-dayno" >{i}</p>
                    <div>
                        <p className="calendar__header-dayname" >{dayOfWeek}</p>
                        <p className="calendar__header-month" >Mayıs</p>
                    </div>
                </div>
                <div className="calendar__image">
                </div>
            </div>
        );
    }

    return (
        <div className="root">
            <div className="days">
                {days}
            </div>
        </div>
    );
};

export default Calendar;
