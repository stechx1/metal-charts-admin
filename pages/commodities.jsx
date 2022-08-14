import { MainLayout } from "../components/layout";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Commodities() {
  useEffect(() => {
    async function fetchData() {
      const response1 = await axios.get("/api/commodity/ukoil");
      const response2 = await axios.get("/api/commodity/gold");
      if (response1.status === 200) {
        setUkoil({
          price: response1.data.price,
          date: response1.data.updated_at,
        });
      }
      if (response2.status === 200) {
        setGold({
          price: response2.data.price,
          date: response2.data.updated_at,
        });
      }
    }
    fetchData();
  }, []);

  const [ukoil, setUkoil] = useState({
    price: 0,
    date: 0,
  });

  const [gold, setGold] = useState({
    price: 0,
    date: 0,
  });

  const updateUkoil = async () => {
    const response = await axios.post("/api/commodity/ukoil", {
      price: ukoil.price,
    });
    if (response.status === 200) {
      //   console.log(response);
      setUkoil({ price: response.data.price, date: response.data.updated_at });
    }
  };

  const updateGold = async () => {
    const response = await axios.post("/api/commodity/gold", {
      price: gold.price,
    });
    if (response.status === 200) {
      //   console.log(response);
      setGold({ price: response.data.price, date: response.data.updated_at });
    }
  };

  return (
    <div className="w-full h-screen overflow-y-scroll py-6 px-4">
      <h1 className="text-3xl font-bold border-b border-[#131722] pb-6">
        Commodities Price Management
      </h1>

      <div className="flex flex-col mt-4">
        <div className="bg-gray-800 p-1 mr-1 text-white border border-gray-300 flex justify-between flex-row items-center rounded-md overflow-hidden">
          <h3 className="text-lg font-semibold  text-center">Gold</h3>
          <input
            className="p-2 text-center outline-none w-1/3 border text-gray-800 rounded-md "
            type="text"
            value={gold.price}
            onChange={(e) => {
              setGold((prev) => {
                return { ...prev, price: e.target.value };
              });
            }}
          />
          <span>
            <b>Unit of Commodity</b>: Ounce
          </span>
          <span>
            <b>Updated at</b>: {new Date(gold.date).toDateString()}
          </span>
          <button
            onClick={updateGold}
            className="text-green-500 p-2 h-full block"
          >
            <b>Update</b>
          </button>
        </div>

        <div className="bg-gray-800 p-1 mt-2 mr-1 text-white border border-gray-300 flex justify-between flex-row items-center rounded-md overflow-hidden">
          <h3 className="text-lg font-semibold  text-center">Ukoil</h3>
          <input
            className="p-2 text-center outline-none w-1/3 border text-gray-800 rounded-md "
            type="text"
            value={ukoil.price}
            onChange={(e) => {
              setUkoil((prev) => {
                return { ...prev, price: e.target.value };
              });
            }}
          />
          <span>
            <b>Unit of Commodity</b>: Barrel
          </span>
          <span>
            <b>Updated at</b>: {new Date(ukoil.date).toDateString()}
          </span>
          <button
            onClick={updateUkoil}
            className="text-green-500 p-2 h-full block"
          >
            <b>Update</b>
          </button>
        </div>
      </div>
    </div>
  );
}

Commodities.Layout = MainLayout;
