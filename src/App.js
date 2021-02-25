import "./App.css";
import AttendanceForm from "./components/AttendanceForm";
import { HashRouter as Router, Route } from "react-router-dom";
  

function App() {
  return (
    <Router>
      <Route exact path="/">
        <AttendanceForm />
      </Route>
    </Router>
  );
}

export default App;
