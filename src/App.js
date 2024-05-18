import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import Login from "./components/login";
import ExercisesList from "./components/exercises-list.component";
import UpdateCase from "./components/edit-exercises.component";
import CreateUser from "./components/create-user.component";
import CreateCase from "./components/createCase";
import PastCase from "./components/pastcaselist";
import PendingCase from "./components/pendingcase";
import UpcomingCase from "./components/upcomingcaselist";
import ViewCase from "./pages/viewcase/ViewCase";
import SearchPage from "./pages/searchPage";

function App() {
  return (
    <Router>
      <div
        className="body-container"
        style={{ minHeight: "100vh", background: "rgb(184, 204, 189)" }}
      >
        <Navbar />
        <Route path="/" exact component={Login} />
        <Route path="/viewcase/:id" exact component={ViewCase} />
        <Route path="/caseList" exact component={ExercisesList} />
        <Route path="/update/:id" component={UpdateCase} />
        <Route path="/create" component={CreateCase} />
        <Route path="/RegisterUser" component={CreateUser} />
        <Route path="/pastCase" component={PastCase} />
        <Route path="/pendingCase" component={PendingCase} />
        <Route path="/upcomingCase" component={UpcomingCase} />
        <Route path="/searchcase" component={SearchPage} />
      </div>
    </Router>
  );
}

export default App;
