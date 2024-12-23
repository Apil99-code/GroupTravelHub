import React, { useState } from "react";
import "./LoginSignup.css";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(false); // State to toggle between login and signup

  const toggleForm = () => {
    setIsLogin(!isLogin); // Toggle the form view
  };

  return (
    <div className="background">
      <div className="form-container">
        {isLogin ? (
          <>
            <h2>Login</h2>
            <form>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter your password" />
              </div>
              <a href="#" className="lost-password">Forget password? <span>Click here!</span></a>
              <button type="button" className="btn-login">Login</button>
            </form>
            <p className="toggle-text">
              Don't have an account? <span onClick={toggleForm}>Sign Up</span>
            </p>
          </>
        ) : (
          <>
            <h2>Sign Up</h2>
            <form>
              <div className="input-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Enter your name" />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter your password" />
              </div>
              <button type="submit" className="btn-signup">Sign Up</button>
            </form>
            <p className="toggle-text">
              Already have an account? <span onClick={toggleForm}>Login</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;