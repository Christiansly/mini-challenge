import React from "react";
import "./Home.css";

function Home() {
  return (
    <form className="student-name-form">
      <div className="student-name-input">
        <label htmlFor="student-name">Student Name:</label>
        <input type="text" name="student-name" id="student-name" />
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  );
}

export default Home;
