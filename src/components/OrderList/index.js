import { useCallback, useEffect, useState } from "react";
import PaginationBookStore from "../PaginationBookStore";
import { Row, Col, Card, Table, Spinner, Modal } from "react-bootstrap";
import orderApi from "../../api/orderApi";
import format from "../../helper/format";
import date from "../../helper/date";
import styles from "./OrderList.module.css";

function OrderList() {
  const [orderData, setOrderData] = useState({});
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const [orderDetail, setOrderDetail] = useState({});

  const [status, setStatus] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await orderApi.getAll({ 
          page: page, 
          limit: 10, 
          sortByDate: "desc" });
        setLoading(false);
        setOrderData({ orders: res.data, totalPage: res.pagination.totalPage });
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

  const handleGetOrderDetail = async (e) => {
    try {
      const orderId = e.target.getAttribute("data-id");
      if (!(orderDetail._id === orderId)) {
        const res = await orderApi.getById(orderId, {});
        setOrderDetail(res.data);
      }
      setShowModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateOrder = async (e) => {
    try {
      const orderId = e.target.getAttribute("data-id");
      if (!(orderDetail._id === orderId)) {
        const res = await orderApi.getById(orderId, {});
        setOrderDetail(res.data);
        setStatus({
          key: res.data.status.key,
          text: res.data.status.text
        });
      }
      setShowModalUpdate(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeStatus = (e) => {
    const index = e.target.selectedIndex;
    setStatus({
      key: parseInt(e.target.value),
      text: e.target[index].text
    });
  }

  const handleCallApiChangeStatus = async () => {
    console.log(status)
    console.log(orderDetail._id)
    try {
      await orderApi.updateStatusById(orderDetail._id, status)
      setOrderDetail(pre => {
        return {
          ...pre,
          status: status
        }
      }) 
      setOrderData(pre => {
        const newArray = [...pre.orders];
        return {
          ...pre,
          orders: newArray.map((item) => {
            return item._id === orderDetail._id
              ? { ...item, status: status }
              : item;
          })
        }
      })
      alert("C???p nh???t th??nh c??ng!")
    } catch (error) {
      alert("C???p nh???t th???t b???i!")
      console.log(error)
    }
  }

  return (
    <Row>
      <Modal
        size="lg"
        show={showModalUpdate}
        onHide={() => setShowModalUpdate(false)}
        className={styles.orderDetail}
      >
        <Modal.Header closeButton>
          <Modal.Title>H??a ????n</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showModalUpdate && orderDetail && orderDetail.status.text && (
            <div>
              <p>Tr???ng th??i: <b>{orderDetail.status.text}</b></p>
              <label>Thay ?????i tr???ng th??i:</label>
              <select 
                className="form-select" 
                value={status?.key ? status?.key : orderDetail.status.key} 
                onChange={handleChangeStatus}>
                <option value="0">??ang ch??? x??? l??</option>
                <option value="1">???? ????ng g??i ????n h??ng</option>
                <option value="2">??ang v???n chuy???n</option>
                <option value="3">???? giao h??ng</option>
              </select>
            </div>
          )}
          <button type="button" className="btn btn-success mt-2" onClick={handleCallApiChangeStatus}>
            L??u
          </button>
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
              <div className={styles.boxOrderDetail}>
                <p>Email:{" "}<b>{orderDetail?.email}</b></p>
                <p>S??T:{" "}<b>{orderDetail?.phoneNumber}</b></p>
              </div>
              <div>
                <p>Ph????ng th???c thanh to??n: <b>{orderDetail?.method === 0 ? "Tr??? ti???n m???t khi nh???n h??ng" : "Paypal"}</b></p>
                {(orderDetail?.method === 1 && !orderDetail?.isPaid) ? <button className="btn btn-danger">Ch??a thanh to??n</button> : null}
                {(orderDetail?.method === 1 && orderDetail?.isPaid) ? <button className="btn btn-success">???? thanh to??n</button> : null}
              </div>
              <div>
                <p>T???m t??nh:{" "}<b>{format.formatPrice(orderDetail?.cost?.subTotal)}</b></p>
                <p>Gi??m gi??:{" "}<b>{format.formatPrice(orderDetail?.cost?.discount)}</b></p>
                <p>T???ng c???ng: <b>{format.formatPrice(orderDetail?.cost.total)}</b></p>
                <p>Tr???ng th??i: <b>{orderDetail?.status.text}</b></p>
              </div>
            </div>
          )}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>M?? s???n ph???m</th>
                <th colSpan={2}>S???n ph???m</th>
                <th>S??? l?????ng</th>
                <th>Gi??</th>
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
                      <td>{items?.product._id}</td>
                      <td>{items?.product.name}</td>
                      <td>
                        <img src={items?.product.imageUrl} alt="" />
                      </td>
                      <td>{items?.quantity}</td>
                      <td>{format.formatPrice(items?.price)}</td>
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
      <Col xl={12}>
        <Card>
          <Card.Header className={styles.title}>Danh s??ch ????n h??ng</Card.Header>
          <Card.Body className={styles.orderList}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>H??? v?? t??n</th>
                  <th>?????a ch???</th>
                  <th>Ng??y ?????t h??ng</th>
                  <th>T???ng ti???n</th>
                  <th>T??nh tr???ng</th>
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
                      <tr key={item._id} 
                          className={`${item.status.key === 3 ? styles.success : ''} ${!item.isPaid && item.method === 1 ? styles.error : ""}`}
                          >
                        <td>{(1 && page - 1) * 10 + (index + 1)}</td>
                        <td>{item.fullName}</td>
                        <td>{item.address}</td>
                        <td>
                          {format.formatDate(item.createdAt)}
                          {date.isToday(item.createdAt) && (
                             <button className="btn btn-danger">H??m nay</button>
                          )}
                        </td>
                        <td>{format.formatPrice(item.cost.total)}</td>
                        <td>{item.status.text}</td>
                        <td>
                          <button
                            className="btn btn-success"
                            data-id={item._id}
                            onClick={handleUpdateOrder}
                            disabled={item?.method === 1 && !item?.isPaid}
                          >
                            S???a
                          </button>
                        </td>
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
                    <td colSpan={6}>Kh??ng c?? s???n ph???m n??o!</td>
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
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default OrderList;
