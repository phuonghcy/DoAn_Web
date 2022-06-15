import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Table, Spinner, Modal } from "react-bootstrap";
import orderApi from "../../api/orderApi";
import PaginationBookStore from "../../components/PaginationBookStore";
import format from "../../helper/format";
import styles from "./MyOrderPage.module.css";

function MyOrderPage() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderData, setOrderData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderDetail, setOrderDetail] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleChangePage = useCallback((page) => {
    setPage(page);
  }, []);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await orderApi.getAll({
          userId: currentUser.userId,
          page: page,
          limit: 10,
          sortByDate: "desc",
        });
        console.log(res.data);
        setLoading(false);
        setOrderData({ orders: res.data, totalPage: res.pagination.totalPage });
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    if (currentUser.userId) {
      fetchOrder();
    }
  }, [currentUser, page]);

  const handleGetOrderDetail = async (e) => {
    try {
      const orderId = e.target.getAttribute("data-id");
      if (!(orderDetail?._id === orderId)) {
        const res = await orderApi.getById(orderId, {userId: currentUser.userId});
        setOrderDetail(res.data);
      }
      setShowModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ margin: "190px 0" }}>
      <Container>
        <Modal
          size="lg"
          show={showModal}
          onHide={() => setShowModal(false)}
          className={styles.orderDetail}
        >
          <Modal.Header closeButton>
            <Modal.Title>Hóa đơn</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {showModal && orderDetail && (
              <div>
                <p>
                  Tạm tính:{" "}
                  <b>{format.formatPrice(orderDetail?.cost?.subTotal)}</b>
                </p>
                <p>
                  Giám giá:{" "}
                  <b>{format.formatPrice(orderDetail?.cost?.discount)}</b>
                </p>
                <p>
                  Tổng cộng:{" "}
                  <b>{format.formatPrice(orderDetail?.cost.total)}</b>
                </p>
                <p>
                  Trạng thái: <b>{orderDetail?.status.text}</b>
                </p>
              </div>
            )}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th colSpan={2}>Sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {showModal &&
                orderDetail &&
                orderDetail.products &&
                orderDetail.products.length > 0 ? (
                  orderDetail.products.map((items, index) => {
                    return (
                      <tr key={items._id}>
                        <td>{index + 1}</td>
                        <td>{items?.product.name}</td>
                        <td>
                          <img src={items?.product.imageUrl} alt="" />
                        </td>
                        <td>{items?.quantity}</td>
                        <td>{format.formatPrice(items?.totalItem)}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>Không có</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
        <div className={styles.orderWrapper}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ và tên</th>
                <th>Địa chỉ</th>
                <th>Ngày đặt hàng</th>
                <th>Tổng tiền</th>
                <th>Tình trạng</th>
                <th colSpan="2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7}>
                    <Spinner animation="border" variant="success" />
                  </td>
                </tr>
              ) : orderData.orders && orderData.orders.length > 0 ? (
                orderData.orders.map((item, index) => {
                  return (
                    <tr
                      key={item._id}
                      className={`${
                        item.status.key === 3 ? styles.success : ""
                      }`}
                    >
                      <td>{(1 && page - 1) * 10 + (index + 1)}</td>
                      <td>{item.fullName}</td>
                      <td>{item.address}</td>
                      <td>{format.formatDate(item.createdAt)}</td>
                      <td>{format.formatPrice(item.cost.total)}</td>
                      <td>{item.status.text}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          data-id={item._id}
                          onClick={handleGetOrderDetail}
                        >
                          Xem
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6}>Không có đơn hàng nào!</td>
                </tr>
              )}
            </tbody>
          </Table>
          <div className={styles.pagination}>
            <Row>
              <Col xl={12}>
                {orderData.totalPage > 1 ? (
                  <PaginationBookStore
                    totalPage={orderData.totalPage}
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

export default MyOrderPage;
