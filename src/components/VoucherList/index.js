import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import PaginationBookStore from "../PaginationBookStore";

import { Row, Col, Card, Table, Spinner, Modal, Button } from "react-bootstrap";
import format from "../../helper/format";
import voucherApi from "../../api/voucherApi";
import styles from "./VoucherList.module.css";

function VoucherList() {
  const [voucherData, setVoucherData] = useState({});
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const [voucherDelete, setVoucherDelete] = useState({})

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await voucherApi.getAll({ page: page, limit: 10, sortByDate: "desc" });
        setLoading(false);
        setVoucherData({ vouchers: res.data, totalPage: res.pagination.totalPage });
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, [page]);

  const handleClickDeleteAuthor = (e) => {
    setVoucherDelete({
      _id: e.target.getAttribute("data-id"),
      code: e.target.getAttribute("data-code")
    })
    setShowModal(true)
  }

  const handleChangePage = useCallback((page) => {
    setPage(page);
  }, []);

  const handleCallApiDelete = async (e) => {
    try {
      await voucherApi.deleteVoucher(voucherDelete._id);
      setShowModal(false)
      alert("Xóa thành công!")
      setVoucherData((preState) => {
        const newArray = [...preState.vouchers];
        return {
          ...preState,
          vouchers: newArray.filter((item) => item._id !== voucherDelete._id)
        }
      });
    } catch (error) {
      alert("Xóa thất bại!")
      setShowModal(false)
    }
  }

  return (
    <Row>
      <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa mã giảm giá</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc mã giảm giá <b>{voucherDelete && voucherDelete.code}</b> này không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="danger" onClick={handleCallApiDelete}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
      <Col xl={12}>
        <Card>
          <Card.Header className={styles.title}>Danh sách Mã giảm giá</Card.Header>
          <Card.Body className={styles.voucherList}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã giảm giá</th>
                  <th>Yêu cầu</th>
                  <th>Giảm (%)</th>
                  <th>Số lượng</th>
                  <th>Đã dùng</th>
                  <th colSpan="2">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7}>
                      <Spinner
                        animation="border"
                        variant="success"
                      />
                    </td>
                  </tr>
                ) : voucherData.vouchers && voucherData.vouchers.length > 0 ? (
                  voucherData.vouchers.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <td>{(1 && page - 1) * 10 + (index + 1)}</td>
                        <td>{item.code}</td>
                        <td>{`Giá trị đơn hàng > ${format.formatPrice(item.price_request)}`}</td>
                        <td>{item.discount}</td>
                        <td>{item.quantity}</td>
                        <td>{item.used_quantity}</td>
                        
                        <td>
                          <Link
                            to={`/admin/voucher/update/${item._id}`}
                            className="btn btn-warning"
                            data-id={item._id}
                          >
                            Sửa
                          </Link>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            data-id={item._id}
                            data-code={item.code}
                            onClick={handleClickDeleteAuthor}
                          >
                            Xóa
                          </button>
                        </td>
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
            <div className={styles.pagination}>
            <Row>
              <Col xl={12}>
                {voucherData.totalPage > 1 ? (
                  <PaginationBookStore
                    totalPage={voucherData.totalPage}
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

export default VoucherList;
