import { MainLayout } from "../components/layout";
import { useState, useEffect } from "react";
import axios from "axios";

export default function TradeManagement() {
  const [data, setData] = useState({
    commodity: "gold",
    quantity: "",
    status: "active",
    duration: "",
    price: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    if (data.quantity > 0) {
      const response = await axios.post("/api/trade/sell", {
        data,
      });

      setData({
        commodity: "gold",
        quantity: "",
        status: "active",
        duration: "",
        price: "",
      });
    }
  };
  return (
    <div className="w-full h-screen overflow-y-scroll py-6 px-4">
      <h1 className="text-3xl font-bold border-b border-[#131722] pb-6">
        Trade Management
      </h1>

      <div className="flex flex-col">
        <form onSubmit={submitHandler} className="w-1/2 mx-auto flex flex-col">
          <div className="mt-4">
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={data.commodity}
              onChange={(e) => {
                setData((prev) => {
                  return { ...prev, commodity: e.target.value };
                });
              }}
            >
              <option value="gold">Gold</option>
              <option value="ukoil">Ukoil</option>
            </select>
          </div>

          <div className="mt-4">
            <input
              type="text"
              placeholder="Quantity of Commodity"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={data.quantity}
              onChange={(e) => {
                setData((prev) => {
                  return { ...prev, quantity: e.target.value };
                });
              }}
            />
          </div>

          <div className="mt-4">
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={data.status}
              onChange={(e) => {
                setData((prev) => {
                  return { ...prev, status: e.target.value };
                });
              }}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="mt-4">
            <input
              type="text"
              placeholder="Processing Duration  (in min)"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={data.duration}
              onChange={(e) => {
                setData((prev) => {
                  return { ...prev, duration: e.target.value };
                });
              }}
            />
          </div>

          <div className="mt-4">
            <input
              type="text"
              placeholder="Price for this Trade"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={data.price}
              onChange={(e) => {
                setData((prev) => {
                  return { ...prev, price: e.target.value };
                });
              }}
            />
          </div>

          <button className="btn-primary m-none mt-4">Save</button>
        </form>
      </div>
    </div>
  );
}

TradeManagement.Layout = MainLayout;
