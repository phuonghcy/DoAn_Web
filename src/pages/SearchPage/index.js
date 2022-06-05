import { Container, Row, Col } from "react-bootstrap";
import BookItem from "../../components/BookItem";
import bookApi from "../../api/bookApi";
import { useEffect, useState } from "react";
import styles from './SearchPage.module.css'
import { useSearchParams } from "react-router-dom";

function SearchPage() {

  const [searchParams] = useSearchParams()

  const key = searchParams.get('key')

  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await bookApi.search(key)
        console.log(res)
        setBooks(res.data)
        
      } catch (error) {
        console.log(error)
      }
    }
    if (key) {
      fetchData()
    }
  }, [key])
  
  return (
    <div className={styles.main}>
      <Container>
        <div className={styles.booksList}>
          <div className={styles.title}>
            <h2 className={styles.titleHeading}>Kết quả</h2>
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

export default SearchPage;
