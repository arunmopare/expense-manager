import React, { useEffect, useState } from "react";
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

const api = "http://localhost:3001";

let DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "Toiletss Paper",
    amount: 94.12,
    date: new Date("2021-11-07T00:00:00.000Z"),
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
          {isAuthenticated ? (
            <Redirect exact from="/" to="/add-new" />
          ) : (
            <Redirect exact from="/" to="/login"></Redirect>
          )}

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

  // useEffect(() => {
  //   axios
  //     .post(`http://localhost:3001/expenses`, {
  //       owner: "arunmopare",
  //     })
  //     .then((res) => {
  //       setExpenses(res);
  //       console.log(res);
  //     });
  // });

  const addExpenseHandler = async (expense) => {
    let newExp = expense;
    newExp.owner = user.sub;
    await axios
      .post(`${api}/expense`, newExp)
      .then(function (response) {
        console.log(response);
        setExpenses((prevExpenses) => {
          return [expense, ...prevExpenses];
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <Container>
        <Row>
          <Col>
            {isAuthenticated && (
              <h2 className="text-center mt-3">Hello, {user.name}</h2>
            )}
          </Col>
        </Row>
      </Container>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
}

export default App;
