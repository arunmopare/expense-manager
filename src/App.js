import React, { useState, useEffect } from "react";
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
import axios from "axios";

const baseApiUrl = "http://localhost:3001";

var DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date("2021-12-16T00:00:00.000Z"),
  },
  { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date("2021, 2, 28"),
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
  const [filterYear, setFilterYear] = useState("");
  const [expenses, setExpenses] = useState([]);
  const { user, isAuthenticated } = useAuth0();
  console.log("User", user);
  React.useEffect(() => {
    if (user !== undefined) {
      console.log("Getting Expenses");
      axios
        .post(`${baseApiUrl}/expenses`, { owner: user.email })
        .then((response) => {
          const ex = response.data;
          ex.map((e) => {
            e.date = new Date(e.date);
          });
          setExpenses(ex);
        });
    }
  }, [expenses]);

  const addExpenseHandler = (expense) => {
    if (user !== undefined) {
      const userName = user.email;
      expense.owner = userName;
      axios
        .post(`${baseApiUrl}/expense`, expense)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      setExpenses((prevExpenses) => {
        return [expense, ...prevExpenses];
      });
    }
  };
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h2 className="text-center mt-3">
              Hello, {user === undefined ? "" : user.name}!
            </h2>
          </Col>
        </Row>
      </Container>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
}

export default App;
