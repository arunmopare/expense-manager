import React from "react";

import ExpenseDate from "./ExpenseDate";
import CardList from "../UI/Card";
import "./ExpenseItem.css";
import { Col, Container, Row } from "react-bootstrap";

const ExpenseItem = (props) => {
  return (
    <li>
      <CardList className="expense-item">
        <Container>
          <Row>
            <Col><ExpenseDate date={props.date} /></Col>
            <Col></Col>
            <Col></Col>
          </Row>
        </Container>
        
        <div className="">
          <h2>{props.title}</h2>
          <div style={{ color: "white" }} className="expense-item__price">
            ${props.amount}
          </div>
        </div>
      </CardList>
    </li>
  );
};

export default ExpenseItem;
