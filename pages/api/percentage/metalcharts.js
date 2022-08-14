import SellPercentage from "../../../models/SellPercentage";
// database
import database from "../../../lib/database";

export default async function handler(req, res) {
  try {
    // database
    await database();

    switch (req.method) {
      case "GET": {
        const response = await SellPercentage.findOne({
          commodity: "metalcharts",
        });
        return res.send(response);
      }
      case "POST": {
        const data = req.body;
        let response;

        const metalcharts = await SellPercentage.findOne({
          commodity: "metalcharts",
        });
        if (metalcharts) {
          response = await SellPercentage.findOneAndUpdate(
            { commodity: data.commodity },
            {
              percentage: data.percentage,
              modified_at: Date.now()
            },
            { new: true, upsert: true }
          );
        } else {
          const percentage = new SellPercentage({
            commodity: "metalcharts",
            percentage: data.percentage,
          });
          response = await percentage.save();
        }

        return res.status(201).send(response);
      }
    }
  } catch (error) {
    res.json({ metalcharts: error.message });
  }
}
