import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [trigger, setTrigger] = useState(0); // 1. สร้างตัวแปร state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.log();
      }
    };

    fetchData();
  }, [url, trigger]); // 2. เพิ่ม trigger เป็น dependency

  const refetch = () => {
    setTrigger((prev) => prev + 1); // 3. เปลี่ยนค่า trigger
  };

  return { data, isLoading, refetch }; // 4. return refetch
}

export default useFetch;
