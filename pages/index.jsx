import { MainLayout } from "../components/layout";

import Image from "next/image";
import usersImg from "../public/imgs/users.png";
import goldImg from "../public/imgs/gold.jpg";
import ukoilImg from "../public/imgs/crude.jpg";
import tradeImg from "../public/imgs/trade.png";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { useEffect, useState } from "react";
const data = [
  {
    name: "03/06",
    Buy: 4000,
    Sell: 2400,
    amt: 2400,
  },
  {
    name: "02/06",
    Buy: 3000,
    Sell: 1398,
    amt: 2210,
  },
  {
    name: "01/06",
    Buy: 2000,
    Sell: 9800,
    amt: 2290,
  },
  {
    name: "31/05",
    Buy: 2780,
    Sell: 3908,
    amt: 2000,
  },
  {
    name: "30/05",
    Buy: 1890,
    Sell: 4800,
    amt: 2181,
  },
  {
    name: "29/05",
    Buy: 2390,
    Sell: 3800,
    amt: 2500,
  },
  {
    name: "28/05",
    Buy: 3490,
    Sell: 4300,
    amt: 2100,
  },
];

export default function Home({ users, sale, trade }) {
  // const sale = JSON.parse(sales);

  return (
    <div className="w-full h-screen overflow-y-scroll py-6 px-4">
      <h1 className="text-3xl font-bold border-b border-[#131722] pb-6">
        Admin Dashboard
      </h1>

      <div className="flex flex-col">
        <div className="flex items-center justify-between mt-10">
          <div className="border-gray-800 border flex items-center rounded-md overflow-hidden">
            <div className="bg-gray-600 py-2 px-4">
              <Image src={usersImg} alt="users" width="35px" height="35px" />
            </div>
            <span className="py-2 px-6">
              <b>Active Users:</b> {10}
            </span>
          </div>

          <div className="border-gray-800 border flex items-center rounded-md overflow-hidden">
            <div className="bg-gray-600 py-2 px-4">
              <Image
                src={goldImg}
                alt="gold"
                width="35px"
                height="35px"
                className="rounded-full"
              />
            </div>
            <span className="py-2 px-6">
              <b>Gold Sales:</b> ${185}
            </span>
          </div>

          <div className="border-gray-800 border flex items-center rounded-md overflow-hidden">
            <div className="bg-gray-600 py-2 px-4">
              <Image
                src={ukoilImg}
                alt="ukoil"
                width="35px"
                height="35px"
                className="rounded-full"
              />
            </div>
            <span className="py-2 px-6">
              <b>Ukoil Sales:</b> ${60}
            </span>
          </div>

          <div className="border-gray-800 border flex items-center rounded-md overflow-hidden">
            <div className="bg-gray-600 py-2 px-4">
              <Image src={tradeImg} alt="ukoil" width="35px" height="35px" />
            </div>
            <span className="py-2 px-6">
              <b>Active Trades:</b> {25}
            </span>
          </div>
        </div>

        <div className="flex mt-20">
          <div className="">
            <h2 className="text-center text-xl font-semibold mb-2">
              P2P Buy/Sell
            </h2>
            <div className="">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Buy" fill="#3be609f0" />
                <Bar dataKey="Sell" fill="#e61509f0" />
              </BarChart>
            </div>
          </div>

          <div className="">
            <h2 className="text-center text-xl font-semibold mb-2">
              Metalcharts Buy/Sell
            </h2>
            <div className="">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 0,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Buy" fill="#3be609f0" />
                <Bar dataKey="Sell" fill="#e61509f0" />
              </BarChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Home.Layout = MainLayout;
