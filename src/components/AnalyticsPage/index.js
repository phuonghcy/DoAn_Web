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
import analyticApi from "../../api/analyticApi";
import date from "../../helper/date"
import styles from "./AnalyticsPage.module.css";
import { useEffect, useState } from "react";

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
  const [flowerBestSellerDataChart, setFlowerBestSellerDataChart] = useState({});

  const [revenueTime, setRevenueTime] = useState({value: 1, text: "Toàn thời gian"})

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

    const fetchFlowerBestSeller = async () => {
      try {
        const res = await analyticApi.getBestSeller();
        const dataChart = res.data;
        console.log(dataChart);
        setFlowerBestSellerDataChart({
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
    fetchFlowerBestSeller();
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
      <Row>
        <Col xl={8}>
          <div>
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
          {flowerBestSellerDataChart && flowerBestSellerDataChart.datasets && (
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
              data={flowerBestSellerDataChart}
            />
          )}
        </Col>
        <Col xl={8}>
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
