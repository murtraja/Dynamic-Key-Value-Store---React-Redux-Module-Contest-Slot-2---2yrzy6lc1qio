import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import KeyValueStore from "./KeyValueStore";
import "../styles/App.css";

function App() {
  return (
    <Router>
      <div id="main">
        <nav>
          <Link to="/">Reset</Link>
        </nav>
        <KeyValueStore />
      </div>
    </Router>
  );
}

export default App;
