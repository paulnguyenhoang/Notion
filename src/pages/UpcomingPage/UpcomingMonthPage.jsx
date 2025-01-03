import React, { useState, useEffect } from 'react';
import './UpcomingMonthPage.scss';

import NavBar from '../../Components/NavBar/NavBar';

// Mock data for important and not important notes and plans
const mockImportantNotes = [
    { id: 1, content: 'Important Note 1', dueDate: '2025-01-01' },
    { id: 2, content: 'Important Note 2', dueDate: '2025-01-05' },
];

const mockImportantPlans = [
    { id: 1, content: 'Important Plan 1', dueDate: '2025-01-03' },
    {
        id: 2,
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
        dueDate: '2025-11-10',
    },
];

const mockNotImportantNotes = [
    { id: 1, content: 'Not Important Note 1', dueDate: '2025-01-15' },
    { id: 2, content: 'Not Important Note 2', dueDate: '2025-01-20' },
];

const mockNotImportantPlans = [
    { id: 1, content: 'Not Important Plan 1', dueDate: '2025-01-25' },
    {
        id: 2,
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
        dueDate: '2025-11-30',
    },
];

const UpcomingMonth = () => {
    const [listTask, setListTask] = useState([]);
    const [idTask, setIdTask] = useState(0);
    const [importantNotes, setImportantNotes] = useState([]);
    const [importantPlans, setImportantPlans] = useState([]);
    const [notImportantNotes, setNotImportantNotes] = useState([]);
    const [notImportantPlans, setNotImportantPlans] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        setImportantNotes(mockImportantNotes);
        setImportantPlans(mockImportantPlans);
        setNotImportantNotes(mockNotImportantNotes);
        setNotImportantPlans(mockNotImportantPlans);
    }, []);

    const getFormattedDate = () => {
        const options = { month: 'long', year: 'numeric' };
        return currentDate.toLocaleDateString('en-US', options);
    };

    const handlePreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const calendar = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            calendar.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const notes = importantNotes
                .filter((note) => note.dueDate === date)
                .concat(notImportantNotes.filter((note) => note.dueDate === date));
            const plans = importantPlans
                .filter((plan) => plan.dueDate === date)
                .concat(notImportantPlans.filter((plan) => plan.dueDate === date));

            calendar.push(
                <div key={date} className="calendar-day">
                    <div className="date">{day}</div>
                    <div className="notes">
                        {notes.map((note) => (
                            <div key={note.id} className="note">
                                {note.content}
                            </div>
                        ))}
                    </div>
                    <div className="plans">
                        {plans.map((plan) => (
                            <div key={plan.id} className="plan">
                                {plan.content}
                            </div>
                        ))}
                    </div>
                </div>,
            );
        }

        return calendar;
    };

    const renderWeekdays = () => {
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return weekdays.map((day) => (
            <div key={day} className="calendar-weekday">
                {day}
            </div>
        ));
    };

    return (
        <div className="upcoming-month-container">
           <div className="sidebar">
                <NavBar listTask={listTask} setListTask={setListTask} setIdTask={setIdTask} idTask={idTask} />
            </div>
            <div className="content">
                <div className="heading-container">
                    <h1 className="upcoming-heading">UPCOMING</h1>
                    <div className="month-nav-container">
                        <button className="month-nav" onClick={handlePreviousMonth}>
                            &lt;
                        </button>
                        <h2 className="date-heading">{getFormattedDate()}</h2>
                        <button className="month-nav" onClick={handleNextMonth}>
                            &gt;
                        </button>
                    </div>
                </div>
                <div className="calendar">
                    {renderWeekdays()}
                    {renderCalendar()}
                </div>
            </div>
        </div>
    );
};

export default UpcomingMonth;
