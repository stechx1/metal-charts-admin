// database
import database from "../../../lib/database";
import Buymetalchart from "../../../models/Buymetalchart";
// models
import User from "../../../models/User";

export default async function handler(req, res) {
  try {
    // database
    await database();

    switch (req.method) {
      case "GET": {
        //   users count
        const userlist = await User.aggregate([
          { $group: { _id: null, users: { $sum: 1 } } },
          { $project: { _id: 0 } },
        ]);
        // gold count
        const goldlist = await await Buymetalchart.aggregate([
          {
            $match: {
              $expr: {
                $and: {
                  $eq: ["$commodity", "gold"],
                  $eq: ["$status", "accepted"],
                },
              },
            },
          },
          //   { $group: { _id: null, gold: { $sum: "$amount" } } },
          //   { $project: { _id: 0 } },
        ]);

        // ukoil count
        const ukoillist = await Buymetalchart.aggregate([
          {
            $match: {
              $expr: {
                $and: {
                  $eq: ["$commodity", "ukoil"],
                  $eq: ["$status", "accepted"],
                },
              },
            },
          },
          //   { $group: { _id: null, ukoil: { $sum: "$amount" } } },
          //   { $project: { _id: 0 } },
        ]);
        // trade count
        const metalcahrt_trade_list = await Buymetalchart.aggregate([
          {
            $match: {
              $expr: {
                $eq: ["$commodity", "ukoil"],
                $eq: ["$status", "accepted"],
              },
            },
          },
          { $group: { _id: null, ukoil: { $sum: "$amount" } } },
          { $project: { _id: 0 } },
        ]);
        // analytics

        return res.status(200).json(goldlist);
      }
      case "POST":
        {
        }
        break;
      case "UPDATE":
        {
        }
        break;
      default:
        {
          res.json({ message: "Request Method not defined!" });
        }
        break;
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}
