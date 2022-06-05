import { Card } from "react-bootstrap";
import styles from "./BookItem.module.css";
import format from "../../helper/format";

function BookItem({data}) {

  const { price , discount } = data
  let newPrice = price
  if (discount > 0) {
    newPrice = price - price * discount / 100
  }

  return (
    <div className={styles.bookItem}>
      <Card className={styles.card}>
        <Card.Img variant="top" src={data.imageUrl} alt="" />
        <Card.Body>
          <Card.Title className={styles.name}>{data.name} - {data.author?.name || data.author[0]?.name}</Card.Title>
        </Card.Body>
        <Card.Footer className={styles.cardFooter}>
          <span className={styles.price}>{format.formatPrice(newPrice)}</span>
          {discount > 0 && <span className={styles.oldPrice}>{format.formatPrice(data.price)}</span>}
        </Card.Footer>
      </Card>
    </div>
  );
}

export default BookItem;
