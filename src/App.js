import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "./assets/css/spinner.css";
import AttendanceForm from "./components/AttendanceForm";
import GuestList from "./components/GuestList";
  

const App = () => {
  return (
    <Router>
      <Route exact path="/">
        <AttendanceForm />
      </Route>
      <Route exact path="/guest-list">
        <GuestList />
      </Route>
    </Router>
  );
}

export default App;
