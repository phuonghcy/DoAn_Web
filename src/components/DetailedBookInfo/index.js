import React from 'react';
import styles from './DetailedBookInfo.module.css'

function DetailedBookInfo({data}) {
    return (
        <div className={styles.detail_info}>
            <h2>Thông tin chi tiết</h2>
            <div className={styles.detail_info_container}>
                {data.publisher ? <div className={styles.detail_info_item}>
                    <div>Công ty phát hành</div>
                    <div>{data.publisher}</div>
                </div> : null}
                {data.publication_date ? <div className={styles.detail_info_item}>
                    <div>Ngày xuất bản</div>
                    <div>{data.publication_date}</div>
                </div> : null}
                {data.size ? <div className={styles.detail_info_item}>
                    <div>Kích thước</div>
                    <div>{data.size}</div>
                </div> : null}
                {data.cover_type ? <div className={styles.detail_info_item}>
                    <div>Loại bìa</div>
                    <div>{data.cover_type}</div>
                </div> : null}
                {data.num_page ? <div className={styles.detail_info_item}>
                    <div>Số trang</div>
                    <div>{data.num_page}</div>
                </div> : null}
            </div>
        </div>
    );
}

export default DetailedBookInfo;