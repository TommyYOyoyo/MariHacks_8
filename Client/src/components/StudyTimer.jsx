import React, { useState, useEffect, useRef } from "react";

const Timer = ({
    id,
    name,
    onRemove,
    initialDuration = 1800,
    onDurationChange,
}) => {
    const [seconds, setSeconds] = useState(initialDuration);
    const [isRunning, setIsRunning] = useState(false);
    const [timerName, setTimerName] = useState(name);
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingDuration, setIsEditingDuration] = useState(false);

    const audioRef = useRef(null); // 🔔 Audio reference

    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    useEffect(() => {
        let timer = null;
        if (isRunning && seconds > 0) {
            timer = setInterval(() => {
                setSeconds((prev) => prev - 1);
            }, 1000);
        } else if (isRunning && seconds === 0) {
            setIsRunning(false);
            // 🔔 Play the ringtone!
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch((err) => {
                    console.warn("Could not play audio:", err);
                });
            }
        }
        return () => clearInterval(timer);
    }, [isRunning, seconds]);

    const handleReset = () => {
        setIsRunning(false);
        setSeconds(initialDuration);
    };

    const formatTime = () => {
        return [
            hours.toString().padStart(2, "0"),
            mins.toString().padStart(2, "0"),
            secs.toString().padStart(2, "0"),
        ].join(":");
    };

    const handleReset = () => {
        setIsRunning(false);
        setSeconds(initialDuration);
    };

    const handleNameBlur = () => {
        setIsEditingName(false);
    };

    const handleDurationBlur = () => {
        setIsEditingDuration(false);
        const newDuration = hours * 3600 + mins * 60 + secs;
        setSeconds(newDuration);
        onDurationChange(id, newDuration);
    };

    const updateTimeUnit = (unit, value) => {
        let newHours = hours;
        let newMins = mins;
        let newSecs = secs;

        switch (unit) {
            case "hours":
                newHours = Math.max(0, Math.min(99, value));
                break;
            case "minutes":
                newMins = Math.max(0, Math.min(59, value));
                break;
            case "seconds":
                newSecs = Math.max(0, Math.min(59, value));
                break;
            default:
                break;
        }

        const newDuration = newHours * 3600 + newMins * 60 + newSecs;
        setSeconds(newDuration);
    };

    return (
        <div
            style={{
                textAlign: "center",
                padding: "1.5rem",
                border: "1px solid #ddd",
                borderRadius: "10px",
                width: "280px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                {isEditingName ? (
                    <input
                        type="text"
                        value={timerName}
                        onChange={(e) => setTimerName(e.target.value)}
                        onBlur={handleNameBlur}
                        autoFocus
                        style={{
                            fontSize: "1.2rem",
                            padding: "0.3rem",
                            width: "100%",
                            textAlign: "center",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    />
                ) : (
                    <h3
                        onClick={() => setIsEditingName(true)}
                        style={{
                            margin: 0,
                            cursor: "pointer",
                            flexGrow: 1,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {timerName}
                    </h3>
                )}
                <button
                    onClick={() => onRemove(id)}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "1.2rem",
                        color: "#ff4444",
                        marginLeft: "8px",
                    }}
                >
                    ×
                </button>
            </div>

            <div style={{ margin: "1.5rem 0" }}>
                {isEditingDuration ? (
                    <div
                        style={{ display: "flex", justifyContent: "center", gap: "5px" }}
                    >
                        <input
                            type="number"
                            value={hours}
                            onChange={(e) =>
                                updateTimeUnit("hours", parseInt(e.target.value) || 0)
                            }
                            onBlur={handleDurationBlur}
                            min="0"
                            max="99"
                            style={{
                                width: "50px",
                                fontSize: "1.5rem",
                                textAlign: "center",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                            }}
                        />
                        <span style={{ fontSize: "1.5rem" }}>:</span>
                        <input
                            type="number"
                            value={mins}
                            onChange={(e) =>
                                updateTimeUnit("minutes", parseInt(e.target.value) || 0)
                            }
                            onBlur={handleDurationBlur}
                            min="0"
                            max="59"
                            style={{
                                width: "50px",
                                fontSize: "1.5rem",
                                textAlign: "center",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                            }}
                        />
                        <span style={{ fontSize: "1.5rem" }}>:</span>
                        <input
                            type="number"
                            value={secs}
                            onChange={(e) =>
                                updateTimeUnit("seconds", parseInt(e.target.value) || 0)
                            }
                            onBlur={handleDurationBlur}
                            min="0"
                            max="59"
                            style={{
                                width: "50px",
                                fontSize: "1.5rem",
                                textAlign: "center",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                            }}
                        />
                    </div>
                ) : (
                    <h1
                        onClick={() => setIsEditingDuration(true)}
                        style={{
                            fontSize: "2.5rem",
                            margin: "0.5rem 0",
                            cursor: "pointer",
                            fontFamily: "'Courier New', monospace",
                        }}
                    >
                        {formatTime()}
                    </h1>
                )}
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                <button
                    onClick={() => setIsRunning(!isRunning)}
                    style={{
                        padding: "0.5rem 1rem",
                        fontSize: "1rem",
                        backgroundColor: isRunning ? "#ff4444" : "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        minWidth: "80px",
                    }}
                >
                    {isRunning ? "Stop" : "Start"}
                </button>
                <button
                    onClick={handleReset}
                    style={{
                        padding: "0.5rem 1rem",
                        fontSize: "1rem",
                        backgroundColor: "#607d8b",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        minWidth: "80px",
                    }}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

const TimerApp = () => {
    const [timers, setTimers] = useState([]);
    const [nextId, setNextId] = useState(1);

    const addTimer = () => {
        const newTimer = {
            id: nextId,
            name: `Timer ${nextId}`,
            duration: 1800, // 30 minutes in seconds
        };
        setTimers([...timers, newTimer]);
        setNextId(nextId + 1);
    };

    const removeTimer = (id) => {
        setTimers(timers.filter((timer) => timer.id !== id));
    };

    const handleDurationChange = (id, newDuration) => {
        setTimers(
            timers.map((timer) =>
                timer.id === id ? { ...timer, duration: newDuration } : timer
            )
        );
    };

    return (
        <div
            style={{
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "2rem",
                fontFamily: "Arial, sans-serif",
                minHeight: "100vh",
            }}
        >
            {/* 🔔 Audio element */}
            <audio ref={audioRef} src="/alarm.mp3" preload="auto" />
            <h1 style={{ textAlign: "center", color: "#333", marginBottom: "2rem" }}>
                Timers
            </h1>

            <div style={{ textAlign: "center", margin: "2rem 0" }}>
                <button
                    onClick={addTimer}
                    style={{
                        padding: "0.7rem 1.5rem",
                        fontSize: "1.1rem",
                        backgroundColor: "#2196F3",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                        transition: "all 0.2s",
                    }}
                >
                    + Add Timer
                </button>
            </div>

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "1.5rem",
                    padding: "1rem",
                }}
            >
                {timers.map((timer) => (
                    <Timer
                        key={timer.id}
                        id={timer.id}
                        name={timer.name}
                        initialDuration={timer.duration}
                        onRemove={removeTimer}
                        onDurationChange={handleDurationChange}
                    />
                ))}
            </div>
        </div>
    );
};

export default TimerApp;
