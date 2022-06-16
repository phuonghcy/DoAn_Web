import { useCallback, useEffect, useState } from "react";
import PaginationBookStore from "../PaginationBookStore";
import { Row, Col, Card, Table, Spinner } from "react-bootstrap";
import feedbackApi from "../../api/feedbackApi";
import format from "../../helper/format"
import styles from "./FeedbackList.module.css";

function FeedbackList() {
  const [feedbackData, setFeedbackData] = useState({});
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await feedbackApi.getAll({ page: page, limit: 10, sortByDate: "desc" });
        setLoading(false);
        setFeedbackData({ feedbacks: res.data, totalPage: res.pagination.totalPage });
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, [page]);


  const handleChangePage = useCallback((page) => {
    setPage(page);
  }, []);


  return (
    <Row>
      <Col xl={12}>
        <Card>
          <Card.Header className={styles.title}>Danh sách phản hồi</Card.Header>
          <Card.Body className={styles.authorList}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>STT</th>
                  <th className={styles.name}>Thông tin</th>
                  <th>Nội dung</th>
                  <th>Ngày</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4}>
                      <Spinner
                        animation="border"
                        variant="success"
                      />
                    </td>
                  </tr>
                ) : feedbackData.feedbacks && feedbackData.feedbacks.length > 0 ? (
                  feedbackData.feedbacks.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <td>{(1 && page - 1) * 10 + (index + 1)}</td>
                        <td>{item?.name} - {item?.email}</td>
                        <td>{item?.content}</td>
                        <td>{format.formatDate(item?.createdAt)}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4}>Không có phản hồi nào!</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <div className={styles.pagination}>
            <Row>
              <Col xl={12}>
                {feedbackData.totalPage > 1 ? (
                  <PaginationBookStore
                    totalPage={feedbackData.totalPage}
                    currentPage={page}
                    onChangePage={handleChangePage}
                  />
                ) : null}
              </Col>
            </Row>
          </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default FeedbackList;
