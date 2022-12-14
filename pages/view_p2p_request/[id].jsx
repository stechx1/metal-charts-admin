import { MainLayout } from "../../components/layout";
import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import Buyp2p from "../../models/Buyp2p";
import SellPercentage from "../../models/SellPercentage";
import { ToastContainer, toast } from "react-toastify";

export default function ViewP2PRequest({ data, banks, percentage }) {
  const [trade, setTrade] = useState(JSON.parse(data)[0]);
  const [uBanks, setUBanks] = useState(JSON.parse(banks));
  const [prices, setPrices] = useState({
    gold: 0,
    ukoil: 0,
  });

  const approve = async () => {
    const response = await axios.put("/api/trade/sell", {
      _id: trade._id,
      orderid: trade.orderid,
      status: "accepted",
    });
    console.log(response);
    if (response.status == 201) {
      setTrade((prev) => {
        return { ...prev, status: response.data.buyData.status };
      });
    }
  };

  const reject = async () => {
    const response = await axios.put("/api/trade/sell", {
      _id: trade._id,
      orderid: trade.orderid,
      status: "rejected",
    });
    console.log(response);
    if (response.status == 201) {
      setTrade((prev) => {
        return { ...prev, status: response.data.buyData.status };
      });
    }
  };

  const handleChange = (value, type) => {
    if (type == "qty") {
      debugger;
      let amo;
      if (trade.commodity == "Gold") {
        amo = value * parseInt(prices.gold);
      } else {
        amo = value * parseInt(prices.ukoil);
      }
      setTrade({ ...trade, qty: value, amount: amo });

      // setTrade({ ...trade, qty: value });
      // qtyChange(value);
    } else {
      setTrade({ ...trade, commodity: value });
    }
  };

  const handleSubmit = async (e) => {
    // e.preventD
    let res = await axios.patch("/api/trade/sell", {
      _id: trade._id,
      trade,
    });
    if (res.status == 200) {
      toast.success("Updated Successfully!");
    }
  };
  const getPrices = async () => {
    // const urlGold = `/api/Price/gold`;
    // const urlUkoil = `/api/Price/ukoil`;
    const response1 = await axios.get("/api/commodity/gold");
    const response2 = await axios.get("/api/commodity/ukoil");
    debugger;
    setPrices({
      gold: response1.data.price,
      ukoil: response2.data.price,
    });
  };

  const qtyChange = (value) => {
    let amo = value * prices.gold;
    setTrade({ ...trade, amount: amo });
    // let minTarget = 5 / prices.gold;
    // let qty = e.target.value;
    // if (qty < minTarget) {
    //   setError((prev) => {
    //     return { ...prev, qty: `Amount Must be Morethan ${minTarget} Ounce` };
    //   });
    //   setData((prev) => {
    //     return { ...prev, qty };
    //   });
    // } else {
    //   let amo = qty * price;
    //   console.log(amo);
    //   setError("");
    //   setData((prev) => {
    //     return { ...prev, qty, amount: amo };
    //   });
    // }
  };

  useEffect(() => {
    getPrices();
  }, []);

  return (
    <div className="w-full h-screen overflow-y-scroll py-6 px-4">
      <h1 className="text-3xl font-bold border-b border-[#131722] pb-6">
        View P2P Buy Request - {new Date(trade.created_at).toDateString()}
      </h1>

      <div className="">
        <div className="flex flex-col mt-4">
          <h4 className="text-xl font-semibold ">Trade Details:</h4>
          <div className="flex">
            <div className="my-2 w-1/2 flex flex-col">
              <b>Amount:</b>
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                {/* ${trade.amount} - $
                {trade.amount -
                  (parseFloat(trade.amount) * parseFloat(percentage)) / 100} */}
                ${trade?.amount}
              </span>
            </div>
            <div className="my-2 w-1/2 flex flex-col ml-2">
              <b>Quantity:</b>{" "}
              {/* <span className="uppercase bg-gray-200 p-2 rounded-md">
                {trade.qty}
              </span> */}
              <input
                id="quantity"
                type="text"
                value={trade?.qty}
                placeholder="Quantity"
                onChange={(e) => {
                  handleChange(e.target.value, "qty");
                }}
                className="outline-none border rounded-md border-gray-300 p-2 pl-4"
              />
            </div>
          </div>

          <div className="flex">
            <div className="my-2 w-1/2 flex flex-col">
              <b>Commodity: </b>
              {/* <span className="uppercase bg-gray-200 p-2 rounded-md">
                {trade.commodity}
              </span> */}
              {/* <input
                id="commodity"
                type="text"
                value={trade.commodity?.toUpperCase()}
                placeholder="Commodity"
                onChange={(e) => {
                  handleChange(e.target.value, "comodity");
                }}
                className="outline-none border rounded-md border-gray-300 p-2 pl-4"
              /> */}
              <select
                name="commodity"
                id="commodity"
                // value="Uk Oil"
                onChange={(e) => {
                  handleChange(e.target.value, "comodity");
                }}
                style={{ width: "12rem" }}
              >
                <option value="Gold" selected={trade.commodity == "Gold"}>
                  Gold
                </option>
                <option value="Uk Oil" selected={trade.commodity == "Uk Oil"}>
                  Uk Oil
                </option>
              </select>
            </div>
            <div className="my-2 w-1/2 flex flex-col ml-2">
              <b>Status:</b>
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                {trade.status}
              </span>
            </div>
          </div>
        </div>
        <button className="btn-primary" onClick={handleSubmit}>
          Submit
        </button>
        <div className="flex flex-col mt-4">
          <h4 className="text-xl font-semibold">Seller Bank Details:</h4>
          <div className="flex">
            <div className="my-2 w-1/2 flex flex-col">
              <b>Bank Name: </b>
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                {uBanks.seller}
              </span>
            </div>
            <div className="my-2 w-1/2 flex flex-col ml-2">
              <b>Account Number: </b>
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                {trade.s_b_account}
              </span>
            </div>
          </div>

          <div className="flex">
            <div className="my-2 w-1/2 flex flex-col">
              <b>Account Holder Name: </b>
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                {trade.s_b_name}
              </span>
            </div>
            <div className="my-2 w-1/2 flex flex-col ml-2">
              <b>Account Holder Email: </b>
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                {trade.s_b_email}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <h4 className="text-xl font-semibold">Buyer Bank Details:</h4>
          <div className="flex">
            <div className="my-2 w-1/2 flex flex-col">
              <b>Bank Name: </b>
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                {uBanks.buyer}
              </span>
            </div>
            <div className="my-2 w-1/2 flex flex-col ml-2">
              <b>Account Number: </b>
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                {trade.b_b_account}
              </span>
            </div>
          </div>

          <div className="flex">
            <div className="my-2 w-1/2 flex flex-col">
              <b>Account Holder Name: </b>
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                {trade.b_b_name}
              </span>
            </div>
            <div className="my-2 w-1/2 flex flex-col ml-2">
              <b>Account Holder Email: </b>
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                {trade.b_b_email}
              </span>
            </div>
          </div>

          <div className="flex">
            <div className="my-2 w-1/2 flex flex-col">
              <b>Transaction Id: </b>
              <span className="uppercase bg-gray-200 p-2 rounded-md">
                {trade.trx_id}
              </span>
            </div>
          </div>
        </div>

        {trade.status == "pending" ? (
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

ViewP2PRequest.Layout = MainLayout;

export async function getServerSideProps(context) {
  const params = context.params;
  const id = params.id;
  console.log(id);

  const response = await Buyp2p.aggregate([
    {
      $match: {
        $expr: {
          $eq: ["$_id", { $toObjectId: id }],
        },
      },
    },
    // getting seller details
    {
      $lookup: {
        from: "users",
        localField: "seller",
        foreignField: "token",
        as: "selUser",
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{ $arrayElemAt: ["$selUser", 0] }, "$$ROOT"],
        },
      },
    },
    { $project: { selUser: 0 } },
    {
      $project: {
        seller: "$username",
        buyer: 1,
        token: 1,
        trx_id: 1,
        orderid: 1,
        created_at: 1,
      },
    },
    // getting seller bank account
    {
      $lookup: {
        from: "banks",
        localField: "token",
        foreignField: "token",
        as: "sellBank",
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{ $arrayElemAt: ["$sellBank", 0] }, "$$ROOT"],
        },
      },
    },
    { $project: { sellBank: 0 } },

    {
      $project: {
        seller: 1,
        buyer: 1,
        trx_id: 1,
        orderid: 1,
        created_at: 1,

        s_b_name: "$name",
        s_b_account: "$account",
        s_b_email: "$email",
        s_b_bankid: "$bankid",
      },
    },
    // getting buyer details
    {
      $lookup: {
        from: "users",
        localField: "buyer",
        foreignField: "token",
        as: "buyUser",
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{ $arrayElemAt: ["$buyUser", 0] }, "$$ROOT"],
        },
      },
    },
    { $project: { buyUser: 0 } },
    {
      $project: {
        buyer: "$username",
        token: 1,

        trx_id: 1,
        orderid: 1,
        s_b_name: 1,
        s_b_account: 1,
        s_b_email: 1,
        s_b_bankid: 1,
        seller: 1,
      },
    },

    // getting buyer bank account
    {
      $lookup: {
        from: "banks",
        localField: "token",
        foreignField: "token",
        as: "buyBank",
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{ $arrayElemAt: ["$buyBank", 0] }, "$$ROOT"],
        },
      },
    },
    { $project: { buyBank: 0 } },

    {
      $project: {
        seller: 1,
        buyer: 1,
        created_at: 1,
        trx_id: 1,
        orderid: 1,

        s_b_name: 1,
        s_b_account: 1,
        s_b_email: 1,
        s_b_bankid: 1,

        b_b_name: "$name",
        b_b_account: "$account",
        b_b_email: "$email",
        b_b_bankid: "$bankid",
      },
    },

    // getting trade info

    { $set: { orderid: { $toObjectId: "$orderid" } } },
    {
      $lookup: {
        from: "sells",
        localField: "orderid",
        foreignField: "_id",
        as: "trade",
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{ $arrayElemAt: ["$trade", 0] }, "$$ROOT"],
        },
      },
    },
    { $project: { trade: 0 } },
    {
      $project: {
        seller: 1,
        buyer: 1,
        created_at: 1,
        trx_id: 1,
        orderid: 1,

        s_b_name: 1,
        s_b_account: 1,
        s_b_email: 1,
        s_b_bankid: 1,

        b_b_name: 1,
        b_b_account: 1,
        b_b_email: 1,
        b_b_bankid: 1,

        amount: 1,
        qty: 1,
        status: 1,
        commodity: 1,
      },
    },
  ]);

  console.log("response:-", response);

  const bankResponse = await axios(`https://api.paystack.co/bank`, {
    headers: {
      Authorization: "Bearer" + process.env.SECRET_KEY,
    },
  });
  const banks = bankResponse.data.data;

  const sellerBank = banks.filter((item) => {
    return item.id == response[0].s_b_bankid;
  });
  const buyerBank = banks.filter((item) => {
    return item.id == response[0].b_b_bankid;
  });
  console.log("banks", { sellerBank, buyerBank });

  // commodity selling percentage
  const percentageResponse = await SellPercentage.findOne({
    commodity: "p2p",
  });

  return {
    props: {
      percentage: percentageResponse.percentage,
      data: JSON.stringify(response),
      banks: JSON.stringify({
        seller: sellerBank[0].name,
        buyer: buyerBank[0].name,
      }),
    },
  };
}
