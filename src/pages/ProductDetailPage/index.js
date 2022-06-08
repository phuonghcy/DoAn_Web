import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineShoppingCart, AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import { Image } from 'antd';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';

import DetailedBookInfo from '../../components/DetailedBookInfo'
import format from "../../helper/format";
import styles from './ProductDetailPage.module.css'


export default function DetailProduct() {
  const data= {
    bookId: "book01",
    image: "https://picsum.photos/175/120",
    name: "Đắc nhân tâm",
    author: "Dada Cambrige",
    publisher: "NXB Tuổi Trẻ",
    publication_date: "1/1/2022",
    size: "14 x 20 cm",
    cover_type: "Bìa mềm",
    num_page: 320,
    price: 320000,
    content: "Đắc nhân tâm của Dale Carnegie là quyển sách duy nhất về thể loại self-help liên tục đứng đầu danh mục sách bán chạy nhất (best-selling Books) do báo The New York Times bình chọn suốt 10 năm liền. Được xuất bản năm 1936, với số lượng bán ra hơn 15 triệu bản, tính đến nay, sách đã được dịch ra ở hầu hết các ngôn ngữ, trong đó có cả Việt Nam, và đã nhận được sự đón tiếp nhiệt tình của đọc giả ở hầu hết các quốc gia."
  }

  const [quantity, setQuantity] = useState(1);
  const [fav, setFav]= useState(false);

  const notify = () => (
    toast.success('Sách đã được thêm vào giỏ hàng')
  )

  const decQuantity = () => {
    if(quantity > 0) {
      setQuantity(quantity - 1)
    }
  }

  const incQuantity = () => {
    setQuantity(parseInt(quantity + 1))
  }

  const handleChange = (e) => {
    console.log(e.target.value);
    // /^[0-9]+$/.test(newQuantity)
    //sai khi them chu
    const newQuantity = parseInt(e.target.value)
    if(newQuantity){
      setQuantity(newQuantity)
    }
    else {
      setQuantity('')
    }
  }

  const handleFav = () => {
    setFav(!fav)
  }

  return (
    <div className={styles.main}>
      <Container>
        <div className={styles.productBriefing}>
            <div className={styles.imgBriefing}>
              <Image 
                width={"100%"}
                src={data.image}
              />
            </div>

            <div className={styles.infoBriefing}>
              <div>
                <h2>{data.name}</h2>
                <p className={styles.price}>{format.formatPrice(data.price)}</p>
                <div className={`d-flex ${styles.itemBriefing}`}>
                  <div>Tác giả: &nbsp;</div>
                  <div className={styles.author}>{data.author}</div>
                </div>

                <div className={`d-flex ${styles.itemBriefing}`}>
                  <div>{data.content}</div>
                </div>

                <div className={`d-flex ${styles.itemBriefing}`}>
                  <div className={styles.textBold}>Số lượng: </div>
                  <div className='d-flex'>
                    <button className={styles.descreaseBtn} onClick={decQuantity}>
                      <AiOutlineMinus />
                    </button>
                    <input type="text" className={styles.quantityInput} value={quantity} onChange={handleChange}></input>
                    <button className={styles.increaseBtn} onClick={incQuantity}>
                      <AiOutlinePlus />
                    </button>
                  </div>
                </div>

                <div className={styles.actions}>
                  <button className={styles.fav_btn} onClick={handleFav}>
                    {fav ? <AiFillHeart className={styles.fav_icon} /> : <AiOutlineHeart className={styles.fav_icon}/> }
                    Yêu thích
                  </button>

                  <div className={styles.actions_bottom}>
                    <button className={styles.addToCartBtn} onClick={notify}>
                      <AiOutlineShoppingCart className={styles.addToCartIcon} />
                      Thêm vào giỏ hàng
                    </button>
                    <Link to="/gio-hang" className={styles.buyBtn}>Mua ngay</Link>
                    <ToastContainer />
                  </div>
                </div>
              </div>
            </div>
        </div>

        <DetailedBookInfo data={data} />
      </Container>
    </div>
  )
}
