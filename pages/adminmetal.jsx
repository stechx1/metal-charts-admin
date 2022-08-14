import { MainLayout } from "../components/layout";
import { useState, useEffect } from "react";
import axios from "axios";
import Popup from "reactjs-popup";

export default function Account() {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const arrowStyle = { color: "rgb(107, 114, 128)" };

  const [commodity, setCommmodity] = useState({
    name: "",
    value: "",
  });

  const [gold, setGold] = useState({
    total: 0.0,
    amount: 0.0,
    date: "",
  });
  const [ukoil, setUkoil] = useState({
    total: 0.0,
    amount: 0.0,
    date: "",
  });

  const fetchData = async () => {
    const response1 = await axios.get("/api/balance/gold");
    const response2 = await axios.get("/api/balance/ukoil");
    if (response1.status === 200) {
      setGold({
        total: response1.data.total,
        amount: response1.data.amount,
        date: response1.data.modified_at,
      });
    }
    if (response2.status === 200) {
      setUkoil({
        total: response2.data.total,
        amount: response2.data.amount,
        date: response2.data.modified_at,
      });
    }
  };

  useEffect(() => {
    async function getData() {
      fetchData();
    }
    getData();
  }, []);

  const submitHandle = async (e) => {
    e.preventDefault();
    console.log(commodity);

    let gold = {};
    let ukoil = {};

    if (commodity.name === "DGold") {
      gold.type = "add";
      gold.total = 5000000;
      gold.amount = commodity.value;
    } else if (commodity.name === "WGold") {
      gold.type = "rem";
      gold.total = 5000000;
      gold.amount = commodity.value;
    } else if (commodity.name === "DUkoil") {
      ukoil.type = "add";
      ukoil.total = 5000000;
      ukoil.amount = commodity.value;
    } else if (commodity.name === "WUkoil") {
      ukoil.type = "rem";
      ukoil.total = 5000000;
      ukoil.amount = commodity.value;
    }

    if (gold.type) {
      console.log("gold", gold);
      const response = await axios.post("/api/balance/gold", gold);
      if(response.status==201){
        fetchData()
      }
      console.log(response);
    } else {
      const response = await axios.post("/api/balance/ukoil", ukoil);
      if(response.status==201){
        fetchData()
      }
      console.log(response);
    }
  };

  return (
    <div className="w-full h-screen overflow-y-scroll py-6 px-4">
      <h1 className="text-3xl font-bold border-b border-[#131722] pb-6">
        Admin Metals Management
      </h1>

      <div className="flex flex-col mt-4">
        <h3 className="font-bold text-xl text-gray-800">Gold Management</h3>
        <div className="flex flex-row items-center bg-gray-600 text-white rounded-md p-3">
          <div className="flex flex-col w-1/4">
            <h4 className="font-semibold text-lg">Total Amount</h4>
            <span>{gold.total.toFixed(2)} Ounce</span>
          </div>
          <div className="flex flex-col w-1/4">
            <h4 className="font-semibold text-lg">Amount Sold</h4>
            <span>{gold.amount.toFixed(2)}</span>
          </div>
          <div className="flex flex-col w-1/4">
            <h4 className="font-semibold text-lg">Amount Remaining</h4>
            <span>{((gold.amount -gold.total) * -1).toFixed(2)}</span>
          </div>
          <div className="flex flex-col w-1/4">
            <h4 className="font-semibold text-lg">Last D/W</h4>
            <span>{new Date(gold.date).toDateString()}</span>
          </div>

          <div className="flex flex-col">
            <Popup
              {...{ arrowStyle }}
              open={open}
              closeModal={closeModal}
              trigger={
                <button className="p-2 bg-green-500 w-20 text-center rounded-md font-semibold text-xs">
                  Deposit
                </button>
              }
            >
              <form
                className="bg-gray-500 flex flex-col p-2 rounded-md"
                onSubmit={submitHandle}
              >
                <input
                  type="number"
                  value={commodity.value}
                  onChange={(e) => {
                    setCommmodity({ name: "DGold", value: e.target.value });
                  }}
                  className="outline-none border-none bg-transparent text-white text-center"
                />
                <button className="rounded-md bg-green-400 w-16 mx-auto text-white text-xs p-1 mt-4">
                  Deposit
                </button>
              </form>
            </Popup>
            <Popup
              {...{ arrowStyle }}
              open={open}
              closeModal={closeModal}
              trigger={
                <button className="p-2 bg-red-500 w-20 text-center rounded-md mt-2 font-semibold text-xs">
                  Withdraw
                </button>
              }
            >
              <form
                className="bg-gray-500 flex flex-col p-2 rounded-md"
                onSubmit={submitHandle}
              >
                <input
                  type="number"
                  value={commodity.value}
                  onChange={(e) => {
                    setCommmodity({ name: "WGold", value: e.target.value });
                  }}
                  className="outline-none border-none bg-transparent text-white text-center"
                />
                <button className="rounded-md bg-red-400 w-16 mx-auto text-white text-xs p-1 mt-4">
                  Withdraw
                </button>
              </form>
            </Popup>
          </div>
        </div>

        <h3 className="font-bold text-xl text-gray-800 mt-4">
          Ukoil Management
        </h3>
        <div className="flex flex-row items-center bg-gray-600 text-white rounded-md p-3">
          <div className="flex flex-col w-1/4">
            <h4 className="font-semibold text-lg">Total Amount</h4>
            <span>{ukoil.total.toFixed(2)} Barrel</span>
          </div>
          <div className="flex flex-col w-1/4">
            <h4 className="font-semibold text-lg">Amount Sold</h4>
            <span>{ukoil.amount.toFixed(2)}</span>
          </div>
          <div className="flex flex-col w-1/4">
            <h4 className="font-semibold text-lg">Amount Remaining</h4>
            <span>{((ukoil.amount -ukoil.total) * -1).toFixed(2)}</span>
          </div>
          <div className="flex flex-col w-1/4">
            <h4 className="font-semibold text-lg">Last D/W</h4>
            <span>{new Date(ukoil.date).toDateString()}</span>
          </div>

          <div className="flex flex-col">
            <Popup
              {...{ arrowStyle }}
              open={open}
              closeModal={closeModal}
              trigger={
                <button className="p-2 bg-green-500 w-20 text-center rounded-md font-semibold text-xs">
                  Deposit
                </button>
              }
            >
              <form
                className="bg-gray-500 flex flex-col p-2 rounded-md"
                onSubmit={submitHandle}
              >
                <input
                  type="number"
                  value={commodity.value}
                  onChange={(e) => {
                    setCommmodity({ name: "DUkoil", value: e.target.value });
                  }}
                  className="outline-none border-none bg-transparent text-white text-center"
                />
                <button className="rounded-md bg-green-400 w-16 mx-auto text-white text-xs p-1 mt-4">
                  Deposit
                </button>
              </form>
            </Popup>

            <Popup
              {...{ arrowStyle }}
              open={open}
              closeModal={closeModal}
              trigger={
                <button className="p-2 bg-red-500 w-20 text-center rounded-md mt-2 font-semibold text-xs">
                  Withdraw
                </button>
              }
            >
              <form
                className="bg-gray-500 flex flex-col p-2 rounded-md"
                onSubmit={submitHandle}
              >
                <input
                  type="number"
                  value={commodity.value}
                  onChange={(e) => {
                    setCommmodity({ name: "WUkoil", value: e.target.value });
                  }}
                  className="outline-none border-none bg-transparent text-white text-center"
                />
                <button className="rounded-md bg-red-400 w-16 mx-auto text-white text-xs p-1 mt-4">
                  Withdraw
                </button>
              </form>
            </Popup>
          </div>
        </div>
      </div>
    </div>
  );
}

Account.Layout = MainLayout;
