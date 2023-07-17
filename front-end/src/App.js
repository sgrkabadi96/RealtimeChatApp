import { Route } from "react-router-dom/cjs/react-router-dom.min";
import Chatpage from "./components/Chatpage";
import Login from "./components/Login";
import HomePage from "./components/Homepage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Route path="/" component={HomePage} exact />
      <Route path="/chats" component={Chatpage} />
      <Route path="/login" component={Login} />
    </div>
  );
}

export default App;
