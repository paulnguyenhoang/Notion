import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UpcomingDayPage.scss';

import NavBar from '../../components/Navbar/Navbar';

const UpcomingDayPage = () => {
    const [listTask, setListTask] = useState([]);
    const [idTask, setIdTask] = useState(0);
    const getFormattedDate = () => {
        const today = new Date();
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return today.toLocaleDateString('en-US', options);
    };

    return (
        <div className="today-page-container">
            <div className="sidebar">
                <NavBar listTask={listTask} setListTask={setListTask} setIdTask={setIdTask} idTask={idTask} />
            </div>
            <div className="content">
                <div className="heading-container">
                    <h1 className="today-heading">UPCOMING</h1>
                    <h2 className="date-heading">{getFormattedDate()}</h2>
                </div>
                <p></p>
            </div>
        </div>
    );
};

export default UpcomingDayPage;
