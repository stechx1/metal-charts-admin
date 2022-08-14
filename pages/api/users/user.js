// database
import database from "../../../lib/database";
// models
import User from "../../../models/User";

export default async function handler(req, res) {
  try {
    // database
    await database();

    switch (req.method) {
      case "GET":
        {
          const users = await User.aggregate([
            {
              $project: {
                name: 1,
                email: 1,
                phone: 1,
                status: 1,
                create_at: 1,
              },
            },
          ]);

          res.status(200).json(users);
        }
        break;
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
