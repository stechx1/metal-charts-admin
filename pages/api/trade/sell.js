import Sell from "../../../models/Sell";
import Buyp2p from "../../../models/Buyp2p";
import UserCommodity from "../../../models/UserCommodity";
// database
import database from "../../../lib/database";

export default async function handler(req, res) {
  try {
    // database
    await database();

    switch (req.method) {
      case "GET": {
        let data = await Buyp2p.aggregate([
          // getting seller name
          {
            $lookup: {
              from: "users",
              localField: "seller",
              foreignField: "token",
              as: "sell",
            },
          },

          {
            $replaceRoot: {
              newRoot: {
                $mergeObjects: [{ $arrayElemAt: ["$sell", 0] }, "$$ROOT"],
              },
            },
          },
          { $project: { sell: 0 } },
          {
            $project: {
              orderid: 1,
              seller: "$username",
              status: 1,
              buyer: 1,
              created_at: 1,
              trx_id: 1,
            },
          },
          // getting buyer details
          {
            $lookup: {
              from: "users",
              localField: "buyer",
              foreignField: "token",
              as: "buy",
            },
          },

          {
            $replaceRoot: {
              newRoot: {
                $mergeObjects: [{ $arrayElemAt: ["$buy", 0] }, "$$ROOT"],
              },
            },
          },
          { $project: { buy: 0 } },
          {
            $project: {
              orderid: 1,
              seller: 1,
              status: 1,
              buyer: "$username",
              created_at: 1,
              trx_id: 1,
            },
          },
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
              qty: 1,
              orderid: 1,
              seller: 1,
              status: 1,
              buyer: 1,
              trx_id: 1,
              created_at: 1,
            },
          },
        ]);
        return res.status(200).send(data);
      }
      case "POST": {
        const { data } = await req.body;
        console.log(data);

        const sellData = new Sell({
          // admin token
          seller:
            "$2a$ivpedBMCbfvKW5310$Q5gGcVz/1brCTJ4/k.lrHnEQIczzvjGBxBom/.",
          tradewith: "peer2peer",
          amount: data.price,
          qty: data.quantity,
          commodity: data.commodity,
          duration: data.duration,
          status: data.status,
        });

        const response = await sellData.save();

        return res.status(201).send(response);
      }
      case "PUT": {
        const data = await req.body;
        console.log(data);

        // updating sell request
        const sellData = await Sell.findOneAndUpdate(
          { _id: data.orderid },
          {
            status: data.status,
          },
          { new: true }
        );
        // updating buy request
        const buyData = await Buyp2p.findOneAndUpdate(
          { _id: data._id },
          {
            status: data.status,
          },
          { new: true }
        );

        // allot commodity to buyer
        const balance = await UserCommodity.findOne({
          token: buyData.buyer,
          commodity: sellData.commodity,
        });
        let userBalance;

        console.log("balance", balance);
        if (balance) {
          const amount = parseFloat(balance.amount) + parseFloat(sellData.qty);

          console.log("balance._id", amount);

          userBalance = await UserCommodity.findOneAndUpdate(
            { _id: balance._id },
            {
              amount: amount,
              modified_at: new Date(),
            }
          );
        } else {
          // console.log("response.qty", response.qty);

          const data = new UserCommodity({
            token: buyData.buyer,
            commodity: sellData.commodity,
            amount: sellData.qty,
            modified_at: new Date(),
          });
          userBalance = await data.save();
        }

        return res.status(201).send({ sellData, buyData, userBalance });
      }

      case "PATCH": {
        const data = await req.body;
        console.log(data);
        // updating buy request
        const sellData = await Sell.findOneAndUpdate(
          { _id: data.trade.orderid},
         { qty:data.trade.qty,
          commodity:data.trade.commodity},
          { new: true }
        );

        return res.status(200).send({sellData});
      }
      default: {
        return res.status(401).json({ message: "Invalid Request Method" });
      }
    }
  } catch (error) {
    res.json({ message: error.message });
  }
}
