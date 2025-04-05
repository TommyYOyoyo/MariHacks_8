import React, { useState } from "react"
import { Outlet, Link, useNavigate } from "react-router-dom"

export default function Homepage() {
    const [activeTab, setActiveTab] = useState("timer")
    const [user] = useState({
        name: "John Appleseed",
        avatar: "https://example.com/avatar.jpg"
    })

    const navigate = useNavigate()

    const navItems = [
        { id: "timer", icon: "⏰", label: "Timer" },
        { id: "calendar", icon: "📅", label: "Calendar" },
        { id: "mission", icon: "🎯", label: "Mission" },
        { id: "whiteboard", icon: "📋", label: "Whiteboard" },
    ]

    return (
        <div className="ios-container">
            <aside className="ios-sidebar">
                <div className="sidebar-header">
                    <h1 className="app-title">COLLABILITY</h1>
                </div>

                <nav className="navigation-menu">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            className={`nav-item ${activeTab === item.id ? "active" : ""}`}
                            onClick={() => {
                                navigate(`${item.id}`)
                            }}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            <span className="nav-label">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            <div className="content-area">
                <header className="header">
                    <span className="subtitle">
                        {(() => {
                            switch (activeTab) {
                                case "timer":
                                    return "Timer View"
                                case "calendar":
                                    return "Calendar View"
                                case "mission":
                                    return "Mission View"
                                case "whiteboard":
                                    return "Whiteboard View"
                                case "chat":
                                    return "Chat View"
                                case "lobby":
                                    return "Lobby Selector"
                            }
                        })()}
                    </span>

                    <span className="user-profile">
                        <img src={user.avatar} alt="User avatar" className="user-avatar" />
                        <span className="user-name">{user.name}</span>
                    </span>
                </header>

                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
