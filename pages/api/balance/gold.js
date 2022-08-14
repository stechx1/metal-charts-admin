import Balance from "../../../models/Balance";
// database
import database from "../../../lib/database";

export default async function handler(req, res) {
  try {
    // database
    await database();

    switch (req.method) {
      case "GET": {
        const gold = await Balance.findOne({ commodity: "gold" });
        return res.send(gold);
      }
      case "POST": {
        const { amount, type } = req.body;
        const gDetails = await Balance.findOne({ commodity: "gold" });
        let gold;

        if (gDetails) {
          console.log("gDetails", gDetails)
          console.log("amount", amount)
          gold = await Balance.findOneAndUpdate(
            { commodity: "gold" },
            {
              amount:
                type === "add"
                  ? parseFloat(gDetails.amount)
                  : parseFloat(gDetails.amount) + parseFloat(amount),
              total: type === "add" ? parseFloat(gDetails.total) + parseFloat(amount) : parseFloat(gDetails.total),
              modified_at: Date.now(),
            },
            { new: true, upsert: true }
          );
        } else {
          console.log("gDetails", "empty")
          console.log("amount", amount)

          gold = await Balance.findOneAndUpdate(
            { commodity: "gold" },
            {
              amount: 0,
              total: amount,
              modified_at: Date.now(),
            },
            { new: true, upsert: true }
          );
        }

        return res.status(201).send(gold);
      }
    }
  } catch (error) {
    res.json({ gold: error.message });
  }
}
