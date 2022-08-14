import { MainLayout } from "../components/layout";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import openImg from "../public/imgs/open.png";

export default function Trades() {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const arrowStyle = { color: "rgb(17,24,39)" };

  const accept = async (e) => {
    const response = await axios.post("/api/trade/metalcharts/buy", {
      _id: e.target.id,
      status: "accepted",
    });

    console.log("response", response);

    let balance;
    if (response.status == 200) {
      const commodity = {
        type: "rem",
        amount: response.data.qty,
      };
      console.log("commodity", commodity);
      if (response.data?.commodity == "gold") {
        balance = await axios.post("/api/balance/gold", commodity);
      } else {
        balance = await axios.post("/api/balance/ukoil", commodity);
      }

      console.log(balance);

      // TODO: Allot the commodity to Buyer
    }
  };

  const reject = async (e) => {
    const response = await axios.post("/api/trade/metalcharts/buy", {
      _id: e.target.id,
      status: "rejected",
    });

    console.log("response", response);
  };

  const columns = [
    {
      name: "Commodity",
      selector: (row) => {
        return(<span className="uppercase">{row.commodity}</span>)
      },
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => {
        return(<span className="uppercase">${(row.amount).toFixed(2)}</span>)
      },
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => {
        return(<span className="uppercase">{row.qty}</span>)
      },
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => {
        return new Date(row.created_at).toDateString();
      },
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => {
        return(<span className="uppercase">{row.status}</span>)
      },
      sortable: true,
    },
    {
      name: "",
      selector: (row) => (
        <Link href={`/view_request/${row._id}`}>
          <a target="_blank">
            <Image src={openImg} alt="menu" width="15px" height="15px" />
          </a>
        </Link>
      ),
    },
  ];

  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/api/trade/metalcharts/sell`);
      console.log(response);

      if (response.status === 200) {
        response.data.map((item) => {
          setData((prev) => {
            return [...prev, item];
          });
        });
      }
    }
    fetchData();
  }, []);

  return (
    <div className="w-full h-screen overflow-y-scroll py-6 px-4">
      <h1 className="text-3xl font-bold border-b border-[#131722] pb-6">
        Buying Request for MetalCharts
      </h1>

      <div className="flex flex-col">
        <div className="m-4 ">
          <div className="w-1/2 flex flex-row items-center">
            <label htmlFor="search" className="mr-4">
              Search:{" "}
            </label>
            <input
              id="search"
              type="text"
              value={filterText}
              placeholder="Search By Amount"
              onChange={(e) => {
                setFilterText(e.target.value);
              }}
              className="outline-none border rounded-md border-gray-300 p-2 pl-4"
            />
          </div>
        </div>

        <DataTable
          columns={columns}
          data={data.filter((item) => {
            return item.amount && item.amount.toString().includes(filterText);
          })}
          pagination
          persistTableHead
        />
      </div>
    </div>
  );
}

Trades.Layout = MainLayout;
