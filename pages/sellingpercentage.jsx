import { MainLayout } from "../components/layout";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SellingPercentage() {
  const [p2p, setP2P] = useState({
    percentage: 0,
    date: Date.now(),
  });

  const [metalcharts, setMetalcharts] = useState({
    percentage: 0,
    date: Date.now(),
  });

  const updateP2p = async () => {
    const response = await axios.post("/api/percentage/p2p", {
      commodity: "p2p",
      percentage: p2p.percentage,
    });
    if (response.status === 201) {
      setP2P({
        percentage: response.data.price,
        date: response.data.modified_at,
      });
    }
  };

  const updateMetalchart = async () => {
    console.log(metalcharts);

    const response = await axios.post("/api/percentage/metalcharts", {
      commodity: "metalcharts",
      percentage: metalcharts.percentage,
    });
    if (response.status === 201) {
      console.log(response);
      setMetalcharts({
        percentage: response.data.price,
        date: response.data.modified_at,
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response1 = await axios.get("/api/percentage/metalcharts");
      const response2 = await axios.get("/api/percentage/p2p");
      if (response1.status === 200) {
        setMetalcharts({
          percentage: response1.data.percentage,
          date: response1.data.modified_at,
        });
      }
      if (response2.status === 200) {
        setP2P({
          percentage: response2.data.percentage,
          date: response2.data.modified_at,
        });
      }
    }
    fetchData();
  }, []);

  return (
    <div className="w-full h-screen overflow-y-scroll py-6 px-4">
      <h1 className="text-3xl font-bold border-b border-[#131722] pb-6">
        Metalcharts Tax Percentage
      </h1>

      
      <div className="flex flex-col mt-4">
        <div className="bg-gray-800 p-1 mr-1 text-white border border-gray-300 flex justify-between flex-row items-center rounded-md overflow-hidden">
          <h3 className="text-lg font-semibold  text-center">Peer 2 Peer</h3>
          <input
            className="p-2 text-center outline-none w-1/3 border text-gray-800 rounded-md "
            type="text"
            value={p2p.percentage}
            onChange={(e) => {
              setP2P((prev) => {
                return { ...prev, percentage: e.target.value };
              });
            }}
          />
          <span>
            <b>Updated at</b>: {new Date(p2p.date).toDateString()}
          </span>
          <button
            onClick={updateP2p}
            className="text-green-500 p-2 h-full block"
          >
            <b>Update</b>
          </button>
        </div>

        <div className="bg-gray-800 p-1 mt-2 mr-1 text-white border border-gray-300 flex justify-between flex-row items-center rounded-md overflow-hidden">
          <h3 className="text-lg font-semibold  text-center">MetalCharts</h3>
          <input
            className="p-2 text-center outline-none w-1/3 border text-gray-800 rounded-md "
            type="text"
            value={metalcharts.percentage}
            onChange={(e) => {
              setMetalcharts((prev) => {
                return { ...prev, percentage: e.target.value };
              });
            }}
          />
          <span>
            <b>Updated at</b>: {new Date(metalcharts.date).toDateString()}
          </span>
          <button
            onClick={() => updateMetalchart()}
            className="text-green-500 p-2 h-full block"
          >
            <b>Update</b>
          </button>
        </div>
      </div>
    </div>
  );
}

SellingPercentage.Layout = MainLayout;
