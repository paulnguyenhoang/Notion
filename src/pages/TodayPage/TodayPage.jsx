import React, { useState, useEffect } from 'react';
import './TodayPage.scss';

// import NavBar from '../../Components/NavBar1/NavBar1';
import NavBar from '../../Components/NavBar/NavBar';


// Mock data for important and not important notes and plans
const mockImportantNotes = [
    { id: 1, content: 'Important Note 1', dueTime: '10:00 AM' },
    { id: 2, content: 'Important Note 2', dueTime: '2:00 PM' },
];

const mockImportantPlans = [
    { id: 1, content: 'Important Plan 1', dueTime: '11:00 AM' },
    {
        id: 2,
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
        dueTime: '3:00 PM',
    },
];

const mockNotImportantNotes = [
    { id: 1, content: 'Not Important Note 1', dueTime: '4:00 PM' },
    { id: 2, content: 'Not Important Note 2', dueTime: '5:00 PM' },
];

const mockNotImportantPlans = [
    { id: 1, content: 'Not Important Plan 1', dueTime: '6:00 PM' },
    {
        id: 2,
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
        dueTime: '7:00 PM',
    },
];

const TodayPage = () => {
    const [listTask, setListTask] = useState([]);
    const [idTask, setIdTask] = useState(0);
    const [importantNotes, setImportantNotes] = useState([]);
    const [importantPlans, setImportantPlans] = useState([]);
    const [notImportantNotes, setNotImportantNotes] = useState([]);
    const [notImportantPlans, setNotImportantPlans] = useState([]);
    const [fadeOutNotes, setFadeOutNotes] = useState([]);
    const [fadeOutPlans, setFadeOutPlans] = useState([]);
    const [fadeOutNotImportantNotes, setFadeOutNotImportantNotes] = useState([]);
    const [fadeOutNotImportantPlans, setFadeOutNotImportantPlans] = useState([]);

    useEffect(() => {
        setImportantNotes(mockImportantNotes);
        setImportantPlans(mockImportantPlans);
        setNotImportantNotes(mockNotImportantNotes);
        setNotImportantPlans(mockNotImportantPlans);
    }, []);

    const getFormattedDate = () => {
        const today = new Date();
        const options = { weekday: 'short', day: 'numeric', month: 'short' };
        return today.toLocaleDateString('en-US', options);
    };

    const handleNoteDelete = (id) => {
        setFadeOutNotes((prev) => [...prev, id]);
        setTimeout(() => {
            setImportantNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
            setFadeOutNotes((prev) => prev.filter((noteId) => noteId !== id));
        }, 500);
    };

    const handlePlanDelete = (id) => {
        setFadeOutPlans((prev) => [...prev, id]);
        setTimeout(() => {
            setImportantPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== id));
            setFadeOutPlans((prev) => prev.filter((planId) => planId !== id));
        }, 500);
    };

    const handleNotImportantNoteDelete = (id) => {
        setFadeOutNotImportantNotes((prev) => [...prev, id]);
        setTimeout(() => {
            setNotImportantNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
            setFadeOutNotImportantNotes((prev) => prev.filter((noteId) => noteId !== id));
        }, 500);
    };

    const handleNotImportantPlanDelete = (id) => {
        setFadeOutNotImportantPlans((prev) => [...prev, id]);
        setTimeout(() => {
            setNotImportantPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== id));
            setFadeOutNotImportantPlans((prev) => prev.filter((planId) => planId !== id));
        }, 500);
    };

    return (
        <div className="today-page-container">
            <div className="sidebar">
                <NavBar listTask={listTask} setListTask={setListTask} setIdTask={setIdTask} idTask={idTask} />
            </div>
            <div className="content">
                <div className="heading-container">
                    <h1 className="today-heading">TODAY</h1>
                    <h2 className="date-heading">{getFormattedDate()}</h2>
                </div>
                <div className="important-section">
                    <h3>Important</h3>
                    <ul className="important-list">
                        {importantNotes.map((note) => (
                            <li
                                key={note.id}
                                className={`important-item ${fadeOutNotes.includes(note.id) ? 'fade-out' : ''}`}
                            >
                                <div className="left-section">
                                    <input
                                        type="checkbox"
                                        className="tick-circle"
                                        onChange={() => handleNoteDelete(note.id)}
                                    />
                                    <span className="due-time">{note.dueTime}</span>
                                </div>
                                <span className="item-content">{note.content}</span>
                            </li>
                        ))}
                    </ul>
                    <ul className="important-list">
                        {importantPlans.map((plan) => (
                            <li
                                key={plan.id}
                                className={`important-item ${fadeOutPlans.includes(plan.id) ? 'fade-out' : ''}`}
                            >
                                <div className="left-section">
                                    <input
                                        type="checkbox"
                                        className="tick-circle"
                                        onChange={() => handlePlanDelete(plan.id)}
                                    />
                                    <span className="due-time">{plan.dueTime}</span>
                                </div>
                                <span className="item-content">{plan.content}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="not-important-section">
                    <h3>Not So Important?</h3>
                    <ul className="important-list">
                        {notImportantNotes.map((note) => (
                            <li
                                key={note.id}
                                className={`important-item ${
                                    fadeOutNotImportantNotes.includes(note.id) ? 'fade-out' : ''
                                }`}
                            >
                                <div className="left-section">
                                    <input
                                        type="checkbox"
                                        className="tick-circle"
                                        onChange={() => handleNotImportantNoteDelete(note.id)}
                                    />
                                    <span className="due-time">{note.dueTime}</span>
                                </div>
                                <span className="item-content">{note.content}</span>
                            </li>
                        ))}
                    </ul>
                    <ul className="important-list">
                        {notImportantPlans.map((plan) => (
                            <li
                                key={plan.id}
                                className={`important-item ${
                                    fadeOutNotImportantPlans.includes(plan.id) ? 'fade-out' : ''
                                }`}
                            >
                                <div className="left-section">
                                    <input
                                        type="checkbox"
                                        className="tick-circle"
                                        onChange={() => handleNotImportantPlanDelete(plan.id)}
                                    />
                                    <span className="due-time">{plan.dueTime}</span>
                                </div>
                                <span className="item-content">{plan.content}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TodayPage;
