import { useEffect, useState } from "react";
import { Row, Col, Card, Table, Spinner } from "react-bootstrap";
import bookApi from "../../api/bookApi";
import format from "../../helper/format";
import styles from "./BookList.module.css";

function BookList() {
  const [bookData, setBookData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await bookApi.getAll({ page: 1, limit: 30 });
        setLoading(false);
        setBookData({ books: res.data, totalPage: res.pagination.totalPage });
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Row>
      <Col xl={12}>
        <Card>
          <Card.Header className={styles.title}>Danh sách sản phẩm</Card.Header>
          <Card.Body className={styles.bookList}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>STT</th>
                  <th className={styles.name}>Tên sách</th>
                  <th>Thể loại</th>
                  <th>Xuất bản</th>
                  <th>Giá</th>
                  <th>Khuyến mãi (%)</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6}>
                      <Spinner style={{ margin: "0 auto" }} animation="border" variant="success" />
                    </td>
                  </tr>
                ) : bookData.books && bookData.books.length > 0 ? (
                  bookData.books.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <td>{index}</td>
                        <td>
                          {item.name} - {item.author?.name}
                        </td>
                        <td>
                          {item.genre.length > 0 &&
                            item.genre.map((theloai) => (
                              <span key={theloai._id}>{theloai.name}</span>
                            ))}
                        </td>
                        <td>
                          {item.publisher?.name} - {item.year}
                        </td>
                        <td>{format.formatPrice(item.price)}</td>
                        <td>{item.discount}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6}>Không có sản phẩm nào!</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default BookList;
