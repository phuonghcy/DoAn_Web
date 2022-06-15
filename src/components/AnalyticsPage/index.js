import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import { Row, Col } from "react-bootstrap";
import bookApi from "../../api/bookApi";
import orderApi from "../../api/orderApi";
import analyticApi from "../../api/analyticApi";
import date from "../../helper/date"
import styles from "./AnalyticsPage.module.css";
import { useEffect, useState } from "react";
import DashboardCard from "../DashboardCard";
import { FaBook, FaChartBar, FaShoppingBag } from "react-icons/fa"

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function AnalyticsPage() {

  const [revenueLifeTimeDataChart, setRevenueLifeTimeDataChart] = useState({});
  const [countOrderLifeTimeDataChart, setCountOrderLifeTimeDataChart] = useState({});
  const [bookBestSellerDataChart, setBookBestSellerDataChart] = useState({});

  const [revenueTime, setRevenueTime] = useState({value: 1, text: "Toàn thời gian"})

  const [cardData, setCardData] = useState({})

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const resBook = await bookApi.getAll({})
        const resOrder = await orderApi.getAll({})
        const resRevenue = await analyticApi.getTotalRevenue()
        setCardData(pre => {
          return {
            ...pre, 
            book: resBook.count,
            order: resOrder.count,
            revenue: resRevenue.data[0].revenue
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchCardData()
  }, [])

  useEffect(() => {
    const fetchRevenueLifeTime = async () => {
      try {
        let dataChart = []
        switch (revenueTime.value) {
          case 1: {
            const res = await analyticApi.getRevenueLifeTime();
            dataChart = res.data;
            break;
          }

          case 2: {
            const now = new Date()
            const res = await analyticApi.getRevenueWeek({
              start: date.getMonday(now), 
              end: date.getSunday(now) 
            });
            console.log(res)
            dataChart = res.data;
            break;
          }

          case 3: {
            const now = new Date()
            now.setDate(now.getDate() - 7)
            const res = await analyticApi.getRevenueWeek({
              start: date.getMonday(now), 
              end: date.getSunday(now) 
            });
            console.log(res)
            dataChart = res.data;
            break;
          }
          
          default: {
            const res = await analyticApi.getRevenueLifeTime();
            dataChart = res.data;
            break;
          }
        }
        setRevenueLifeTimeDataChart({
          labels: dataChart.map((item) => item._id),
          datasets: [
            {
              label: "Doanh thu",
              data: dataChart.map((item) => item.revenue),
              fill: true,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.3)",
            },
          ],
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchRevenueLifeTime();

  }, [revenueTime])

  useEffect(() => {
    const fetchCountOrderLifeTime = async () => {
      try {
        const res = await analyticApi.getCountOrderLifeTime();
        const dataChart = res.data;
        setCountOrderLifeTimeDataChart({
          labels: dataChart.map((item) => item._id),
          datasets: [
            {
              label: "Số lượng đơn hàng",
              data: dataChart.map((item) => item.total),
              fill: true,
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgba(75, 192, 192, 0.3)",
            },
          ],
        });
      } catch (error) {
        console.log(error);
      }
    };

    const fetchBookBestSeller = async () => {
      try {
        const res = await analyticApi.getBestSeller();
        const dataChart = res.data;
        console.log(dataChart);
        setBookBestSellerDataChart({
          labels: dataChart.map((item) => item.product[0].name),
          datasets: [
            {
              label: "Sản phẩm bán chạy",
              data: dataChart.map((item) => item.count),
              backgroundColor: ["#ff6384", "#e8c3b9", "#ffce56", "#8e5ea2"],
            },
          ],
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchCountOrderLifeTime();
    fetchBookBestSeller();
  }, []);

  const handleChangeRevenueTime = (e) => {
    const index = e.target.selectedIndex;
    setRevenueTime({
      value: parseInt(e.target.value),
      text: e.target[index].text,
    })
  }

  return (
    <div className={styles.wrapperDashboard}>
      <Row className="mb-4">
        <Col xl={3}>
            <DashboardCard 
              name="Sản phẩm" 
              quantity={cardData && cardData.book} 
              bgColor="bg-success" 
              Icon={FaBook} />
        </Col>
        <Col xl={3}>
          <DashboardCard 
            name="Đơn hàng" 
            quantity={cardData && cardData.order} 
            bgColor="bg-info" 
            Icon={FaShoppingBag} />
        </Col>
        <Col xl={3}>
          <DashboardCard 
            name="Doanh thu (triệu)" 
            quantity={cardData && ((cardData.revenue / 1000000).toFixed(2))} 
            bgColor="bg-danger" 
            Icon={FaChartBar} />
        </Col>
      </Row>
      <Row>
        <Col xl={8}>
          <div>
            <h2>DOANH THU</h2>
            <select 
              className={`form-select ${styles.revenueSelectTime}`} 
              value={revenueTime && revenueTime.value}
              onChange={handleChangeRevenueTime}
            >
              <option value="1">Toàn thời gian</option>
              <option value="2">Tuần này</option>
              <option value="3">Tuần trước</option>
            </select>
          </div>
          {revenueLifeTimeDataChart && revenueLifeTimeDataChart.datasets && (
            <Line
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: `Doanh thu ${revenueTime && revenueTime.text}`,
                  },
                },
              }}
              data={revenueLifeTimeDataChart}
            />
          )}
        </Col>
        <Col xl={4}>
          <h2>SÁCH BÁN CHẠY</h2>
          {bookBestSellerDataChart && bookBestSellerDataChart.datasets && (
            <Pie
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                    align: "start",
                  },
                  title: {
                    display: true,
                    text: "Sản phẩm bán chạy",
                  },
                },
              }}
              data={bookBestSellerDataChart}
            />
          )}
        </Col>
        <Col xl={8}>
          <h2>SỐ LƯỢNG ĐƠN HÀNG</h2>
          {countOrderLifeTimeDataChart && countOrderLifeTimeDataChart.datasets && (
            <Line
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Đơn hàng toàn thời gian",
                  },
                },
              }}
              data={countOrderLifeTimeDataChart}
            />
          )}
        </Col>
      </Row>
    </div>
  );
}

export default AnalyticsPage;
