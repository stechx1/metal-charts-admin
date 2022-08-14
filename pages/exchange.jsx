import { MainLayout } from "../components/layout";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Exchange() {
  const [usdRate, setUsdRate] = useState({
    price: 0,
    date: 0,
  });
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/api/commodity/usd");
      if (response.status === 200) {
        setUsdRate({
          price: response.data.price,
          date: response.data.updated_at,
        });
      }
    }
    fetchData();
  }, []);

  const updateUsdRate = async () => {
    const response = await axios.post("/api/commodity/usd", {
      price: usdRate.price,
    });
    if (response.status === 200) {
      //   console.log(response);
      setUsdRate({
        price: response.data.price,
        date: response.data.updated_at,
      });
    }
  };

  return (
    <div className="w-full h-screen overflow-y-scroll py-6 px-4">
      <h1 className="text-3xl font-bold border-b border-[#131722] pb-6">
        Exchange Price Management
      </h1>

      <div className="flex flex-col mt-4">
        <div className="bg-gray-800 p-1 mr-1 text-white border border-gray-300 flex justify-between flex-row items-center rounded-md overflow-hidden">
          <h3 className="text-lg font-semibold  text-center">USD to NGN</h3>
          <input
            className="p-2 text-center outline-none w-1/3 border text-gray-800 rounded-md "
            type="text"
            value={usdRate.price}
            onChange={(e) => {
              setUsdRate((prev) => {
                return { ...prev, price: e.target.value };
              });
            }}
          />
          <span>
            <b>Updated at</b>: {new Date(usdRate.date).toDateString()}
          </span>
          <button
            onClick={updateUsdRate}
            className="text-green-500 p-2 h-full block"
          >
            <b>Update</b>
          </button>
        </div>
      </div>
    </div>
  );
}

Exchange.Layout = MainLayout;
