import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PaginationBookStore from "../../components/PaginationBookStore";
import styles from "./GenreDetailPage.module.css";
// import Product from "../../components/Product";
import BookItem from "../../components/BookItem";
import { useParams } from "react-router-dom";
import bookApi from "../../api/bookApi";
import genreApi from "../../api/genreApi";

export default function GenreDetailPage() {
  const params = useParams();
  const { genre } = params;

  const [bookData, setBookData] = useState({});
  const [genreData, setGenreData] = useState({});
  const [orderByPrice, setOrderByPrice] = useState("");
  const [orderByDate, setOrderByDate] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await bookApi.getAll({
          genre: genreData._id,
          limit: 8,
          page: page,
          sortByPrice: orderByPrice,
          sortByDate: orderByDate,
        });
        console.log(res.data)
        setBookData({ books: res.data, totalPage: res.pagination.totalPage });
      } catch (error) {
        console.log(error);
      }
    };

    if (genreData._id) {
      fetchData();
    }
  }, [genreData, orderByPrice, orderByDate, page]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await genreApi.getBySlug(genre);
        setGenreData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (genre) {
      fetchData();
    }
  }, [genre]);

  const handleChangeOrderByPrice = (e) => {
    setOrderByPrice(e.target.value);
  };

  const handleChangeOrderByDate = (e) => {
    setOrderByDate(e.target.value);
  };

  const handleChangePage = useCallback((page) => {
    setPage(page);
  }, []);

  return (
    <div className="main">
      <Container>
        <div className={styles.genre_header}>
          <ul>
            <li>Trang chủ</li>
            <li>Sản Phẩm</li>
            <li>{genreData && genreData.name}</li>
          </ul>
          <h1>{genreData && genreData.name}</h1>
        </div>
        <div className={styles.genre_body}>
          <div className={styles.genreOrder}>
            <Row>
              <Col xl={3}>
                <div className={styles.orderItem}>
                  <label htmlFor="price-order">Giá:</label>
                  <select
                    className="form-select"
                    name="price-order"
                    value={orderByPrice}
                    onChange={handleChangeOrderByPrice}
                  >
                    <option value="">Sắp xếp theo giá</option>
                    <option value="desc">Cao đến thấp</option>
                    <option value="asc">Thấp đến cao</option>
                  </select>
                </div>
              </Col>

              <Col xl={3}>
                <div className={styles.orderItem}>
                  <label htmlFor="date-order">Sắp xếp:</label>
                  <select
                    className="form-select"
                    name="date-order"
                    value={orderByDate}
                    onChange={handleChangeOrderByDate}
                  >
                    <option value="">Sắp xếp theo ngày</option>
                    <option value="desc">Mới nhất</option>
                    {/* <option value="asc">Bán chạy nhất</option> */}
                    <option value="asc">Cũ nhất</option>
                  </select>
                </div>
              </Col>
            </Row>
          </div>
          <div className={styles.products}>
            <Row>
              {bookData.books && bookData.books.length > 0
                ? bookData.books.map((book) => (
                    <Col xl={3} key={book._id}>
                      <BookItem data={book} />
                    </Col>
                  ))
                : null}
            </Row>
          </div>
          <div className={styles.pagination}>
            <Row>
              <Col xl={12}>
                {bookData.totalPage > 1 ? (
                  <PaginationBookStore
                    totalPage={bookData.totalPage}
                    currentPage={page}
                    onChangePage={handleChangePage}
                  />
                ) : null}
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
}
