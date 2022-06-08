import { Container, Row, Col} from "react-bootstrap";
import BookItem from "../../components/BookItem";
import bookApi from "../../api/bookApi";
import { useEffect, useState } from "react";
import styles from './HomePage.module.css'
import Carousels from "../../components/Carousels";

function HomePage() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await bookApi.getAll({page: 1, limit: 8})
        console.log(res)
        setBooks(res.data)
        
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])
  

  return (
    <div className={styles.main}>
      <Container>
        <Carousels />
        <div className={styles.booksList}>
          <div className={styles.title}>
            <h2 className={styles.titleHeading}>Sản phẩm nổi bật</h2>
          </div>
          <Row>
            {books && books.length > 0 ? (
               books.map(book => 
                <Col xl={3} key={book._id}>
                  <BookItem data={book} />
                </Col>)
            ) : null}
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default HomePage;
