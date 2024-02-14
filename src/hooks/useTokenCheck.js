import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/constants";

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
    const token = localStorage.getItem("token");
    fetch(BASE_URL + "/api/authenCustomer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          setUserData({
            IdenNumber: data.decoded.IdenNumber,
            HN: data.decoded.HN,
            FirstName: data.decoded.FirstName,
            LastName: data.decoded.LastName,
            Email: data.decoded.Email,
            MobileNo: data.decoded.MobileNo,
            Customer_Status: data.decoded.Customer_Status,
          });
          console.log(data);
        } else {
          console.log(data.status);
          alert("Token หมดอายุ");
          localStorage.removeItem("token");
          window.location = "/login";
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);
  return [
    userData.IdenNumber,
    userData.HN,
    userData.FirstName,
    userData.LastName,
    userData.Email,
    userData.MobileNo,
    userData.Customer_Status,
  ];
}
export default useTokenCheck;
