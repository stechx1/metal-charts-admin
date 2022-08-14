import Sell from "../../../../models/Sell";
import UserCommodity from "../../../../models/UserCommodity";
// database
import database from "../../../../lib/database";

export default async function handler(req, res) {
  try {
    // database
    await database();

    switch (req.method) {
      case "GET": {
        const data = await Sell.find({ tradewith: "metalcharts" });
        return res.status(200).send(data);
      }
      case "POST": {
        const data = await req.body;
        console.log(data);

        const sellData = await Sell.findOneAndUpdate(
          { _id: data._id },
          {
            status: data.status,
          },
          { new: true }
        );

        const balance = await UserCommodity.findOne({
          token: sellData.seller,
          commodity: sellData.commodity,
        });

        let balData;
        if (balance && data.status === "rejected") {
          const qty = parseFloat(balance.amount) + parseFloat(sellData.qty);

          balData = await UserCommodity.findOneAndUpdate(
            { token: sellData.seller, commodity: sellData.commodity },
            {
              amount: qty,
              modified_at: new Date(),
            },
            { new: true }
          );
        }

        return res.status(201).send({ sellData, balData });
      }
      case "PUT": {
        const { data } = await req.body;
        console.log(data);

        // const token = getCookie("user", { req, res });

        // const sellData = await Sell.findOneAndUpdate(
        //   { _id: data._id },
        //   {
        //     amount: data.price,
        //     qty: data.quantity,
        //     commodity: data.commodity,
        //     duration: data.duration,
        //     status: data.status,
        //   },
        //   { new: true }
        // );

        // return res.status(200).send(sellData);
      }
      default: {
        return res.status(401).json({ message: "Invalid Request Method" });
      }
    }
  } catch (error) {
    res.json({ message: error.message });
  }
}
