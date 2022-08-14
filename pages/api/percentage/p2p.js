import SellPercentage from "../../../models/SellPercentage";
// database
import database from "../../../lib/database";

export default async function handler(req, res) {
  try {
    // database
    await database();

    switch (req.method) {
      case "GET": {
        const response = await SellPercentage.findOne({ commodity: "p2p" });
        return res.send(response);
      }
      case "POST": {
        const data = req.body;
        let response;

        const p2p = await SellPercentage.findOne({ commodity: "p2p" });
        if (p2p) {
          response = await SellPercentage.findOneAndUpdate(
            { commodity: data.commodity },
            {
              percentage: data.percentage,
            },
            { new: true, upsert: true }
          );
        } else {
          const metalcharts = new SellPercentage({
            commodity: "p2p",
            percentage: data.percentage,
          });
          response = await metalcharts.save();
        }

        return res.status(201).send(response);
      }
    }
  } catch (error) {
    res.json({ p2p: error.message });
  }
}
