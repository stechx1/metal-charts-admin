import Price from "../../../models/Price";
// database
import database from "../../../lib/database";

export default async function handler(req, res) {
  try {
    // database
    await database();
    
    switch (req.method) {
      case "GET": {
        const price = await Price.findOne({ name: "gold" });
        return res.send(price);
      }
      case "POST": {
        const { price } = await req.body;
        const gold = await Price.findOneAndUpdate(
          { name: "gold" },
          { price: price, updated_at: Date.now() },
          { new: true, upsert: true }
        );

        return res.send(gold);
      }
    }
  } catch (error) {
    res.json({ gold: error.message });
  }
}
