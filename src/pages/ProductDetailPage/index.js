import React, {useEffect, useState} from 'react'
import { Container } from 'react-bootstrap'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineShoppingCart, AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useParams } from 'react-router-dom';
import bookApi from "../../api/bookApi";
import { addToCart } from "../../redux/actions/cart"
import { useDispatch } from "react-redux"
import format from "../../helper/format";
import styles from './ProductDetailPage.module.css'

export default function ProductDetailPage() {

  const dispatch = useDispatch()
  const params = useParams()
  const { slug } = params
  const [bookData, setBookData] = useState({})

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await bookApi.getBySlug(slug);
        setBookData(res.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchBook();
  }, [slug]);

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

  const handleAddToCart = () => {
    const { _id, name, imageUrl, slug, price, discount } = bookData
    let newPrice = price
    if (discount > 0) {
      newPrice = price - price * discount / 100
    }
    const action = addToCart({quantity, _id, name, imageUrl, slug, 
      price: newPrice, 
      totalPriceItem: newPrice * quantity})
    dispatch(action)
    alert("Thêm sản phẩm vào giỏ hàng thành công!")
  }

  return (
    <div className={styles.main}>
      <Container>
        <div className={styles.productBriefing}>
            <div className={styles.imgBriefing}>
              <img src={bookData && bookData.imageUrl} alt="" />
            </div>

            <div className={styles.infoBriefing}>
              <div>
                <h2>{bookData && bookData.name}</h2>
                <div className={styles.price}>
                  {bookData.discount > 0 ? 
                  (<p>
                    <span>{format.formatPrice(bookData.price - bookData.price * bookData.discount / 100)}</span>
                    <span className={styles.oldPrice}>{format.formatPrice(bookData.price)}</span>
                  </p>)
                  : format.formatPrice(bookData.price)}
                </div>
                <div className={`d-flex ${styles.itemBriefing}`}>
                  <div>Tác giả: &nbsp;</div>
                  <div className={styles.author}>{bookData && bookData.author?.name}</div>
                </div>

                <div className={`d-flex ${styles.itemBriefing}`}>
                  <div>Nhà xuất bản: &nbsp;</div>
                  <div className={styles.author}>
                    {bookData && bookData.publisher?.name} - {bookData && bookData.year} 
                  </div>
                </div>

                <div className={`d-flex ${styles.itemBriefing}`}>
                  <div>Số trang: &nbsp;</div>
                  <div className={styles.author}>{bookData && bookData.pages}</div>
                </div>

                <div className={`d-flex ${styles.itemBriefing}`}>
                  <div>Kích thước: &nbsp;</div>
                  <div className={styles.author}>
                    {bookData && bookData.size}
                  </div>
                </div>

                <div className={`d-flex ${styles.itemBriefing} ${styles.description}`}>
                  <div dangerouslySetInnerHTML={{__html:bookData?.description}} />
                </div>

                <div className={`d-flex ${styles.itemBriefing}`}>
                  <div className={styles.textBold}>Số lượng: </div>
                  <div className='d-flex'>
                    <button className={styles.descreaseBtn} onClick={decQuantity}>
                      <AiOutlineMinus />
                    </button>
                    <input type="text" className={styles.quantityInput} value={quantity} onChange={handleChange} />
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
                    <button className={styles.addToCartBtn} onClick={handleAddToCart}>
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
