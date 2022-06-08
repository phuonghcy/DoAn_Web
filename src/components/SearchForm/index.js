import { memo, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import styles from "./SearchForm.module.css"

function SearchForm() {

  const navigate = useNavigate()

  const [key, setKey] = useState("")

  const handleSubmitSearch = (e) => {
    e.preventDefault()
    navigate({
      pathname: '/tim-kiem',
      search: `key=${key}`
    })
   
  }

  return (
    <form onSubmit={handleSubmitSearch}>
      <div className={styles.searchWrapper}>
        <button className={`bookstore-btn ${styles.searchBtn}`}>
          <BsSearch />
        </button>
        <div className="form-group">
          <input
            type="text"
            className={`form-control ${styles.formControl}`}
            placeholder="Tìm kiếm sản phẩm..."
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
}

export default memo(SearchForm);
