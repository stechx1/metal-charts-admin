import Sell from "../../models/Sell";
import SellPercentage from "../../models/SellPercentage";
import { MainLayout } from "../../components/layout";
import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";

export default function ViewRequest({ data, bank, percentage }) {
  const [trade, setTrade] = useState(JSON.parse(data)[0]);
  console.log("percentage", percentage);

  const approve = async () => {
    const response = await axios.post("/api/trade/metalcharts/sell", {
      _id: trade._id,
      status: "accepted",
    });
    console.log(response);
    if (response.status == 201) {
      setTrade((prev) => {
        return { ...prev, status: response.data.sellData.status };
      });
    }
  };

  const reject = async () => {
    const response = await axios.post("/api/trade/metalcharts/sell", {
      _id: trade._id,
      status: "rejected",
    });
    console.log(response);
    if (response.status == 201) {
      setTrade((prev) => {
        return { ...prev, status: response.data.sellData.status };
      });
    }
  };

  return (
    <div className="w-full h-screen overflow-y-scroll py-6 px-4">
      <h1 className="text-3xl font-bold border-b border-[#131722] pb-6">
        View Sell Request - {new Date(trade.created_at).toDateString()}
      </h1>

      <div className="">
        <div className="flex flex-col mt-4">
          <h4 className="text-xl font-semibold ">Trade Details:</h4>
          <div className="flex">
            <div className="my-2 w-1/2 flex flex-col">
              <b>Amount:</b>{" "}
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                ${trade.amount} - $
                {trade.amount -
                  (parseFloat(trade.amount) * parseFloat(percentage)) / 100}
              </span>
            </div>
            <div className="my-2 w-1/2 flex flex-col ml-2">
              <b>Quantity:</b>{" "}
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                {trade.qty}
              </span>
            </div>
          </div>

          <div className="flex">
            <div className="my-2 w-1/2 flex flex-col">
              <b>Commodity: </b>
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                {trade.commodity}
              </span>
            </div>
            <div className="my-2 w-1/2 flex flex-col ml-2">
              <b>Status:</b>
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                {trade.status}
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
                {bank}
              </span>
            </div>
            <div className="my-2 w-1/2 flex flex-col ml-2">
              <b>Account Number: </b>
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                {trade.account}
              </span>
            </div>
          </div>

          <div className="flex">
            <div className="my-2 w-1/2 flex flex-col">
              <b>Account Holder Name: </b>
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                {trade.name}
              </span>
            </div>
            <div className="my-2 w-1/2 flex flex-col ml-2">
              <b>Account Holder Email: </b>
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                {trade.email}
              </span>
            </div>
          </div>
        </div>

        {trade.status == "waiting" ? (
          <>
            <div className="flex mt-4">
              <button className="btn-primary" onClick={approve}>
                Accept
              </button>
              <button
                className="btn-primary bg-red-500 hover:bg-red-600"
                onClick={reject}
              >
                Reject
              </button>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

ViewRequest.Layout = MainLayout;

export async function getServerSideProps(context) {
  const params = context.params;
  const id = params.id;
  console.log(id);

  const response = await Sell.aggregate([
    {
      $match: {  
        $expr: {
          $eq: ["$_id", { $toObjectId: id }],
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "seller",
        foreignField: "token",
        as: "user",
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{ $arrayElemAt: ["$user", 0] }, "$$ROOT"],
        },
      },
    },
    { $project: { user: 0 } },
    {
      $project: {
        amount: 1,
        commodity: 1,
        username: 1,
        qty: 1,
        status: 1,
        token: 1,
        created_at: 1,
      },
    },
    // getting bank account
    {
      $lookup: {
        from: "banks",
        localField: "token",
        foreignField: "token",
        as: "bAccount",
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{ $arrayElemAt: ["$bAccount", 0] }, "$$ROOT"],
        },
      },
    },
    { $project: { bAccount: 0 } },

    {
      $project: {
        name: 1,
        amount: 1,
        commodity: 1,
        username: 1,
        qty: 1,
        status: 1,
        account: 1,
        email: 1,
        bankid: 1,
        created_at: 1,
      },
    },
  ]);

  const bankResponse = await axios(`https://api.paystack.co/bank`, {
    headers: {
      Authorization: "Bearer" + process.env.SECRET_KEY,
    },
  });
  const banks = bankResponse.data.data;
  const bank = banks.filter((item) => {
    return item.id == response[0].bankid;
  });

  // commodity selling percentage
  const percentageResponse = await SellPercentage.findOne({
    commodity: "metalcharts",
  });

  console.log(percentageResponse);

  return {
    props: {
      percentage: percentageResponse.percentage,
      data: JSON.stringify(response),
      bank: bank[0].name,
    },
  };
}
