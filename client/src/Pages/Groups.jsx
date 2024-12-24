import React from 'react'
import Navbar from"../Components/Navbar"
import '../Pages/LoginSignup.css'
function Groups() {
  return (
    <div className="group-chat-container">
      {/* Reusing the Navbar component */}
      <Navbar />
      

      <div className="chat-main">
        <div className="chat-section">
          <div className="chat-message">
            <div className="message-header">
              <img src="https://via.placeholder.com/30" alt="User" className="user-avatar" />
              <span className="user-name">Sarah Chen</span>
              <span className="message-time">10:23 AM</span>
            </div>
            <p className="message-text">Hey everyone! I've created a poll for our accommodation options in Bali.</p>
            <div className="poll">
              <p>Where should we stay in Bali?</p>
              <div className="poll-option">Option 1 <span className="votes">4 votes</span></div>
              <div className="poll-option">Option 2 <span className="votes">2 votes</span></div>
              <p className="poll-status">6 of 8 people have voted</p>
            </div>
          </div>

          <div className="chat-message">
            <div className="message-header">
              <img src="https://via.placeholder.com/30" alt="User" className="user-avatar" />
              <span className="user-name">Mike Wilson</span>
              <span className="message-time">10:25 AM</span>
            </div>
            <p className="message-text">Check out this amazing villa I found!</p>
            <img
              src="https://via.placeholder.com/500x300"
              alt="Villa"
              className="shared-image"
            />
          </div>
        </div>

        <div className="expense-section">
          <div className="expense-header">
            <h3>Expense Sheet</h3>
            <button className="add-expense">Add Expense</button>
          </div>
          <div className="expense-total">
            <p>Total Expenses</p>
            <h2>$4,280.00</h2>
          </div>
          <div className="expense-item">
            <span className="expense-icon">🏠</span>
            <span>Accommodation</span>
            <span className="expense-amount">$2,500</span>
          </div>
          <div className="expense-item">
            <span className="expense-icon">✈️</span>
            <span>Transportation</span>
            <span className="expense-amount">$1,780</span>
          </div>
          <button className="view-all-expenses">View All Expenses</button>
        </div>
      </div>

      <div className="chat-input">
        <input type="text" placeholder="Type your message..." className="input-box" />
        <button className="send-button">Send</button>
      </div>
    </div>
  )
}

export default Groups