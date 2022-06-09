import React from "react";
import { Container } from 'react-bootstrap'
import DiscountItem from '../../components/DiscountItem'
import styles from './DiscountPage.module.css';

export default function DiscountPage() {
  const data = [
    {
      "id": "001",
      "price_request": 0,
      "code": "A01NH5K",
      "discount": 10,
      "quantity": 10,
      "used_quantity": 5,
    },
    {
      "id": "002",
      "price_request": 0,
      "code": "A03NH5K",
      "discount": 30,
      "quantity": 10,
      "used_quantity": 2,
    },
    {
      "id": "003",
      "price_request": 1000000,
      "code": "A04NH5K",
      "discount": 50,
      "quantity": 10,
      "used_quantity": 10,
    },
  ]
  return (
    <div className={styles.main}>
      <Container>
        {data.map(item => (
          <DiscountItem item={item}/>
        ))}
      </Container>
    </div>
  );
}