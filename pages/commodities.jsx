import { MainLayout } from "../components/layout";
import { useState, useEffect, useRef } from "react";
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

  const [GoldPriceTrade, setGoldPriceTrade] = useState(0);
  const container = useRef(null);
  const containerOil = useRef(null);

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
  const TradePrice = (script, type) => {
    script.async = true;
    script.innerHTML = `{
      "symbol":"${type}",
      "width": "100%",
      "colorTheme": "dark",
      "isTransparent": true,
      "locale": "en",
      "style":"1",
      "timezone":"Etc/USTC",
      "interval":"D"
    }`;
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
    if (container?.current?.children[0]) {
      container.current.removeChild(container.current.children[0]);
    }
    container?.current?.appendChild(script);
  };

  const TradePriceOil = (script, type) => {
    script.async = true;
    script.innerHTML = `{
      "symbol":"${type}",
      "width": "100%",
      "colorTheme": "dark",
      "isTransparent": true,
      "locale": "en",
      "style":"1",
      "timezone":"Etc/USTC",
      "interval":"D"
    }`;

    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
    if (containerOil?.current?.children[0]) {
      containerOil.current.removeChild(containerOil.current.children[0]);
    }
    containerOil?.current?.appendChild(script);
  };
  useEffect(() => {
    let script = document.createElement("script");
    let script2 = document.createElement("script");
    TradePrice(script, "TVC:GOLD");
    TradePriceOil(script2, "TVC:UKOIL");
  }, [GoldPriceTrade]);

  setInterval(() => {
    setGoldPriceTrade(GoldPriceTrade + 1);
  }, 30 * 60 * 1000);

  return (
    <div className="w-full h-screen overflow-y-scroll py-6 px-4">
      <h1 className="text-3xl font-bold border-b border-[#131722] pb-6">
        Commodities Price Management
      </h1>

      <div className="flex flex-col mt-4">
        <div className="bg-gray-800 p-1 mr-1 text-white border border-gray-300 flex justify-between flex-row items-center rounded-md overflow-hidden">
          <h3 className="text-lg font-semibold  text-center">Gold</h3>
          {/* <GetStatics type="TVC:GOLD" />; */}
          <div
            // className="tradingview-widget-container"
            ref={container}
            style={{ pointerEvents: "none" }}
          >
            <div className="tradingview-widget-container__widget"></div>
          </div>
          {/* <input
            className="p-2 text-center outline-none w-1/3 border text-gray-800 rounded-md "
            type="text"
            value={gold.price}
            onChange={(e) => {
              setGold((prev) => {
                return { ...prev, price: e.target.value };
              });
            }}
          /> */}
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
          <div
            // className="tradingview-widget-container"
            ref={containerOil}
            style={{ pointerEvents: "none" }}
          >
            <div className="tradingview-widget-container__widget"></div>
          </div>
          {/* <GetStatics type="TVC:UKOIL" /> */}
          {/* <input
            className="p-2 text-center outline-none w-1/3 border text-gray-800 rounded-md "
            type="text"
            value={ukoil.price}
            onChange={(e) => {
              setUkoil((prev) => {
                return { ...prev, price: e.target.value };
              });
            }}
          /> */}
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

function GetStatics({ type }) {
  console.log("GetStatics is called..");
  const container = useRef(null);
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.innerHTML = `{
         "symbol": "${type}",
         "width": "100%",
         "colorTheme": "dark",
         "isTransparent": true,
         "locale": "en",
         "style":"1",
         "timezone":"Etc/USTC",
         "interval":"D"
          }`;

    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
    container.current.appendChild(script);
  }, []);
  return (
    <div
      // className="tradingview-widget-container"
      ref={container}
      style={{ pointerEvents: "none" }}
    >
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

Commodities.Layout = MainLayout;
