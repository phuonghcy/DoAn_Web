import { Row, Col, Card, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';

import * as Yup from "yup";
import styles from "./FormAddBook.module.css";
import { useEffect, useState } from "react";
import authorApi from "../../api/authorApi";
import genreApi from "../../api/genreApi";
import publisherApi from "../../api/publisherApi";
import bookApi from "../../api/bookApi";

function FormAddBook() {

  const navigate = useNavigate()

  const [authorList, setAuthorList] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [publisherList, setPublisherList] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await authorApi.getAll({ limit: 20 });
        setAuthorList(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAuthors();
  }, []);

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const res = await publisherApi.getAll({});
        setPublisherList(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPublishers();
  }, []);

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

  const formik = useFormik({
    initialValues: {
      bookId: "",
      name: "",
      year: "",
      pages: "",
      size: "",
      price: "",
      discount: "",
      author: authorList[0]
        ? { _id: authorList[0]._id, name: authorList[0].name }
        : {},
      genre: genreList[0]
        ? { _id: genreList[0]._id, name: genreList[0].name }
        : {},
      publisher: publisherList[0]
        ? { _id: publisherList[0]._id, name: publisherList[0].name }
        : {},
    },
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object({
      bookId: Yup.string().required("Không được bỏ trống trường này!")
      .test("is-use", "Mã sách đã tồn tại!", async function (value) {
        const res = await bookApi.getByBookId(value)
        return res.data._id ? false : true
      }),
      name: Yup.string().required("Không được bỏ trống trường này!"),
      price: Yup.number()
        .typeError("Vui lòng nhập giá hợp lệ!")
        .required("Không được bỏ trống trường này!"),
    }),
    onSubmit: async () => {
      console.log("kiem tra", formik.values);
      const { bookId, name, author, genre, publisher, year, pages, size, price, discount } = formik.values
      try {
        const res = await bookApi.createBook({
          bookId, name, year, pages, size, price, discount,
          author: author._id,
          genre: genre._id,
          publisher: publisher._id,

        })
        console.log(res)
        navigate({ pathname: '/admin/book' })
      } catch (error) {
        console.log(error)
      }
    },
  });

  const handleChangeAuthor = (e) => {
    const index = e.target.selectedIndex;
    formik.setFieldValue("author", {
      _id: e.target.value,
      name: e.target[index].text,
    });
  };

  const handleChangeGenre = (e) => {
    const index = e.target.selectedIndex;
    formik.setFieldValue("genre", {
      _id: e.target.value,
      name: e.target[index].text,
    });
  };

  const handleChangePublisher = (e) => {
    const index = e.target.selectedIndex;
    formik.setFieldValue("publisher", {
      _id: e.target.value,
      name: e.target[index].text,
    });
  };


  return (
    <Row className={styles.addWrapper}>
      <Col xl={12}>
        <Card>
          <Card.Header className={styles.title}>Thêm sách mới</Card.Header>
          <Card.Body>
            <form onSubmit={formik.handleSubmit}>
              <Row>
                <Col xl={3}>
                  <div className={`form-group ${styles.formGroup}`}>
                    <label className={styles.formLabel}>Mã sách</label>
                    <input
                      type="text"
                      name="bookId"
                      className={`form-control ${
                        formik.errors.bookId
                          ? "is-invalid"
                          : formik.values.bookId && "is-valid"
                      }`}
                      placeholder="Mã sách"
                      value={formik.values.bookId}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.bookId && (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.bookId}
                      </Form.Control.Feedback>
                    )}
                  </div>
                </Col>
                <Col xl={9}>
                  <div className={`form-group ${styles.formGroup}`}>
                    <label className={styles.formLabel}>Tên sách</label>
                    <input
                      type="text"
                      name="name"
                      className={`form-control ${
                        formik.errors.name
                          ? "is-invalid"
                          : formik.values.name && "is-valid"
                      }`}
                      placeholder="Tên sách"
                      value={formik.values.name}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.name && (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.name}
                      </Form.Control.Feedback>
                    )}
                  </div>
                </Col>
              </Row>

              <Row>
                <Col xl={4}>
                  <div className={`form-group ${styles.formGroup}`}>
                    <label className={styles.formLabel}>Tác giả</label>
                    <select
                      className="form-select"
                      name="author"
                      value={formik.values.author._id}
                      onBlur={formik.handleBlur}
                      onChange={handleChangeAuthor}
                    >
                      {authorList.length > 0 &&
                        authorList.map((author) => (
                          <option key={author._id} value={author._id}>
                            {author.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </Col>
                <Col xl={4}>
                  <div className={`form-group ${styles.formGroup}`}>
                    <label className={styles.formLabel}>Thể loại</label>
                    <select
                      className="form-select"
                      name="author"
                      value={formik.values.genre._id}
                      onBlur={formik.handleBlur}
                      onChange={handleChangeGenre}
                    >
                      {genreList.length > 0 &&
                        genreList.map((genre) => (
                          <option key={genre._id} value={genre._id}>
                            {genre.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </Col>
                <Col xl={4}>
                  <div className={`form-group ${styles.formGroup}`}>
                    <label className={styles.formLabel}>Nhà xuất bản</label>
                    <select
                      className="form-select"
                      name="author"
                      value={formik.values.publisher._id}
                      onBlur={formik.handleBlur}
                      onChange={handleChangePublisher}
                    >
                      {publisherList.length > 0 &&
                        publisherList.map((publisher) => (
                          <option key={publisher._id} value={publisher._id}>
                            {publisher.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xl={3}>
                  <div className={`form-group ${styles.formGroup}`}>
                    <label className={styles.formLabel}>Năm xuất bản</label>
                    <input
                      type="text"
                      name="year"
                      className={`form-control ${
                        formik.errors.year
                          ? "is-invalid"
                          : formik.values.year && "is-valid"
                      }`}
                      placeholder="Năm xuất bản"
                      value={formik.values.year}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.year && (
                      <Form.Control.Feedback
                        type="invalid"
                        className={styles.feedback}
                      >
                        {formik.errors.year}
                      </Form.Control.Feedback>
                    )}
                  </div>
                </Col>
                <Col xl={3}>
                  <div className={`form-group ${styles.formGroup}`}>
                    <label className={styles.formLabel}>Số trang</label>
                    <input
                      type="text"
                      name="pages"
                      className={`form-control ${
                        formik.errors.pages
                          ? "is-invalid"
                          : formik.values.pages && "is-valid"
                      }`}
                      placeholder="Số trang"
                      value={formik.values.pages}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.pages && (
                      <Form.Control.Feedback
                        type="invalid"
                        className={styles.feedback}
                      >
                        {formik.errors.pages}
                      </Form.Control.Feedback>
                    )}
                  </div>
                </Col>
                <Col xl={3}>
                  <div className={`form-group ${styles.formGroup}`}>
                    <label className={styles.formLabel}>Kích thước</label>
                    <input
                      type="text"
                      name="size"
                      className={`form-control ${
                        formik.errors.size
                          ? "is-invalid"
                          : formik.values.size && "is-valid"
                      }`}
                      placeholder="Kích thước"
                      value={formik.values.size}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.size && (
                      <Form.Control.Feedback
                        type="invalid"
                        className={styles.feedback}
                      >
                        {formik.errors.size}
                      </Form.Control.Feedback>
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xl={3}>
                  <div className={`form-group ${styles.formGroup}`}>
                    <label className={styles.formLabel}>Giá bán</label>
                    <input
                      type="text"
                      name="price"
                      className={`form-control ${
                        formik.errors.price
                          ? "is-invalid"
                          : formik.values.price && "is-valid"
                      }`}
                      placeholder="Giá bán"
                      value={formik.values.price}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.price && (
                      <Form.Control.Feedback
                        type="invalid"
                        className={styles.feedback}
                      >
                        {formik.errors.price}
                      </Form.Control.Feedback>
                    )}
                  </div>
                </Col>
                <Col xl={3}>
                  <div className={`form-group ${styles.formGroup}`}>
                    <label className={styles.formLabel}>Giảm giá</label>
                    <input
                      type="text"
                      name="discount"
                      className={`form-control ${
                        formik.errors.discount
                          ? "is-invalid"
                          : formik.values.discount && "is-valid"
                      }`}
                      placeholder="Giảm giá"
                      value={formik.values.discount}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.discount && (
                      <Form.Control.Feedback
                        type="invalid"
                        className={styles.feedback}
                      >
                        {formik.errors.discount}
                      </Form.Control.Feedback>
                    )}
                  </div>
                </Col>
              </Row>
              <button
                type="submit"
                className={`bookstore-btn ${styles.submitBtn}`}
              >
                Cập nhật
              </button>
            </form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default FormAddBook;
