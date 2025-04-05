import React, { useState, useEffect } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { google } from 'googleapis';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  getDay,
  addDays,
  subDays,
  parseISO
} from 'date-fns';

const GoogleCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    notes: ''
  });
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [gapiLoaded, setGapiLoaded] = useState(false);

  // Load the Google API client library
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      window.gapi.load('client:auth2', initClient);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initClient = () => {
    window.gapi.client.init({
      apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
      clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      scope: 'https://www.googleapis.com/auth/calendar.events'
    }).then(() => {
      setGapiLoaded(true);
      window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  };

  const updateSigninStatus = (isSignedIn) => {
    setIsSignedIn(isSignedIn);
    if (isSignedIn) {
      fetchEvents();
    } else {
      setEvents([]);
    }
  };

  const handleAuthClick = () => {
    if (isSignedIn) {
      window.gapi.auth2.getAuthInstance().signOut();
    } else {
      window.gapi.auth2.getAuthInstance().signIn();
    }
  };

  const fetchEvents = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);

    window.gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': monthStart.toISOString(),
      'timeMax': monthEnd.toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'orderBy': 'startTime'
    }).then(response => {
      const formattedEvents = response.result.items.map(event => ({
        id: event.id,
        title: event.summary,
        date: event.start.dateTime || event.start.date,
        time: event.start.dateTime ? format(parseISO(event.start.dateTime), 'HH:mm') : '',
        location: event.location || '',
        notes: event.description || ''
      }));
      setEvents(formattedEvents);
    });
  };

  // Calendar display logic
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDay = getDay(monthStart);
  const daysFromPrevMonth = startDay === 0 ? 0 : startDay;
  const endDay = getDay(monthEnd);
  const daysFromNextMonth = endDay === 6 ? 0 : 6 - endDay;
  const calendarStart = subDays(monthStart, daysFromPrevMonth);
  const calendarEnd = addDays(monthEnd, daysFromNextMonth);
  const daysInView = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const navigateMonth = (direction) => {
    const newMonth = direction === 'prev' ? subMonths(currentMonth, 1) : addMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
    if (isSignedIn) {
      fetchEvents();
    }
  };

  const handleDateClick = (day) => {
    if (!isSameMonth(day, currentMonth)) return;
    setSelectedDate(day);
    setNewEvent({
      title: '',
      date: format(day, 'yyyy-MM-dd'),
      time: '',
      location: '',
      notes: ''
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) return;

    const event = {
      'summary': newEvent.title,
      'description': newEvent.notes,
      'location': newEvent.location,
      'start': {
        'dateTime': newEvent.time 
          ? `${newEvent.date}T${newEvent.time}:00`
          : newEvent.date,
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      'end': {
        'dateTime': newEvent.time 
          ? `${newEvent.date}T${parseInt(newEvent.time.split(':')[0]) + 1}:${newEvent.time.split(':')[1]}:00`
          : newEvent.date,
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    };

    window.gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event
    }).then(() => {
      fetchEvents();
      setShowModal(false);
    });
  };

  const getEventsForDay = (day) => {
    return events.filter(event => isSameDay(parseISO(event.date), day));
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Google Calendar Integration</h1>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <button 
          onClick={handleAuthClick}
          style={{ 
            padding: '0.5rem 1rem',
            backgroundColor: isSignedIn ? '#f44336' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isSignedIn ? 'Sign Out' : 'Sign In with Google'}
        </button>
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <button 
          onClick={() => navigateMonth('prev')}
          style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
        >
          Previous
        </button>
        <h2 style={{ margin: 0 }}>
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button 
          onClick={() => navigateMonth('next')}
          style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
        >
          Next
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '0.5rem'
      }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} style={{ 
            textAlign: 'center', 
            fontWeight: 'bold',
            padding: '0.5rem'
          }}>
            {day}
          </div>
        ))}

        {daysInView.map(day => {
          const dayEvents = getEventsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          
          return (
            <div
              key={day.toString()}
              onClick={() => handleDateClick(day)}
              style={{
                minHeight: '100px',
                border: '1px solid #ddd',
                padding: '0.5rem',
                backgroundColor: isCurrentMonth ? '#fff' : '#f5f5f5',
                cursor: isCurrentMonth ? 'pointer' : 'default',
                opacity: isCurrentMonth ? 1 : 0.5
              }}
            >
              <div style={{ fontWeight: 'bold' }}>
                {format(day, 'd')}
              </div>
              {isCurrentMonth && (
                <div style={{ fontSize: '0.8rem' }}>
                  {dayEvents.slice(0, 2).map(event => (
                    <div key={event.id} style={{
                      backgroundColor: '#e3f2fd',
                      margin: '0.2rem 0',
                      padding: '0.2rem',
                      borderRadius: '3px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {event.time && `${event.time} `}{event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div style={{ color: '#666' }}>
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '2rem',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '500px'
          }}>
            <h2 style={{ marginTop: 0 }}>
              Add Event for {selectedDate && format(selectedDate, 'MMMM d, yyyy')}
            </h2>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                Event Title *
              </label>
              <input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
                required
              />
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                Time
              </label>
              <input
                type="time"
                name="time"
                value={newEvent.time}
                onChange={handleInputChange}
                style={{
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                Location
              </label>
              <input
                type="text"
                name="location"
                value={newEvent.location}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                Notes
              </label>
              <textarea
                name="notes"
                value={newEvent.notes}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  minHeight: '80px'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#f5f5f5',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                disabled={!newEvent.title}
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleCalendar;