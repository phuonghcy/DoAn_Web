import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Table, Spinner, Modal } from "react-bootstrap";
import orderApi from "../../api/orderApi";
import PaginationBookStore from "../../components/PaginationBookStore";
import PayPal from "../../components/PayPal"
import { ToastContainer, toast } from 'react-toastify';
import format from "../../helper/format";
import styles from "./MyOrderPage.module.css";

function MyOrderPage() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderData, setOrderData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderDetail, setOrderDetail] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showModalPayPal, setShowModalPayPal] = useState(false);
  const [orderPayPal, setOrderPayPal] = useState({});


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

  const handleShowSandboxPayPal = (e) => {
    setOrderPayPal({
      total: e.target.getAttribute('data-total'),
      _id: e.target.getAttribute('data-id')
    })
    setShowModalPayPal(true)
  }

  const handleSuccess = useCallback(async () => {
    console.log(orderPayPal)
    try {
      await orderApi.updatePaymentStatusById(orderPayPal._id, { paymentStatus: true})
      toast.success("Thanh to??n th??nh c??ng!", { autoClose: 2000 });
      setShowModalPayPal(false)
      setOrderData(pre => {
        const newArray = [...pre.orders];
        return {
          ...pre,
          orders: newArray.map((item) => {
            return item._id === orderPayPal._id
              ? { ...item, isPaid: true }
              : item;
          })
        }
      })
    } catch (error) {
      console.log(error)
    }
  }, [orderPayPal])

  return (
    <div style={{ margin: "190px 0" }}>
      <Container>
      <ToastContainer />
      <Modal
          size="lg"
          show={showModalPayPal}
          onHide={() => setShowModalPayPal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Thanh to??n</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PayPal amount={(orderPayPal?.total / 23000).toFixed(2)} onSuccess={handleSuccess} />
          </Modal.Body>
        </Modal>
        <Modal
          size="lg"
          show={showModal}
          onHide={() => setShowModal(false)}
          className={styles.orderDetail}
        >
          <Modal.Header closeButton>
            <Modal.Title>H??a ????n</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {showModal && orderDetail && (
              <div>
                {(orderDetail?.method === 1 && !orderDetail?.isPaid) ? <span style={{color: 'red'}}>B???n c???n thanh to??n ????? BookStore ti???n h??nh giao h??ng!</span> : null}
                <p>
                  T???m t??nh:{" "}
                  <b>{format.formatPrice(orderDetail?.cost?.subTotal)}</b>
                </p>
                <p>
                  Gi??m gi??:{" "}
                  <b>{format.formatPrice(orderDetail?.cost?.discount)}</b>
                </p>
                <p>
                  T???ng c???ng:{" "}
                  <b>{format.formatPrice(orderDetail?.cost.total)}</b>
                </p>
                <p>
                  Tr???ng th??i: <b>{orderDetail?.status.text}</b>
                </p>
              </div>
            )}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th colSpan={2}>S???n ph???m</th>
                  <th>S??? l?????ng</th>
                  <th>Th??nh ti???n</th>
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
                    <td>Kh??ng c??</td>
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
                <th>H??? v?? t??n</th>
                <th>?????a ch???</th>
                <th>Ng??y ?????t h??ng</th>
                <th>T???ng ti???n</th>
                <th>T??nh tr???ng</th>
                <th>Ph????ng th???c</th>
                <th colSpan="2">H??nh ?????ng</th>
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
                        item.status.key === 3 ? styles.success : ""}
                        ${!item.isPaid && item.method === 1 ? styles.error : ""}
                        `}
                    >
                      <td>{(1 && page - 1) * 10 + (index + 1)}</td>
                      <td>{item.fullName}</td>
                      <td>{item.address}</td>
                      <td>{format.formatDate(item.createdAt)}</td>
                      <td>{format.formatPrice(item.cost.total)}</td>
                      <td>{item.status.text}</td>
                      <th>
                        {item?.method === 0 ? "Tr??? ti???n m???t" : "Paypal"}
                        {(item?.method === 1 && !item?.isPaid) ? 
                        <span style={{color: 'red'}}> (Ch??a thanh to??n)</span> :  null}
                        {(item?.method === 1 && item?.isPaid) ? 
                        <span className={styles.paid}> (???? thanh to??n)</span> : null}
                      </th>
                      <td>
                        <button
                          className="btn btn-primary"
                          data-id={item._id}
                          onClick={handleGetOrderDetail}
                        >
                          Xem
                        </button>
                      </td>
                      <td>
                      {(item?.method === 1 && !item?.isPaid) ? 
                        <button 
                          className="btn btn-warning" 
                          data-total={item.cost.total}
                          data-id={item._id}
                          onClick={handleShowSandboxPayPal}>
                          Thanh to??n
                        </button> : null}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6}>Kh??ng c?? ????n h??ng n??o!</td>
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
