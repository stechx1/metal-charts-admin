import Logo from "../public/imgs/logo.png";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useLayoutEffect, useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const list = [
    { txt: "Dashboard", link: "/" },
    { txt: "User Management", link: "/users" },
    { txt: "Commodities Price", link: "/commodities" },
    { txt: "Trading Metals", link: "/adminmetal" },
    { txt: "Exchange", link: "/exchange" },
    { txt: "Selling Percentage", link: "/sellingpercentage" },
    { txt: "Buy Request", link: "/buyrequest" },
    { txt: "Sell Request", link: "/sellrequest" },
    { txt: "Peer2Peer Request", link: "/peer2peer" },
  ];

  useLayoutEffect(() => {
    async function checkstatus() {
      const { data } = await axios.get("/api/User/cookie");

      if (data === "") {
        router.push("/Login");
        setTimeout(() => {
          router.reload();
        }, 500);
      }
    }
    checkstatus();

    // setInterval(checkstatus(), 60000 * 3);
  }, [router]);

  const logOut = async () => {
    const result = await axios.post("/api/User/cookie");
    if (result.status == 204) {
      router.push("/");
      setTimeout(() => {
        router.reload();
      }, 500);
    }
  };
  return (
    <div className="w-1/4 min-h-screen bg-[#131722] flex flex-col items-start">
      <Link href="/">
        <a>
          <div className="p-4 border-b border-gray-500">
            <Image src={Logo} alt="MetalCharts" height={"250px"} />
          </div>
        </a>
      </Link>

      <nav className="p-4 flex flex-col items-start w-full">
        {list.map((item, id) => {
          return <NavLink prop={item} key={id} />;
        })}

        <Link href="#">
          <a
            onClick={logOut}
            className={`block text-white w-full hover:bg-gray-800 p-2 rounded my-1`}
          >
            Logout?
          </a>
        </Link>
      </nav>
    </div>
  );
}

function NavLink({ prop }) {
  const router = useRouter();
  return (
    <Link href={prop.link}>
      <a
        className={`block text-white w-full hover:bg-gray-800 p-2 rounded my-1 ${
          router.pathname == prop.link ? "bg-gray-800" : ""
        }`}
      >
        {prop.txt}
      </a>
    </Link>
  );
}
