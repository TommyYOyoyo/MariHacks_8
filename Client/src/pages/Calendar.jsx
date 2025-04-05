import React, { useState, useEffect, useRef } from "react"

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(null)
    const [events, setEvents] = useState(() => {
        const storedEvents = localStorage.getItem("calendarEvents")
        return storedEvents ? JSON.parse(storedEvents) : {}
    })
    const [eventText, setEventText] = useState("")
    const [editingIndex, setEditingIndex] = useState(null)

    const popupRef = useRef()

    useEffect(() => {
        const handleClickOutside = event => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setSelectedDate(null)
                setEventText("")
                setEditingIndex(null)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    useEffect(() => {
        localStorage.setItem("calendarEvents", JSON.stringify(events))
    }, [events])

    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

    const days = []
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i)
    }

    const prevMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
    }

    const nextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
    }

    const prevYear = () => {
        setCurrentDate(new Date(currentYear - 1, currentMonth, 1))
    }

    const nextYear = () => {
        setCurrentDate(new Date(currentYear + 1, currentMonth, 1))
    }

    const handleDateClick = day => {
        if (day) {
            const date = new Date(currentYear, currentMonth, day)
            setSelectedDate(date)
            setEventText("")
            setEditingIndex(null)
        }
    }

    const handleEventSubmit = () => {
        if (!eventText.trim()) return
        const dateKey = selectedDate.toDateString()
        const updatedEvents = { ...events }
        if (!updatedEvents[dateKey]) updatedEvents[dateKey] = []

        if (editingIndex !== null) {
            updatedEvents[dateKey][editingIndex] = eventText
        } else {
            updatedEvents[dateKey].push(eventText)
        }

        setEvents(updatedEvents)
        setEventText("")
        setEditingIndex(null)
    }

    const handleDeleteEvent = index => {
        const dateKey = selectedDate.toDateString()
        const updatedEvents = { ...events }
        updatedEvents[dateKey].splice(index, 1)
        if (updatedEvents[dateKey].length === 0) delete updatedEvents[dateKey]
        setEvents(updatedEvents)
    }

    const handleEditEvent = index => {
        const dateKey = selectedDate.toDateString()
        setEventText(events[dateKey][index])
        setEditingIndex(index)
    }

    const monthYearString = currentDate.toLocaleString("default", {
        month: "long",
        year: "numeric"
    })

    return (
        <div className="calendar">
            <div className="calendar-header">
                <button onClick={prevYear}>&laquo;</button>
                <button onClick={prevMonth}>&lt;</button>
                <h2>{monthYearString}</h2>
                <button onClick={nextMonth}>&gt;</button>
                <button onClick={nextYear}>&raquo;</button>
            </div>

            <div className="calendar-grid">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                    <div key={day} className="day-name">
                        {day}
                    </div>
                ))}

                {days.map((day, index) => {
                    const isSelected =
                        selectedDate &&
                        selectedDate.getDate() === day &&
                        selectedDate.getMonth() === currentMonth &&
                        selectedDate.getFullYear() === currentYear

                    const isToday =
                        new Date().getDate() === day &&
                        new Date().getMonth() === currentMonth &&
                        new Date().getFullYear() === currentYear

                    const dateKey = day
                        ? new Date(currentYear, currentMonth, day).toDateString()
                        : null
                    const hasEvents = dateKey && events[dateKey] && events[dateKey].length > 0

                    return (
                        <div
                            key={index}
                            className={`day ${day ? "" : "empty"} ${isSelected ? "selected" : ""} ${
                                isToday ? "today" : ""
                            }`}
                            onClick={() => handleDateClick(day)}
                        >
                            {day}
                            {hasEvents && <div className="event-dot"></div>}
                        </div>
                    )
                })}
            </div>

            {selectedDate && (
                <div className="event-popup" ref={popupRef}>
                    <h3>Events for {selectedDate.toDateString()}</h3>
                    <ul>
                        {(events[selectedDate.toDateString()] || []).map((event, index) => (
                            <li key={index}>
                                {event}
                                <button onClick={() => handleEditEvent(index)}>Edit</button>
                                <button onClick={() => handleDeleteEvent(index)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        value={eventText}
                        onChange={e => setEventText(e.target.value)}
                        placeholder="Enter event name"
                    />
                    <button onClick={handleEventSubmit}>
                        {editingIndex !== null ? "Update" : "Add"} Event
                    </button>
                </div>
            )}
        </div>
    )
}
