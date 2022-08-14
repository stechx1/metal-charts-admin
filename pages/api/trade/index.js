import Sell from "../../../models/Sell";
// database
import database from "../../../lib/database";

export default async function handler(req, res) {
  try {
    // database
    await database();
    switch (req.method) {
      case "GET": {
        let data = await Sell.aggregate([
          {
            $project: {
              commodity: 1,
              qty: 1,
              created_at: 1,
              status: 1,
            },
          },
        ]);
        return res.status(200).send(data);
      }
      case "POST": {
        const { id } = req.body;
        let data = await Sell.findOne(
          { _id: id },
          "commodity qty status duration amount"
        );

        console.log("id", id);
        console.log("[id].js", data);
        return res.status(200).send(data);
      }
      default: {
        return res.status(401).json({ message: "Invalid Request Method" });
      }
    }
  } catch (error) {
    res.json({ message: error.message });
  }
}
