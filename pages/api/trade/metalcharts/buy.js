import { getCookie } from "cookies-next";
import Buymetalchart from "../../../../models/Buymetalchart";

// database
import database from "../../../../lib/database";
import UserCommodity from "../../../../models/UserCommodity";

export default async function handler(req, res) {
  try {
    // database
    await database();

    switch (req.method) {
      case "GET": {
        const data = await Buymetalchart.find({});
        return res.send(data);
      }

      case "POST": {
        const orderData = await req.body;

        const response = await Buymetalchart.findOneAndUpdate(
          { _id: orderData._id },
          { status: orderData.status },
          { new: true, upsert: true }
        );
        let userBalance;
        if (response._id) {
          console.log("response",response);

          const balance = await UserCommodity.findOne({
            token: response.buyer,
            commodity: response.commodity,
          });

          if (balance) {
            const amount =
              parseFloat(balance.amount) + parseFloat(response.qty);

            console.log("balance._id",amount);

            userBalance = await UserCommodity.findOneAndUpdate(
              { _id: balance._id },
              {
                amount: amount,
                modified_at: new Date(),
              }
            );
          } else {
            console.log("response.qty",response.qty);

            const data = new UserCommodity({
              token: response.buyer,
              commodity: response.commodity,
              amount: response.qty,
              modified_at: new Date(),
            });
            userBalance = await data.save();
          }
        }

        return res.send({ response, balance: userBalance });
      }
      default: {
        return res.json({ message: "Invalid Request Method" });
      }
    }
  } catch (error) {
    res.json({ message: error.message });
  }
}
