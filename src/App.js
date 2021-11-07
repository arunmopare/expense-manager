import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import NavigationBar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import { useAuth0 } from "@auth0/auth0-react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];

const App = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Router>
      <NavigationBar></NavigationBar>
      <div>
        <Switch>
          {isAuthenticated && <Redirect exact from="/" to="/add-new" />}

          <Route path="/add-new">
            <Home />
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/my-profile">
            <Profile></Profile>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
function Home() {
  const { user, isAuthenticated } = useAuth0();

  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h2 className="text-center mt-3">Hello, {user.name}</h2>
          </Col>
        </Row>
      </Container>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
}

export default App;
