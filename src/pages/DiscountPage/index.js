import { useEffect, useState } from "react";
import { Container } from 'react-bootstrap'
import DiscountItem from '../../components/DiscountItem'
import voucherApi from "../../api/voucherApi";

import styles from './DiscountPage.module.css';

export default function DiscountPage() {
  const [voucherData, setVoucherData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await voucherApi.getAll({ limit: 20, sortByDate: "desc" });
        setVoucherData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.main}>
      <Container>
        {voucherData && voucherData.length > 0 && voucherData.map(item => (
          <DiscountItem key={item._id} item={item}/>
        ))}
      </Container>
    </div>
  );
}