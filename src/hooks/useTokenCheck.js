import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/constants";
import axios from "axios";
function useTokenCheck() {
  const [userData, setUserData] = useState({
    IdenNumber: "",
    HN: "",
    FirstName: "",
    LastName: "",
    Email: "",
    MobileNo: "",
    Customer_Status: "",
    UID: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${BASE_URL}/api/authenCustomer`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;

        if (data.status === "ok") {
          setUserData({
            IdenNumber: data.decoded.IdenNumber,
            HN: data.decoded.HN,
            FirstName: data.decoded.FirstName,
            LastName: data.decoded.LastName,
            Email: data.decoded.Email,
            MobileNo: data.decoded.MobileNo,
            Customer_Status: data.decoded.Customer_Status,
            UID: data.decoded.UID,
          });
        } else {
          alert("Token หมดอายุ");
          localStorage.removeItem("token");
          window.location = "/presentation";
        }
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchData();
  }, []);
  return [
    userData.IdenNumber,
    userData.HN,
    userData.FirstName,
    userData.LastName,
    userData.Email,
    userData.MobileNo,
    userData.Customer_Status,
    userData.UID,
  ];
}
export default useTokenCheck;
