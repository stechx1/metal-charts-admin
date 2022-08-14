import Price from "../../../models/Price";
// database
import database from "../../../lib/database";

export default async function handler(req, res) {
  try {
    // database
    await database();

    switch (req.method) {
      case "GET": {
        const price = await Price.findOne({ name: "usd" });
        return res.send(price);
      }
      case "POST": {
        const { price } = await req.body;
        const usd = await Price.findOneAndUpdate(
          { name: "usd" },
          { price: price, updated_at: Date.now() },
          { new: true, upsert: true }
        );
        return res.send(usd);
      }
    }
  } catch (error) {
    res.json({ message: error.message });
  }
}
