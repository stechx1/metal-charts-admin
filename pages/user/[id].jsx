import User from "../../models/User";

import { MainLayout } from "../../components/layout";
import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";

export default function ViewUser({ User, bank }) {
  const [user, setUser] = useState(JSON.parse(User)[0]);
  console.log("User:-", user);
  console.log("Bank:-", bank);

  return (
    <div className="w-full h-screen overflow-y-scroll py-6 px-4">
      <h1 className="text-3xl font-bold border-b border-[#131722] pb-6">
        View User Account - {new Date(user.create_at).toDateString()}
      </h1>

      <div className="">
        <div className="flex flex-col mt-4">
          <h4 className="text-xl font-semibold ">User Details:</h4>
          <div className="flex">
            <div className="my-2 w-1/2 flex flex-col">
              <b>Full Name: </b>
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                {user.name}
              </span>
            </div>
            <div className="my-2 w-1/2 flex flex-col ml-2">
              <b>Username: </b>
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                {user.username}
              </span>
            </div>
          </div>

          <div className="flex">
            <div className="my-2 w-1/2 flex flex-col">
              <b>Email: </b>
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                {user.email}
              </span>
            </div>
            <div className="my-2 w-1/2 flex flex-col ml-2">
              <b>Phone:</b>
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                {user.phone}
              </span>
            </div>
          </div>

          <div className="flex">
            <div className="my-2 w-1/2 flex flex-col">
              <b>Kyc Status: </b>
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                {user.status}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <h4 className="text-xl font-semibold">Bank Account Details:</h4>
          <div className="flex">
            <div className="my-2 w-1/2 flex flex-col">
              <b>Bank Name: </b>
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                {bank.length > 0 ? bank[0].name : "Not Provided Yet"}
              </span>
            </div>
            <div className="my-2 w-1/2 flex flex-col ml-2">
              <b>Account Number: </b>
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                {user.bank.length > 0
                  ? user.bank[0].account
                  : "Not Provided Yet"}
              </span>
            </div>
          </div>

          <div className="flex">
            <div className="my-2 w-1/2 flex flex-col">
              <b>Account Holder Name: </b>
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                {user.bank.length > 0 ? user.bank[0].name : "Not Provided Yet"}
              </span>
            </div>
            <div className="my-2 w-1/2 flex flex-col ml-2">
              <b>Account Holder Email: </b>
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                {user.bank.length > 0 ? user.bank[0].email : "Not Provided Yet"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <h4 className="text-xl font-semibold">KYC Details:</h4>
          <div className="flex">
            <div className="my-2 w-1/2 flex flex-col">
              <b>City Name: </b>
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                {user.kyc.length > 0 ? user.kyc[0].city : "Not Provided Yet"}
              </span>
            </div>
            <div className="my-2 w-1/2 flex flex-col ml-2">
              <b>Country Name: </b>
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                {user.kyc.length > 0 ? user.kyc[0].country : "Not Provided Yet"}
              </span>
            </div>
          </div>

          <div className="flex">
            <div className="my-2 w-1/2 flex flex-col">
              <b>Street Address: </b>
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                {user.kyc.length > 0 ? user.kyc[0].address : "Not Provided Yet"}
              </span>
            </div>
            <div className="my-2 w-1/2 flex flex-col ml-2">
              <b>Date of Birth: </b>
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                {user.kyc.length > 0 ? user.kyc[0].dob : "Not Provided Yet"}
              </span>
            </div>
          </div>
        </div>

        <>
          <div className="flex mt-4">
            <button className="btn-primary">Approve</button>
            <button className="btn-primary bg-red-500 hover:bg-red-600">
              Reject
            </button>
          </div>
        </>
      </div>
    </div>
  );
}

ViewUser.Layout = MainLayout;

export async function getServerSideProps(context) {
  const params = context.params;
  const id = params.id;
  console.log(id);

  const response = await User.aggregate([
    // user details
    {
      $match: {
        $expr: {
          $eq: ["$_id", { $toObjectId: id }],
        },
      },
    },
    {
      $project: {
        password: 0,
      },
    },
    // bank details
    {
      $lookup: {
        from: "banks",
        localField: "token",
        foreignField: "token",
        as: "bank",
      },
    },
    // kyc details
    {
      $lookup: {
        from: "kycs",
        localField: "token",
        foreignField: "token",
        as: "kyc",
      },
    },
  ]);

  const bankResponse = await axios(`https://api.paystack.co/bank`, {
    headers: {
      Authorization: "Bearer" + process.env.SECRET_KEY,
    },
  });
  const banks = bankResponse.data.data;
  let bank;

  try {
    bank = banks.filter((item) => {
      return item.id == response[0].bank[0].bankid;
    });
  } catch (error) {
    bank = "";
  }

  return {
    props: {
      User: JSON.stringify(response),
      bank,
    },
  };
}
