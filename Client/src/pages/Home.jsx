import React, { useState } from "react"

export default function Homepage() {
    const [activeTab, setActiveTab] = useState("timer")
    const [user] = useState({
        name: "John Appleseed",
        avatar: "https://example.com/avatar.jpg"
    })

    const navItems = [
        { id: "timer", icon: "⏰", label: "Timer" },
        { id: "calendar", icon: "📅", label: "Calendar" },
        { id: "mission", icon: "🎯", label: "Mission" },
        { id: "whiteboard", icon: "📋", label: "Whiteboard" },
        { id: "chat", icon: "💬", label: "Chat" }
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
                            onClick={() => setActiveTab(item.id)}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            <span className="nav-label">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            <main className="content-area">
                <div className="user-profile">
                    <img src={user.avatar} alt="User avatar" className="user-avatar" />
                    <span className="user-name">{user.name}</span>
                </div>

                <div className="content-view">
                    {activeTab === "timer" && <div className="tab-content">Timer View</div>}
                    {activeTab === "calendar" && <div className="tab-content">Calendar View</div>}
                    {activeTab === "mission" && <div className="tab-content">Mission View</div>}
                    {activeTab === "whiteboard" && (
                        <div className="tab-content">Whiteboard View</div>
                    )}
                    {activeTab === "chat" && <div className="tab-content">Chat View</div>}
                    {activeTab === "lobby" && <div className="tab-content">Lobby Selector</div>}
                </div>
            </main>
        </div>
    )
}
