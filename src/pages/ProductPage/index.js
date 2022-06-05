import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PaginationBookStore from "../../components/PaginationBookStore";
// import Product from "../../components/Product";
import BookItem from "../../components/BookItem";
import bookApi from "../../api/bookApi";
import genreApi from "../../api/genreApi";

import styles from "./ProductPage.module.css";

export default function ProductPage() {
  // const allCategories = ['all', ...new Set(items.map((item) => item.category))];

  const [bookData, setBookData] = useState({})
  const [genreList, setGenreList] = useState([])
  const [orderByPrice, setOrderByPrice] = useState("")
  const [orderByDate, setOrderByDate] = useState("")
  const [page, setPage] = useState(1);

  const [genresChecked, setGenresChecked] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await bookApi.getAll({
          genre: genresChecked,
          limit: 8,
          page: page,
          sortByPrice: orderByPrice,
          sortByDate: orderByDate,
        });
        setBookData({ books: res.data, totalPage: res.pagination.totalPage });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [orderByPrice, orderByDate, page, genresChecked]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await genreApi.getAll({});
        setGenreList(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGenres();
  }, []);

  const handleChangeOrderByPrice = (e) => {
    setOrderByPrice(e.target.value);
  };

  const handleChangeOrderByDate = (e) => {
    setOrderByDate(e.target.value);
  };

  const handleChangePage = useCallback((page) => {
    setPage(page);
  }, []);

  const handleChangeGenre = (e) => {
    const id = e.target.value
    setPage(1)
    setGenresChecked(pre => {
      if (pre.includes(id)) {
        return pre.filter(genre => genre !== id)
      } else {
        return [...pre, id]
      }
    })
  } 

  return (
    <div className="main">
      <Container>
        <div className={styles.genre_header}>
          <ul>
            <li>Trang chủ</li>
            <li>Sản Phẩm</li>
          </ul>
        </div>
        <div className={styles.genre_body}>
          <Row>
            <Col xl={3}>
              <div className={styles.filterGroup}>
                <p className={styles.filterGroupTitle}>Thể loại</p>
                {genreList &&
                  genreList.length > 0 &&
                  genreList.map((genre) => (
                    <div className={styles.filterGroupItem} key={genre._id}>
                      <label>
                        <input
                          type="checkbox"
                          className={styles.chk}
                          checked={genresChecked.includes(genre._id)}
                          value={genre._id}
                          onChange={handleChangeGenre}
                        />
                        <span>{genre.name}</span>
                      </label>
                    </div>
                  ))}
              </div>
            </Col>
            <Col xl={9}>
              <div className={styles.genreOrder}>
                <Row>
                  <Col xl={4}>
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

                  <Col xl={4}>
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
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
