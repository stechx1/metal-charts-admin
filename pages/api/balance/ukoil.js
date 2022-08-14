import Balance from "../../../models/Balance";
// database
import database from "../../../lib/database";

export default async function handler(req, res) {
  try {
    // database
    await database();

    switch (req.method) {
      case "GET": {
        const ukoil = await Balance.findOne({ commodity: "ukoil" });
        if (!ukoil) {
          return res.status(204).send(ukoil);
        }
        return res.send(ukoil);
      }
      case "POST": {
        const { amount, type } = req.body;
        const gDetails = await Balance.findOne({ commodity: "ukoil" });
        let ukoil;

        if (gDetails) {
          console.log("gDetails",gDetails)
          console.log("amount", amount)
          ukoil = await Balance.findOneAndUpdate(
            { commodity: "ukoil" },
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

          ukoil = await Balance.findOneAndUpdate(
            { commodity: "ukoil" },
            {
              amount: 0,
              total: amount,
              modified_at: Date.now(),
            },
            { new: true, upsert: true }
          );
        }

        return res.status(201).send(ukoil);
      }
    }
  } catch (error) {
    res.json({ ukoil: error.message });
  }
}
