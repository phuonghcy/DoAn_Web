import React from "react";
import styles from "./GenreDetailPage.module.css";
import Product from "../../components/Product";

export default function GenreDetailPage() {
    const genreData = [
          {
            bookId: "book01",
            image: "https://picsum.photos/175/120",
            name: "Đắc nhân tâm",
            price: 320000,
            quantity: 1,
            total_cost: 320000
          },
          {
            bookId: "book02",
            image: "https://picsum.photos/175/120",
            name: "Đắc nhân tâm 2",
            price: 320000,
            quantity: 1,
            total_cost: 320000
          },
          {
            bookId: "book03",
            image: "https://picsum.photos/175/120",
            name: "Đắc nhân tâm 3",
            price: 320000,
            quantity: 1,
            total_cost: 320000
          },
          {
            bookId: "book04",
            image: "https://picsum.photos/175/120",
            name: "Đắc nhân tâm 4",
            price: 320000,
            quantity: 1,
            total_cost: 320000
          },
          {
          bookId: "book05",
            image: "https://picsum.photos/175/120",
            name: "Đắc nhân tâm 5",
            price: 320000,
            quantity: 1,
            total_cost: 320000
          },
          {
            bookId: "book06",
            image: "https://picsum.photos/175/120",
            name: "Đắc nhân tâm 6",
            price: 320000,
            quantity: 1,
            total_cost: 320000
          },
          {
            bookId: "book07",
            image: "https://picsum.photos/175/120",
            name: "Đắc nhân tâm 7",
            price: 320000,
            quantity: 1,
            total_cost: 320000
          },
        ] 

  return (
    <div className={styles.container}>
      <br></br>
      <div className={styles.genre_header}>
        <ul>
          <li>Trang chủ</li>
          <li>Sản Phẩm</li>
          <li>Văn học</li>
        </ul>
        <h1>Văn Học</h1>
      </div>
      <div className={styles.genre_body}>
        <div className={styles.genre_select}>
          <label for="price-order">Giá:</label>
          <select name="price-order">
            <option value="desc">Cao đến thấp</option>
            <option value="asc">Thấp đến cao</option>
          </select>

          <label for="order">Sắp xếp:</label>
          <select name="order">
            <option value="1">Mới nhất</option>
            <option value="2">Bán chạy nhất</option>
          </select>
        </div>
        <div className={styles.products}>
            {
                genreData.map((item) => (
                    <Product item={item} key={item.bookId} image={item.image}/>
                ))
            }
        </div>
      </div>
    </div>
  );
}
