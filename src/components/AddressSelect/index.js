import { useEffect, useState, memo } from "react";
import styles from "./AddressSelect.module.css";
function AddressSelect({ onChangeAddress }) {
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);

  const [province, setProvince] = useState({ id: 30, name: "An Giang" });
  const [district, setDistrict] = useState({});
  const [ward, setWard] = useState({});
  const [address, setAddress] = useState("");

  useEffect(() => {
    onChangeAddress({ province, district, ward, address });
  }, [province, district, ward, address, onChangeAddress]);

  useEffect(() => {
    const fetchProvince = async () => {
      const result = await fetch(
        "https://raw.githubusercontent.com/ngonhan71/hanhchinhvn/master/province.json"
      );
      const data = await result.json();
      setProvinceList(data);
    };

    fetchProvince();
  }, []);

  useEffect(() => {
    const fetchDistrict = async () => {
      const result = await fetch(
        "https://raw.githubusercontent.com/ngonhan71/hanhchinhvn/master/district.json"
      );
      const data = await result.json();
      const district = data.filter(
        (item) => parseInt(item.province_id) === province.id
      );
      const defaultDistrict = district[0];
      if (defaultDistrict) {
        setDistrict({
          id: parseInt(defaultDistrict.id),
          name: `${defaultDistrict.prefix} ${defaultDistrict.name}`,
        });
        setDistrictList(district);
      }
    };

    fetchDistrict();
  }, [province]);

  useEffect(() => {
    const fetchWard = async () => {
      const result = await fetch(
        "https://raw.githubusercontent.com/ngonhan71/hanhchinhvn/master/ward.json"
      );
      const data = await result.json();
      const ward = data.filter(
        (item) =>
          parseInt(item.district_id) === district.id &&
          parseInt(item.province_id) === province.id
      );
      const defaultWard = ward[0];
      if (defaultWard) {
        setWard({
          id: parseInt(defaultWard.id),
          name: `${defaultWard.prefix} ${defaultWard.name}`,
        });
        setWardList(ward);
      }
    };
    fetchWard();
  }, [district, province]);

  const handleChangeProvince = (e) => {
    const index = e.target.selectedIndex;
    setProvince({ id: parseInt(e.target.value), name: e.target[index].text });
  };

  const handleChangeDistrict = (e) => {
    const index = e.target.selectedIndex;
    setDistrict({ id: parseInt(e.target.value), name: e.target[index].text });
  };

  const handleChangeWard = (e) => {
    const index = e.target.selectedIndex;
    setWard({ id: parseInt(e.target.value), name: e.target[index].text });
  };

  return (
    <div>
      <div className={styles.boxSelect}>
        <select
          className="form-select"
          value={province && province.id}
          onChange={handleChangeProvince}
        >
          {provinceList.length > 0 &&
            provinceList.map((province, index) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
        </select>

        <select
          className="form-select"
          value={district && district.id}
          onChange={handleChangeDistrict}
        >
          {districtList.length > 0 &&
            districtList.map((district, index) => (
              <option key={district.id} value={district.id}>
                {district.prefix} {district.name}
              </option>
            ))}
        </select>
        <select
          className="form-select"
          value={ward && ward.id}
          onChange={handleChangeWard}
        >
          {wardList.length > 0 &&
            wardList.map((ward, index) => (
              <option key={ward.id} value={ward.id}>
                {ward.prefix} {ward.name}
              </option>
            ))}
        </select>
      </div>
      <div className={`form-group ${styles.addressDetail}`}>
        <input
          required
          type="text"
          name="newAddress"
          className="form-control"
          placeholder="Địa chỉ"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
    </div>
  );
}

export default memo(AddressSelect);
