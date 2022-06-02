import React, {useState} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineShoppingCart, AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

import format from "../../helper/format";
import styles from './ProductDetailPage.module.css'

export default function DetailProduct() {
  const data= {
    bookId: "book01",
    image: "https://picsum.photos/175/120",
    name: "Đắc nhân tâm",
    author: "Dada Cambrige",
    price: 320000,
    quantity: 1,
    total_cost: 320000,
    content: "Đắc nhân tâm của Dale Carnegie là quyển sách duy nhất về thể loại self-help liên tục đứng đầu danh mục sách bán chạy nhất (best-selling Books) do báo The New York Times bình chọn suốt 10 năm liền. Được xuất bản năm 1936, với số lượng bán ra hơn 15 triệu bản, tính đến nay, sách đã được dịch ra ở hầu hết các ngôn ngữ, trong đó có cả Việt Nam, và đã nhận được sự đón tiếp nhiệt tình của đọc giả ở hầu hết các quốc gia."
  }

  const [quantity, setQuantity] = useState(1);
  const [fav, setFav]= useState(false);

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
      console.log('ok')
    }
    else {
      setQuantity('')
      e.target.value = null;
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
              <img src="https://picsum.photos/175/120" />
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
                    <button className={styles.addToCartBtn}>
                      <AiOutlineShoppingCart className={styles.addToCartIcon} />
                      Thêm vào giỏ hàng
                    </button>
                    <button className={styles.buyBtn}>Mua ngay</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </Container>
    </div>
  )
}
