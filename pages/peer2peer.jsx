import { MainLayout } from "../components/layout";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import openImg from "../public/imgs/open.png";

export default function Transactions() {
  const columns = [
    {
      name: "Trx Id",
      selector: (row) => row.trx_id,
      sortable: true,
    },
    {
      name: "Seller",
      selector: (row) => {
        return <span className="uppercase">{row.seller}</span>;
      }, //key for data
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => {
        return row.qty.toFixed(5);
      },
      sortable: true,
    },
    {
      name: "Buyer",
      selector: (row) => {
        return <span className="uppercase">{row.buyer}</span>;
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
      name: "Trx Status",
      selector: (row) => {
        return <span className="uppercase">{row.status}</span>;
      },
      sortable: true,
    },
    {
      name: "",
      selector: (row) => (
        <Link href={`/view_p2p_request/${row._id}`}>
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
      const response = await axios.get(`/api/trade/sell`);
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
        Peer 2 Peer Transaction Requests
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
              placeholder="Search By Trx Id"
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
            console.log(item);
            return item.trx_id && item.trx_id.toString().includes(filterText);
          })}
          pagination
          persistTableHead
        />
      </div>
    </div>
  );
}

Transactions.Layout = MainLayout;
