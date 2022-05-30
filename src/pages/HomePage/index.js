import { Container, Row, Col } from "react-bootstrap";
import BookItem from "../../components/BookItem";
import bookApi from "../../api/bookApi";
import { useEffect, useState } from "react";

function HomePage() {

  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await bookApi.getAll({limit: 8})
        console.log(res)
        setBooks(res.data)
        
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="main">
      <Container>
        <div className="sanphamnoibat">
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
