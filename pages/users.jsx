import { MainLayout } from "../components/layout";
import DataTable from "react-data-table-component";
import { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import axios from "axios";
// import { useTable } from "react-table";

export default function Home() {
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name, //key for data
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Joined",
      selector: (row) => row.create_at,
      sortable: true,
    },
    {
      name: "KYC Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Actions",
      selector: (row) => {
        return (
          <Link href={`/user/${row._id}`}>
            <a className="btn-primary block" target="_blank">
              View Details
            </a>
          </Link>
        );
      },
    },
  ];
  const [users, setUsers] = useState([]);
  const [filterText, setFilterText] = useState("");

  const filteredItems = users.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/api/users/user");
      // console.log(response);

      if (response.status === 200) {
        response.data.map((item) => {
          setUsers((prev) => {
            return [...prev, item];
          });
        });
      }
      // console.log(users);
    }
    fetchData();
  }, []);

  return (
    <div className="w-full h-screen overflow-y-scroll py-6 px-4">
      <h1 className="text-3xl font-bold border-b border-[#131722] pb-6">
        User Management
      </h1>

      <div className="flex flex-col">
        <div className="mt-2 flex flex-row items-center">
          <label htmlFor="search" className="mr-4">
            Search:{" "}
          </label>
          <input
            id="search"
            type="text"
            value={filterText}
            placeholder="Search By Name"
            onChange={(e) => {
              setFilterText(e.target.value);
            }}
            className="outline-none border rounded-md border-gray-300 p-2 pl-4"
          />
        </div>

        <DataTable
          columns={columns}
          data={filteredItems}
          pagination
          persistTableHead
        />
      </div>
    </div>
  );
}

Home.Layout = MainLayout;
